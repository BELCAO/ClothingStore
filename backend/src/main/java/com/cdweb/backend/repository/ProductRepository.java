package com.cdweb.backend.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.cdweb.backend.entity.CategoryEntity;
import com.cdweb.backend.entity.ProductEntity;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
	ProductEntity findOneByProductId(Long productId);
	List<ProductEntity> findTop10ByNameContainingIgnoreCase(String name);
	  Page<ProductEntity> findByCategory(CategoryEntity category, Pageable pageable);







}
