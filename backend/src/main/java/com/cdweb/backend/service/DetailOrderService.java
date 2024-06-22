package com.cdweb.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdweb.backend.entity.DetailOrder;
import com.cdweb.backend.repository.DetailOrderRepository;

import jakarta.transaction.Transactional;

@Service
public class DetailOrderService {
	@Autowired
	private DetailOrderRepository detailOrderRepository;
	@Transactional
	public Optional<DetailOrder> getDetailOrderById(Long id){
		return detailOrderRepository.findById(id);
	}
	@Transactional
	public DetailOrder createDetailOrder(DetailOrder detailOrder) {
		return detailOrderRepository.save(detailOrder);
	}
	@Transactional
	public boolean deleteDetailOrderById(Long id) {
		if(detailOrderRepository.existsById(id)) {
			detailOrderRepository.deleteById(id);
			return true;
		}
		return false;
	}
}

