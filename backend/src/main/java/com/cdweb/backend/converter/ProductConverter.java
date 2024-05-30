package com.cdweb.backend.converter;

import org.springframework.stereotype.Component;

import com.cdweb.backend.dto.ProductDTO;
import com.cdweb.backend.entity.CategoryEntity;
import com.cdweb.backend.entity.ProductEntity;

@Component
public class ProductConverter {
	public ProductEntity toEntity(ProductDTO dto) {
		ProductEntity entity = new ProductEntity();
		entity.setDescription(dto.getDescription());
		entity.setImageUrl(dto.getImageUrl());
		entity.setName(dto.getName());
		entity.setPrice(dto.getPrice());
		entity.setImageUrls(dto.getImageUrls()); 
		entity.setQuantity(dto.getQuantity());
		entity.setStatus(dto.getStatus());
		return entity;
		
	}
	public ProductDTO toDTO(ProductEntity entity) {
		ProductDTO dto = new ProductDTO();
		if(entity.getProductId() != null) {
			dto.setProductId(entity.getProductId());
		}
		dto.setDescription(entity.getDescription());
		dto.setImageUrl(entity.getImageUrl());
		dto.setName(entity.getName());
		dto.setPrice(entity.getPrice());
		dto.setQuantity(entity.getQuantity());
		dto.setStatus(entity.getStatus());
		   dto.setImageUrls(entity.getImageUrls()); 
		   dto.setCategoryId(entity.getCategory().getCategoryId());
		  
		return dto;
		
	}
	
	public ProductEntity toEntity(ProductDTO dto, ProductEntity entity) {
		entity.setDescription(dto.getDescription());
		entity.setImageUrl(dto.getImageUrl());
		entity.setName(dto.getName());
		entity.setPrice(dto.getPrice());
		entity.setImageUrls(dto.getImageUrls()); 
		entity.setQuantity(dto.getQuantity());
		entity.setStatus(dto.getStatus());
		return entity;
		
	}

}
