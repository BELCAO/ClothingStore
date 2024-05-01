package com.cdweb.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cdweb.backend.entity.Account;
import com.cdweb.backend.repository.AccountRepository;

@Service
public class AccountService {
	@Autowired
	private AccountRepository accountRepository;
	
	public List<Account> getAllAccount(){
		return accountRepository.findAll();
	}
	
	public Account createAccount(Account account) {
		return accountRepository.save(account);		
	}
	public Account getAccountById(Long id) {
		return accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account Not Found"));
	}
	public Account getAccountByEmail(String email) {
		return accountRepository.getByEmail(email);
	}
	public boolean existsAccountByEmail(String email) {
		return accountRepository.existsByEmail(email);
	}
	public boolean existsAccountByPhone(String phone) {
		return accountRepository.existsByPhone(phone);
	}


}
