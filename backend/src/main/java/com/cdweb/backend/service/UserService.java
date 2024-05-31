package com.cdweb.backend.service;

import java.sql.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cdweb.backend.entity.User;
import com.cdweb.backend.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserService {
	@Autowired
	private UserRepository accountRepository;
	@Transactional
	public List<User> getAllAccount(){
		return accountRepository.findAll();
	}
	@Transactional
	public User createAccount(User account) {
		return accountRepository.save(account);		
	}
	@Transactional
	public User updateAccount(Long accountId, Map<String, String> data) {
		Optional<User> optional = accountRepository.findById(accountId);
		if(optional.isPresent()) {
			User account = optional.get();
			if(account.getEmail().equals(data.get("email")) || !accountRepository.existsByEmail(data.get("email"))) {
				account.setEmail(data.get("email"));
				account.setName(data.get("name"));
				account.setPhone(data.get("phoneNumber"));
				account.setBirthday(Date.valueOf(data.get("birthday")));
				account.setGender(data.get("gender"));
				return accountRepository.save(account);
			}
		}
		throw new RuntimeException("Email used");
	}
	@Transactional
	public User getAccountById(Long id) {
		return accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account Not Found"));
	}
	@Transactional
	public User updateAvatar(Long accountID, String avatarPath) {
		Optional<User> optional = accountRepository.findById(accountID);
		if(optional.isPresent()) {
			User account = optional.get();
			account.setAvatarUrl(avatarPath);
			return accountRepository.save(account);
		}
		throw new RuntimeException("No update avatar");
	}
	@Transactional
	public User getAccountByEmail(String email) {
		return accountRepository.getByEmail(email);
	}
	@Transactional
	public boolean existsAccountByEmail(String email) {
		return accountRepository.existsByEmail(email);
	}
	@Transactional
	public boolean existsAccountByPhone(String phone) {
		return accountRepository.existsByPhone(phone);
	}


}
