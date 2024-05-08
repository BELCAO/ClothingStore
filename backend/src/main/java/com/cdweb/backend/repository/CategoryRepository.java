package com.cdweb.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdweb.backend.entity.CategoryEntity;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
	CategoryEntity findOneByCategoryId(Long categoryId);

}
