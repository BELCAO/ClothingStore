package com.cdweb.backend.config;

import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
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
	@Bean
	ApplicationRunner applicationRunner() {
		return args -> {
			if(!accountService.existsAccountByEmail("admin@gmail.com")) {
				User account = new User("admin@gmail.com", "admin@gmail.com", "0000000000", passwordEncoder.encode("000000"));
				HashSet<String> roles = new HashSet<String>();
				roles.add(Role.ADMIN.name());
				account.setRoles(roles);
				accountService.createAccount(account);
			}
		};
	}
}
