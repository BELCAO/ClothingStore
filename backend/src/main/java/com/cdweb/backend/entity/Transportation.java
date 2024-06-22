package com.cdweb.backend.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class Transportation {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "trans_type", nullable = false)
	private String transType;
	@Column(name = "start_date", nullable = false)
	private Date startDate;
	@Column(name = "end_date", nullable = false)
	private Date endDate;
	@Column(name = "transport_free", nullable = false)
	private Long transportFree;
	@Column( nullable = false)
	private String status;
    @OneToOne(mappedBy = "transportation", fetch = FetchType.LAZY)
    private Order order;
//    private Long orderId;
	
	public Transportation() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTransType() {
		return transType;
	}

	public void setTransType(String transType) {
		this.transType = transType;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public Long getTransportFree() {
		return transportFree;
	}

	public void setTransportFree(Long transportFree) {
		this.transportFree = transportFree;
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
