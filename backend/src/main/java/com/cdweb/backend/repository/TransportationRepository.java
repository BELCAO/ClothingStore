package com.cdweb.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.cdweb.backend.entity.Transportation;

@Component
public interface TransportationRepository extends JpaRepository<Transportation, Long> {

}
