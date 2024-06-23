package com.cdweb.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdweb.backend.entity.DeliveryInfo;
import com.cdweb.backend.service.DeliveryInfoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/deliveryinfos")
public class DeliveryInfoController {
	@Autowired
	private DeliveryInfoService deliveryInfoService;
	
	@GetMapping("/{userId}")
	public ResponseEntity<List<DeliveryInfo>> getDeliveryInfoByUser(@PathVariable Long userId) {
		return ResponseEntity.ok().body(deliveryInfoService.getDeliveryInfoByUser(userId));
	}
	
}
