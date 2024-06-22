package com.cdweb.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.cdweb.backend.entity.DeliveryInfo;
@Component
public interface DeliveryInfoRepository extends JpaRepository<DeliveryInfo, Long> {
	
}