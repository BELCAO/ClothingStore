package com.cdweb.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdweb.backend.entity.DeliveryInfo;
import com.cdweb.backend.repository.DeliveryInfoRepository;

import jakarta.transaction.Transactional;

@Service
public class DeliveryInfoService {
	@Autowired
	private DeliveryInfoRepository deliveryInfoRepository;
	@Transactional
	public Optional<DeliveryInfo> getDeliveryInfoById(Long id){
		return deliveryInfoRepository.findById(id);
	}
	@Transactional
	public DeliveryInfo createDeliveryInfo(DeliveryInfo address) {
		return deliveryInfoRepository.save(address);
	}
	@Transactional
	public boolean deleteDeliveryInfoById(Long id) {
		if(deliveryInfoRepository.existsById(id)){
			deliveryInfoRepository.deleteById(id);
			return true;
		}
		return false;
	}
	
}
