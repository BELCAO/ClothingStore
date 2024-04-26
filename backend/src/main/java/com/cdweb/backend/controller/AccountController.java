package com.cdweb.backend.controller;

import java.util.Map;

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
	public Account getAccountById(@RequestBody Map<String, Long> data) {
		return accountService.getAccountById(data.get("id"));
	}
	
	@PostMapping("/create")
	public Account createAccount(@RequestBody Map<String, String> data) {
		Account account = new Account();
		account.setEmail(data.get("email"));
		account.setName(data.get("name"));
		account.setPhone(data.get("phone"));
		account.setPassword(data.get("password"));
//		System.out.println(account.toString());
		return accountService.createAccount(account);
	}
	
	@PostMapping("/existsemail")
	public boolean exitsByEmail(@RequestBody Map<String, String> data) {
//		System.out.println(data.get("email"));
		return accountService.existsAccountByEmail(data.get("email"));
	}
	
	@PostMapping("/existsphone")
	public boolean exitsByPhone(@RequestBody Map<String, String> data) {
		return accountService.existsAccountByPhone(data.get("phone"));
	}
	
}
