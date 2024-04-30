package com.cdweb.backend.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdweb.backend.entity.Account;
import com.cdweb.backend.enums.Role;
import com.cdweb.backend.service.AccountService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/account")
public class AccountController {
	@Autowired
	private AccountService accountService;
	
	@GetMapping("/list")
	public List<Account> getAllAccount(){
//		var authentication = SecurityContextHolder.getContext().getAuthentication();
//		System.out.println("email: " + authentication.getName());
//		authentication.getAuthorities().forEach(gra -> System.out.println(gra.getAuthority()));
		return accountService.getAllAccount();
	}
	
	@GetMapping("/myprofile")
	public Account getMyProfile() {
		return accountService.getAccountByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
	}
	
	@PostMapping("/create")
	public Account createAccount(@RequestBody Map<String, String> data) {
		Account account = new Account();
		account.setEmail(data.get("email"));
		account.setName(data.get("name"));
		account.setPhone(data.get("phone"));
		account.setAvatar("Avatar");
		account.setStatus(1);
		HashSet<String> roles = new HashSet<String>();
		roles.add(Role.USER.name());
		account.setRole(roles);
		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
		account.setPassword(passwordEncoder.encode(data.get("password")));
		return accountService.createAccount(account);
	}
	
	@PostMapping("/existsemail")
	public boolean exitsByEmail(@RequestBody Map<String, String> data) {
		return accountService.existsAccountByEmail(data.get("email"));
	}
	
	@PostMapping("/existsphone")
	public boolean exitsByPhone(@RequestBody Map<String, String> data) {
		return accountService.existsAccountByPhone(data.get("phone"));
	}
	
}
