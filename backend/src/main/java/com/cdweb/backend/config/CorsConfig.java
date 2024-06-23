package com.cdweb.backend.config;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
//          .allowedOrigins("http://192.168.2.5:3000")
//          .allowedOrigins("http://192.168.151.4:3000")
            .allowedOrigins("http://localhost:3000")
            .allowedMethods("*")
            .allowCredentials(true);
    }
}
