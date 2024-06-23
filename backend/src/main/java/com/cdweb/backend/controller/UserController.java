package com.cdweb.backend.controller;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdweb.backend.dto.OrderDTO;
import com.cdweb.backend.entity.Order;
import com.cdweb.backend.entity.User;
import com.cdweb.backend.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
@RequestMapping("/user")
public class UserController {
	@Value("${default.avatar}")
	private String defaultAvatarUrl;
	@Autowired
	private UserService userService;
	@Autowired
	private PasswordEncoder passwordEncoder;

	
	@GetMapping
	public ResponseEntity<Page<User>> getAllAccount(@RequestParam("role") String role,
            						@RequestParam(defaultValue = "0") int page,
            						@RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
		return ResponseEntity.ok().body(userService.getAllAccount(role, pageable));
	}
	
	@GetMapping("/myprofile")
	public User getMyProfile() {
		return userService.getAccountById(Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getName()));
	}
	@GetMapping("/myavatar")
	public ResponseEntity<String> getMyAvatar() {
		User account = userService.getAccountById(Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getName()));
		return ResponseEntity.ok().body(account.getAvatarUrl());
	}
	@PostMapping("/updateMyInfo")
	public ResponseEntity<User> updateMyInfo(@RequestBody Map<String, String> data) {
		Long accountId = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getName());
		return ResponseEntity.ok().body(userService.updateAccount(accountId, data));
	}
	
	@PostMapping("/create")
	public User createAccount(@RequestBody Map<String, String> data) {
		User user = new User(data.get("name"), data.get("email"), data.get("phone"), passwordEncoder.encode(data.get("password")));
		user.setAvatarUrl(defaultAvatarUrl);
		return userService.createAccount(user);
	}
	
	@PostMapping("/existsemail")
	public boolean exitsByEmail(@RequestBody Map<String, String> data) {
		return userService.existsAccountByEmail(data.get("email"));
	}
	
	@PostMapping("/existsphone")
	public boolean exitsByPhone(@RequestBody Map<String, String> data) {
		return userService.existsAccountByPhone(data.get("phone"));
	}
	
	@GetMapping("/orders")
	public List<OrderDTO> getOrders() {
		return userService.getOrders(Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getName()));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<User> updateOrderStatus(@RequestParam("status") String status, @PathVariable Long id){
		return userService.updateUserStatus(id, status).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}
	
	
}
