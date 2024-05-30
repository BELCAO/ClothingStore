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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestParam;

import com.cdweb.backend.dto.ProductDTO;
import com.cdweb.backend.service.IProductService;

@CrossOrigin
@RestController
public class ProductController {
	@Autowired
	private IProductService productService;

	@PostMapping(value = "/product")
	public ProductDTO createProduct(@RequestBody ProductDTO model) {
		return productService.save(model);
	}
	//lay tat cả san pham
	//http://localhost:8080/products?page=1&size=2 them page vs size nếu phân trang
	@GetMapping("/products")
	public ResponseEntity<Page<ProductDTO>> getAllProducts(
	        @RequestParam(value = "page", defaultValue = "0") int page,
	        @RequestParam(value = "size", defaultValue = "10") int size) {
	    Pageable pageable = PageRequest.of(page, size);
	    Page<ProductDTO> productPage = productService.getAllProducts(pageable);
	    return ResponseEntity.ok(productPage);
	}
	@GetMapping("/categories/{categoryId}/products")
	public ResponseEntity<Page<ProductDTO>> getProductsByCategory(
	        @PathVariable Long categoryId,
	        @RequestParam(value = "page", defaultValue = "0") int page,
	        @RequestParam(value = "size", defaultValue = "10") int size) {
	    Pageable pageable = PageRequest.of(page, size);
	    Page<ProductDTO> productPage = productService.getProductsByCategory(categoryId, pageable);
	    return ResponseEntity.ok(productPage);
	}
	// api tìm kiếm tức thì theo tên: 
	//http://localhost:8080/products/autocomplete?name=áo
	@GetMapping("/products/autocomplete")
    public ResponseEntity<List<ProductDTO>> autoCompleteSearch(
            @RequestParam("name") String name) {
        List<ProductDTO> productDTOs = productService.autoCompleteSearchByName(name);
        return ResponseEntity.ok(productDTOs);
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
