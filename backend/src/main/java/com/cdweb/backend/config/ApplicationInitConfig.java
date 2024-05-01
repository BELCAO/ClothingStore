package com.cdweb.backend.config;

import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.cdweb.backend.entity.Account;
import com.cdweb.backend.enums.Role;
import com.cdweb.backend.service.AccountService;

@Configuration
public class ApplicationInitConfig {
	@Autowired
	private AccountService accountService;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Bean
	ApplicationRunner applicationRunner() {
		return args -> {
			if(!accountService.existsAccountByEmail("admin@gmail.com")) {
				Account account = new Account();
				account.setEmail("admin@gmail.com");
				account.setName("Admin");
				account.setPhone("");
				account.setAvatar("Avatar");
				account.setStatus(1);
				HashSet<String> roles = new HashSet<String>();
				roles.add(Role.ADMIN.name());
				account.setRole(roles);
				account.setPassword(passwordEncoder.encode("000000"));
				accountService.createAccount(account);
			}
		};
	}
}
