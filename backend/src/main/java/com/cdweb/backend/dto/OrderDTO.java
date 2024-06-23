package com.cdweb.backend.dto;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;


public class OrderDTO {
	private Long userId;
	private boolean online;
	private Long paymentAmout;
	private String transType;
	private Long transportFree;
	private Long totalAmout;
	private Set<DetailOrderDTO> detailOrderDTOs = new HashSet<>();
	
	
    private String recipientName;
    private String recipientPhone;
	private String province;
	private String district;
	private String ward;
	private String description;
	
	private String status;
	private String date;
	
	private Long id;
	private String name;
	

	
	
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
	public void addDetailOrderDTOs(DetailOrderDTO detailOrderDTOs) {
		this.detailOrderDTOs.add(detailOrderDTOs);
	}
	
	
	
	public String getRecipientName() {
		return recipientName;
	}
	public void setRecipientName(String recipientName) {
		this.recipientName = recipientName;
	}
	public String getRecipientPhone() {
		return recipientPhone;
	}
	public void setRecipientPhone(String recipientPhone) {
		this.recipientPhone = recipientPhone;
	}
	public String getProvince() {
		return province;
	}
	public void setProvince(String province) {
		this.province = province;
	}
	public String getDistrict() {
		return district;
	}
	public void setDistrict(String district) {
		this.district = district;
	}
	public String getWard() {
		return ward;
	}
	public void setWard(String ward) {
		this.ward = ward;
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
	
	
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	@Override
	public String toString() {
		return "OrderDTO [userId=" + userId + ", online=" + online + ", paymentAmout=" + paymentAmout
				+ ", transType=" + transType + ", transportFree=" + transportFree
				+ ", totalAmout=" + totalAmout + ", detailOrderDTOs=" + detailOrderDTOs + ", recipientName="
				+ recipientName + ", recipientPhone=" + recipientPhone + ", province=" + province + ", district="
				+ district + ", ward=" + ward + ", description=" + description + "]";
	}

	
	

	
}
