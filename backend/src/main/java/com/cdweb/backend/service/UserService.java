package com.cdweb.backend.service;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.cdweb.backend.dto.DetailOrderDTO;
import com.cdweb.backend.dto.OrderDTO;
import com.cdweb.backend.entity.DetailOrder;
import com.cdweb.backend.entity.Order;
import com.cdweb.backend.entity.User;
import com.cdweb.backend.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserService {
	@Autowired
	private UserRepository accountRepository;
	@Transactional
	public Page<User> getAllAccount(String role, Pageable pageable){
		System.out.println(role);
		if(role.equals("")) {
			Page<User> ss = accountRepository.findAll(pageable);
			for (User user : ss) {
				user.toString();
			}
			return ss;
		}else {
			Page<User> ss = accountRepository.findAllByRole(role, pageable);
			for (User user : ss) {
				user.toString();
			}
			return ss;
		}
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
	public List<OrderDTO> getOrders(Long id) {
		User user =  accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account Not Found"));
		Set<Order> orders = user.getOrders();
		List<OrderDTO> result = new ArrayList<>();
		for (Order order : orders) {
			OrderDTO orderDTO = new OrderDTO();
			orderDTO.setStatus(order.getStatus());
			orderDTO.setDate(formatDate(order.getDate()));
			orderDTO.setTotalAmout(order.getTotalAmout());
			orderDTO.setId(order.getId());
			Set<DetailOrder> detailOrders = order.getDetailOrders();
			for (DetailOrder detailOrder : detailOrders) {
				DetailOrderDTO detailOrderDTO = new DetailOrderDTO();
				detailOrderDTO.setProductEntityId(detailOrder.getProductEntity().getProductId());
				detailOrderDTO.setImageUrl(detailOrder.getProductEntity().getImageUrl());
				detailOrderDTO.setQuantity(detailOrder.getQuantity());
				detailOrderDTO.setProductName(detailOrder.getProductEntity().getName());
				detailOrderDTO.setTotalPrice(detailOrder.getTotalPrice());
				detailOrderDTO.setProductPrice(detailOrder.getProductEntity().getPrice());
				orderDTO.addDetailOrderDTOs(detailOrderDTO);
			}
			result.add(orderDTO);
		}
		return result;
	}
	private String formatDate(java.util.Date date) {
        try {
            // Định dạng đối tượng Date thành chuỗi ngày giờ
            SimpleDateFormat outputFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
            String formattedDate = outputFormat.format(date);
            return formattedDate;
        } catch (DateTimeParseException e) {
            System.err.println("Invalid date format: ");
        }
        return null;
	}
	
	@Transactional
	public Optional<User> updateUserStatus(Long id, String status){
		return accountRepository.findById(id).map(user ->{
			user.setStatus(status);
			return accountRepository.save(user);
		});
	}


}
