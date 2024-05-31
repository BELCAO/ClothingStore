package com.cdweb.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdweb.backend.dto.OrderDTO;
import com.cdweb.backend.entity.Order;
import com.cdweb.backend.service.OrderService;

@RestController
@RequestMapping("/orders")
public class OrderController {
	@Autowired
	private OrderService orderService;
	
	@GetMapping
	public ResponseEntity<List<Order>> getAllOrders(){
		return ResponseEntity.ok().body(orderService.getAllOrders());
	}
	@GetMapping("/{id}")
	public ResponseEntity<Order> getOrderById(@PathVariable Long id){
		Optional<Order> order = orderService.getOrderById(id);
		return order.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}
	@PostMapping
	public ResponseEntity<Order> createOrder(@RequestBody OrderDTO orderDTO){		
		return ResponseEntity.ok().body(orderService.createOrder(orderDTO));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteOrderById(@PathVariable Long id){
		if(orderService.deleteOrderById(id)) {
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.badRequest().build();
	}
	
	@PutMapping("/id")
	public ResponseEntity<Order> updateOrderStatus(@RequestParam("status") String status, @PathVariable Long id){
		return orderService.updateOrderStatus(id, status).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}
}