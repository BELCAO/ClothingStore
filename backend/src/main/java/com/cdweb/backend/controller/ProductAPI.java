package com.cdweb.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cdweb.backend.dto.ProductDTO;
import com.cdweb.backend.service.IProductService;

@CrossOrigin
@RestController
public class ProductAPI {
	@Autowired
	private IProductService productService;

	@PostMapping(value = "/product")
	public ProductDTO createProduct(@RequestBody ProductDTO model) {
		return productService.save(model);
	}
	//lay tat ca san pham
	@GetMapping("/products")
	public ResponseEntity<List<ProductDTO>> getAllProducts() {
	    List<ProductDTO> products = productService.getAllProducts();
	    return ResponseEntity.ok(products);
	}
	//lay san pham theo id danh muc
	@GetMapping("/categories/{categoryId}/products")
	public ResponseEntity<List<ProductDTO>> getProductsByCategory(@PathVariable Long categoryId) {
	    List<ProductDTO> products = productService.getProductsByCategory(categoryId);
	    return ResponseEntity.ok(products);
	}
	//cap nhat san pham theo id
	@PutMapping(value = "/product/{id}")
	public ProductDTO updateProduct(@RequestBody ProductDTO model, @PathVariable("id") long id) {
		model.setProductId(id);
		return productService.save(model);
	}


	@DeleteMapping(value = "/product")
	public void deleteNew(@RequestBody long[] ids) {
		productService.delete(ids);
	

	}
}
