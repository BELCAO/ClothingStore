package com.cdweb.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.cdweb.backend.entity.Order;

@Component
public interface OrderRepository extends JpaRepository<Order, Long> {
	
}
