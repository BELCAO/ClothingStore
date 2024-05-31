package com.cdweb.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdweb.backend.entity.ProductEntity;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
	ProductEntity findOneByProductId(Long productId);







}
