package com.cdweb.backend.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.cdweb.backend.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findByAccountId(Long accountId);
}