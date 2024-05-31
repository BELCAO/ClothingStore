package com.cdweb.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.cdweb.backend.entity.DetailOrder;

@Component
public interface DetailOrderRepository extends JpaRepository<DetailOrder, Long> {
	
}
