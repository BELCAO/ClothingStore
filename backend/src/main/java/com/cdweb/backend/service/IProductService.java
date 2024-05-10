package com.cdweb.backend.service;

import java.util.List;

import com.cdweb.backend.dto.ProductDTO;

public interface IProductService {
	ProductDTO save(ProductDTO productDTO);
//	ProductDTO update(ProductDTO productDTO);

	List<ProductDTO> getAllProducts();

	List<ProductDTO> getProductsByCategory(Long categoryId);
	void delete(long[] ids);
	

}
