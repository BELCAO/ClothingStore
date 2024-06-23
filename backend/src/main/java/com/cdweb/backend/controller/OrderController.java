package com.cdweb.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
	public ResponseEntity<Page<OrderDTO>> getAllOrders(
				@RequestParam("status") String status,
	            @RequestParam(defaultValue = "0") int page,
	            @RequestParam(defaultValue = "10") int size) {
	        Pageable pageable = PageRequest.of(page, size);
	        if(status.equals("x")) {
	        	Page<OrderDTO> orderDTOs = orderService.getAllOrders(pageable);	        	
	        	return ResponseEntity.ok().body(orderDTOs);
	        }else {
	        	Page<OrderDTO> orderDTOs = orderService.getAllOrdersByStatus(pageable, status);	        		        	
	        	return ResponseEntity.ok().body(orderDTOs);
	        }
	}
	@GetMapping("/{id}")
	public ResponseEntity<OrderDTO> getOrderById(@PathVariable Long id){
		return ResponseEntity.ok().body(orderService.getOrderById(id));
//		OrderDTO orderDTO = new OrderDTO();
//		return ResponseEntity.ok().body(orderDTO);
//		return order.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}
	@PostMapping
	public ResponseEntity<Long> createOrder(@RequestBody OrderDTO orderDTO){		
		return ResponseEntity.ok().body(orderService.createOrder(orderDTO));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteOrderById(@PathVariable Long id){
		if(orderService.deleteOrderById(id)) {
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.badRequest().build();
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Order> updateOrderStatus(@RequestParam("status") String status, @PathVariable Long id){
		return orderService.updateOrderStatus(id, status).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}
}