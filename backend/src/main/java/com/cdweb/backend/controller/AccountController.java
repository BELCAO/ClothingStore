package com.cdweb.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdweb.backend.entity.Account;
import com.cdweb.backend.service.AccountService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/account")
public class AccountController {
	@Autowired
	private AccountService accountService;
	
	@PostMapping("/")
	public Account getAccountById(@RequestBody Long id) {
		return accountService.getAccountById(id);
	}
	
	@PostMapping("/create")
	public Account createAccount(@RequestBody String entity) {
		Account account = new Account();
		account.setEmail(entity);
		return accountService.createAccount(account);
	}
	
	@PostMapping("/existemail")
	public boolean exitsByEmail(@RequestBody String email) {		
		return accountService.exitAccountByEmail(email);
	}
	
	@PostMapping("/existphone")
	public boolean exitsByPhone(@RequestBody String phone) {
		return accountService.exitAccountByPhone(phone);
	}
	
}
