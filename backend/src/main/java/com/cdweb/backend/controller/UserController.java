package com.cdweb.backend.controller;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cdweb.backend.entity.User;
import com.cdweb.backend.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	private UserService accountService;
	@Autowired
	private PasswordEncoder passwordEncoder;

	
	@GetMapping("/list")
	public List<User> getAllAccount(){
//		var authentication = SecurityContextHolder.getContext().getAuthentication();
//		System.out.println("email: " + authentication.getName());
//		authentication.getAuthorities().forEach(gra -> System.out.println(gra.getAuthority()));
		return accountService.getAllAccount();
	}
	
	@GetMapping("/myprofile")
	public User getMyProfile() {
		return accountService.getAccountById(Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getName()));
	}
	@GetMapping("/myavatar")
	public ResponseEntity<String> getMyAvatar() {
		User account = accountService.getAccountById(Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getName()));
		return ResponseEntity.ok().body(account.getAvatarUrl());
	}
	@PostMapping("/updateMyInfo")
	public ResponseEntity<User> updateMyInfo(@RequestBody Map<String, String> data) {
		Long accountId = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getName());
		return ResponseEntity.ok().body(accountService.updateAccount(accountId, data));
	}
	
	@PostMapping("/create")
	public User createAccount(@RequestBody Map<String, String> data) {
		User user = new User(data.get("name"), data.get("email"), data.get("phone"), passwordEncoder.encode(data.get("password")));
		
		user.setAvatarUrl("Avatar");
		return accountService.createAccount(user);
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
