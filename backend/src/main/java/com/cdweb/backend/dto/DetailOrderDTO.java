package com.cdweb.backend.dto;


public class DetailOrderDTO {
	private Long productEntityId;
	private int quantity;
	private Long totalPrice;
	
	public DetailOrderDTO() {
		super();
	}
	public Long getProductEntityId() {
		return productEntityId;
	}
	public void setProductEntityId(Long productEntityId) {
		this.productEntityId = productEntityId;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public Long getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(Long totalPrice) {
		this.totalPrice = totalPrice;
	}
	
}
