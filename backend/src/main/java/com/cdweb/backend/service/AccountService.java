package com.cdweb.backend.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

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
	
	public Account updateAccount(Long accountId, Map<String, String> data) {
		Optional<Account> optional = accountRepository.findById(accountId);
		if(optional.isPresent()) {
			Account account = optional.get();
			if(account.getEmail().equals(data.get("email")) || !accountRepository.existsByEmail(data.get("email"))) {
				account.setEmail(data.get("email"));
				account.setName(data.get("name"));
				account.setPhone(data.get("phoneNumber"));
				return accountRepository.save(account);
			}
		}
		throw new RuntimeException("Email used");
	}
	
	public Account getAccountById(Long id) {
		return accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account Not Found"));
	}
	
	public Account updateAvatar(Long accountID, String avatarPath) {
		Optional<Account> optional = accountRepository.findById(accountID);
		if(optional.isPresent()) {
			Account account = optional.get();
			account.setAvatar(avatarPath);
			return accountRepository.save(account);
		}
		throw new RuntimeException("No update avatar");
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
