package com.cdweb.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdweb.backend.entity.Address;
import com.cdweb.backend.repository.AddressRepository;

import jakarta.transaction.Transactional;

@Service
public class AddressService {
	@Autowired
	private AddressRepository addressRepository;
	@Transactional
	public Optional<Address> getAddressById(Long id){
		return addressRepository.findById(id);
	}
	@Transactional
	public Address createAddress(Address address) {
		return addressRepository.save(address);
	}
	@Transactional
	public boolean deleteAddressById(Long id) {
		if(addressRepository.existsById(id)){
			addressRepository.deleteById(id);
			return true;
		}
		return false;
	}
	
}
