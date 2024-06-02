package com.cdweb.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdweb.backend.entity.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
