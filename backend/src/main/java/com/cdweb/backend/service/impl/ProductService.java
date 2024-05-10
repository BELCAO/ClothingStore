package com.cdweb.backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdweb.backend.converter.ProductConverter;
import com.cdweb.backend.dto.ProductDTO;
import com.cdweb.backend.entity.CategoryEntity;
import com.cdweb.backend.entity.ProductEntity;
import com.cdweb.backend.repository.CategoryRepository;
import com.cdweb.backend.repository.ProductRepository;
import com.cdweb.backend.service.IProductService;

@Service
public class ProductService implements IProductService {
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private CategoryRepository categoryRepository;
	@Autowired 
	private ProductConverter productConverter;

	@Override
	public ProductDTO save(ProductDTO productDTO) {
		ProductEntity productEntity = new ProductEntity();
		if(productDTO.getProductId() !=null) {
			ProductEntity oldProductEntity = productRepository.findOneByProductId(productDTO.getProductId());
			productEntity = productConverter.toEntity(productDTO, oldProductEntity);
			
		} else {
			productEntity = productConverter.toEntity(productDTO);
			
		}
		CategoryEntity categoryEntity = categoryRepository.findOneByCategoryId(productDTO.getCategoryId());
		productEntity.setCategory(categoryEntity);
		productEntity = productRepository.save(productEntity);
		return productConverter.toDTO(productEntity);
		
		
	}

	@Override
	public List<ProductDTO> getAllProducts() {
	    List<ProductEntity> productEntities = productRepository.findAll();
	    return productEntities.stream()
	            .map(productConverter::toDTO)
	            .collect(Collectors.toList());
	}

	public List<ProductDTO> getProductsByCategory(Long categoryId) {
	    CategoryEntity categoryEntity = categoryRepository.findById(categoryId)
	            .orElseThrow();
	    List<ProductEntity> productEntities = categoryEntity.getProducts();
	    return productEntities.stream()
	            .map(productConverter::toDTO)
	            .collect(Collectors.toList());
	}

	@Override
	public void delete(long[] ids) {
		// TODO Auto-generated method stub
		for(long item:ids) {
			productRepository.deleteById(item);
		}
		
	}

//	@Override
//	public ProductDTO update(ProductDTO productDTO) {
//		ProductEntity oldProductEntity = productRepository.findOne(productDTO.getProductId());
//		ProductEntity productEntity = productConverter.toEntity(productDTO, oldProductEntity);
//		CategoryEntity categoryEntity = categoryRepository.findOneByCategoryId(productDTO.getCategoryId());
//		productEntity.setCategory(categoryEntity);
//		productEntity = productRepository.save(productEntity);
//		return productConverter.toDTO(productEntity);
//	
//	}

}
