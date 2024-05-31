package com.cdweb.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdweb.backend.entity.Transportation;
import com.cdweb.backend.repository.TransportationRepository;

import jakarta.transaction.Transactional;

@Service
public class TransportationService {
	@Autowired
	private TransportationRepository transportationRepository;
	@Transactional
	public Optional<Transportation> getTransportationById(Long id){
		return transportationRepository.findById(id);
	}
	@Transactional
	public Transportation createTransportation(Transportation transportation) {
		return transportationRepository.save(transportation);
	}
	@Transactional
	public boolean deleteTransportationById(Long id) {
		if(transportationRepository.existsById(id)) {
			transportationRepository.deleteById(id);
			return true;
		}
		return false;
	}

}
