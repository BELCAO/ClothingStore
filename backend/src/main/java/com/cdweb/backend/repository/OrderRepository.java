package com.cdweb.backend.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.cdweb.backend.entity.Order;

@Component
public interface OrderRepository extends JpaRepository<Order, Long> {
	Page<Order> findAll(Pageable pageable);
	Page<Order> findAllByStatus(Pageable pageable, String status);
}
