package com.cdweb.backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.cdweb.backend.converter.ProductConverter;
import com.cdweb.backend.dto.ProductDTO;
import com.cdweb.backend.entity.CategoryEntity;
import com.cdweb.backend.entity.ProductEntity;
import com.cdweb.backend.repository.CategoryRepository;
import com.cdweb.backend.repository.ProductRepository;
import com.cdweb.backend.service.IProductService;

import org.springframework.data.domain.Pageable;



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
	    public Page<ProductDTO> getAllProducts(Pageable pageable) {
	        return productRepository.findAll(pageable)
	                .map(productConverter::toDTO);
	    }

	 @Override
	 public Page<ProductDTO> getProductsByCategory(Long categoryId, Pageable pageable) {
	     CategoryEntity categoryEntity = categoryRepository.findById(categoryId)
	             .orElseThrow();
	     Page<ProductEntity> productEntities = productRepository.findByCategory(categoryEntity, pageable);
	     return productEntities.map(productConverter::toDTO);
	 }


	@Override
	public void delete(long[] ids) {
		// TODO Auto-generated method stub
		for(long item:ids) {
			productRepository.deleteById(item);
		}
		
	}
	
    @Override
    public List<ProductDTO> autoCompleteSearchByName(String name) {
        List<ProductEntity> productEntities = productRepository.findTop10ByNameContainingIgnoreCase(name);
        return productEntities.stream()
                .map(productConverter::toDTO)
                .collect(Collectors.toList());
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
