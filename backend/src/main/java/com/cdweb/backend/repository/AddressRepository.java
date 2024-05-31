package com.cdweb.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.cdweb.backend.entity.Address;
@Component
public interface AddressRepository extends JpaRepository<Address, Long> {
	
}
