package com.cdweb.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdweb.backend.repository.OrderRepository;
import com.cdweb.backend.repository.ProductRepository;
import com.cdweb.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/statistics")
public class StatisticsController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/products/count")
    public ResponseEntity<Long> getProductCount() {
        long count = productRepository.count();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/users/count")
    public ResponseEntity<Long> getUserCount() {
        long count = userRepository.count();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/orders/count")
    public ResponseEntity<Long> getOrderCount() {
        long count = orderRepository.count();
        return ResponseEntity.ok(count);
    }
}