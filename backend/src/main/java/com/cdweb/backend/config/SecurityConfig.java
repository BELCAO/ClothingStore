package com.cdweb.backend.config;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	@Value("${signer.key}")
	private String signerKey;
	
	private final String[] PUBLIC_ENDPOINTS = {"/auth/","/account/create", "/account/existsemail", "/product"};
	private final String[] ADMIN_ENDPOINTS = {"/user", "/orders"};

    @Bean
    SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
		httpSecurity.authorizeHttpRequests(request -> request	
				.requestMatchers(HttpMethod.POST, PUBLIC_ENDPOINTS).permitAll()
				.requestMatchers(HttpMethod.GET, ADMIN_ENDPOINTS).hasAuthority("SCOPE_ADMIN")
				.anyRequest().permitAll()
//				.authenticated()
				);
		httpSecurity.oauth2ResourceServer(oauth2 -> 
		oauth2.jwt(jwtConfigurer -> jwtConfigurer.decoder(jwtDecoder())));
		
		
		httpSecurity.csrf(httpSecurityCsrfConfigurer -> httpSecurityCsrfConfigurer.disable());
		return httpSecurity.build();
	}
     @Bean
     JwtDecoder jwtDecoder() {
    	 SecretKeySpec secretKeySpec = new SecretKeySpec(signerKey.getBytes(), "HS512");
    	 return NimbusJwtDecoder
    			 .withSecretKey(secretKeySpec)
    			 .macAlgorithm(MacAlgorithm.HS512)
    			 .build();
     }
     
     @Bean
     PasswordEncoder passwordEncoder() {
    	 return new BCryptPasswordEncoder(10);
     }
}
