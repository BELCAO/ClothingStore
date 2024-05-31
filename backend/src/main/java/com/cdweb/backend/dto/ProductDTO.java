package com.cdweb.backend.dto;

import java.util.List;

public class ProductDTO {
	private Long productId;
	private String name;
	private String description;
	private double price;
	private String imageUrl;
	private int status;  // 0 for inactive, 1 for active
	private int quantity; 
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
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	

}
