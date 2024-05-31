package com.cdweb.backend.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.cdweb.backend.dto.ProductDTO;
import org.springframework.data.domain.Pageable;
public interface IProductService {
	ProductDTO save(ProductDTO productDTO);
//	ProductDTO update(ProductDTO productDTO);

	 Page<ProductDTO> getAllProducts(Pageable pageable);

	 Page<ProductDTO> getProductsByCategory(Long categoryId, Pageable pageable);

	void delete(long[] ids);
	 List<ProductDTO> autoCompleteSearchByName(String name);
	

}
