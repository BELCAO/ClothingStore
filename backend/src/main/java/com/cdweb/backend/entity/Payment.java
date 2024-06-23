package com.cdweb.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class Payment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false)
	private boolean online;
	@Column(nullable = false)
	private Long paymentAmout;
	private String description;
	@Column(nullable = false)
	private String status;
    @OneToOne(mappedBy = "payment", fetch = FetchType.LAZY)
    private Order order;
//    private Long orderId;
	
	public Payment() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public boolean isOnline() {
		return online;
	}

	public void setOnline(boolean online) {
		this.online = online;
	}

	public Long getPaymentAmout() {
		return paymentAmout;
	}

	public void setPaymentAmout(Long paymentAmout) {
		this.paymentAmout = paymentAmout;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

//	public Long getOrderId() {
//		return orderId;
//	}
//
//	public void setOrderId(Long orderId) {
//		this.orderId = orderId;
//	}

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}
	
	
	
}
