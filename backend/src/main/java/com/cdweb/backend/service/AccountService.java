package com.cdweb.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cdweb.backend.entity.Account;
import com.cdweb.backend.repository.AccountRepository;

@Service
public class AccountService {
	@Autowired
	private AccountRepository accountRepository;
	
	public Account createAccount(Account account) {
		return accountRepository.save(account);
	}
	public Account getAccountById(Long id) {
		return accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account Not Found"));
	}
	public boolean exitAccountByEmail(String email) {
		return accountRepository.existsByEmail(email);
	}
	public boolean exitAccountByPhone(String phone) {
		return accountRepository.existsByPhone(phone);
	}


}
