package com.cdweb.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.cdweb.backend.entity.DeliveryInfo;
import java.util.List;

@Component
public interface DeliveryInfoRepository extends JpaRepository<DeliveryInfo, Long> {
	List<DeliveryInfo> findAllByUserId(Long userId);
}
