package com.cdweb.backend.dto;

import java.util.Set;


public class OrderDTO {
	private Long userId;
	private boolean online;
	private Long paymentAmout;
	private Long deliveryInfoId;
	private String transType;
	private Long transportFree;
	private Long totalAmout;
	private Set<DetailOrderDTO> detailOrderDTOs;
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
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
	public Long getDeliveryInfoId() {
		return deliveryInfoId;
	}
	public void setDeliveryInfoId(Long deliveryInfoId) {
		this.deliveryInfoId = deliveryInfoId;
	}
	public String getTransType() {
		return transType;
	}
	public void setTransType(String transType) {
		this.transType = transType;
	}
	public Long getTransportFree() {
		return transportFree;
	}
	public void setTransportFree(Long transportFree) {
		this.transportFree = transportFree;
	}
	public Long getTotalAmout() {
		return totalAmout;
	}
	public void setTotalAmout(Long totalAmout) {
		this.totalAmout = totalAmout;
	}
	public Set<DetailOrderDTO> getDetailOrderDTOs() {
		return detailOrderDTOs;
	}
	public void setDetailOrderDTOs(Set<DetailOrderDTO> detailOrderDTOs) {
		this.detailOrderDTOs = detailOrderDTOs;
	}
	@Override
	public String toString() {
		return "OrderDTO [userId=" + userId + ", online=" + online + ", paymentAmout=" + paymentAmout
				+ ", deliveryInfoId=" + deliveryInfoId + ", transType=" + transType + ", transportFree=" + transportFree
				+ ", totalAmout=" + totalAmout + ", detailOrderDTOs=" + detailOrderDTOs + "]";
	}


	
}
