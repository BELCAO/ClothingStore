package com.cdweb.backend.dto;

import java.util.List;

public class ProductDTO {
	private Long productId;
	private String name;
	private String description;
	private double price;
	private String imageUrl;
	private List<String> imageUrls; 
	private Long categoryId;
	public Long getProductId() {
		return productId;
	}
	public void setProductId(Long productId) {
		this.productId = productId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	
	 public List<String> getImageUrls() {
	        return imageUrls;
	    }

	    public void setImageUrls(List<String> imageUrls) {
	        this.imageUrls = imageUrls;
	    }
	public Long getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}

}
