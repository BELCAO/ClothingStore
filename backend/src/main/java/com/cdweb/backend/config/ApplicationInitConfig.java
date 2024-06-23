package com.cdweb.backend.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.cdweb.backend.entity.User;
import com.cdweb.backend.enums.Role;
import com.cdweb.backend.service.UserService;

@Configuration
public class ApplicationInitConfig {
	@Autowired
	private UserService accountService;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Value("${default.avatar}")
	private String defaultAvatarUrl;
	@Bean
	ApplicationRunner applicationRunner() {
		return args -> {
			if(!accountService.existsAccountByEmail("admin@gmail.com")) {
				User user = new User("Admin", "admin@gmail.com", "0000000000", passwordEncoder.encode("000000"));
				user.setRole(Role.ADMIN.name());
				user.setAvatarUrl(defaultAvatarUrl);
				accountService.createAccount(user);
			}
		};
	}
}
