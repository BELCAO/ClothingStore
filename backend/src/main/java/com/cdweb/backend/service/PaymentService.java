package com.cdweb.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdweb.backend.entity.Payment;
import com.cdweb.backend.repository.PaymentRepository;

import jakarta.transaction.Transactional;

@Service
public class PaymentService {
	@Autowired
	private PaymentRepository paymentRepository;
	@Transactional
	public Optional<Payment> getPaymentById(Long id){
		return paymentRepository.findById(id);
	}
	@Transactional
	public Payment createPayment(Payment payment) {
		return paymentRepository.save(payment);
	}
	@Transactional
	public boolean deletePaymentById(Long id) {
		if(paymentRepository.existsById(id)) {
			paymentRepository.deleteById(id);
			return true;
		}
		return false;
	}
	
}
