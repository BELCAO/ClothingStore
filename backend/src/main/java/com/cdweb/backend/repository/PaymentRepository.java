package com.cdweb.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.cdweb.backend.entity.Payment;

@Component
public interface PaymentRepository extends JpaRepository<Payment, Long> {

}
