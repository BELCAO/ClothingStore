package com.cdweb.backend.entity;


import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="delivery_info")
public class DeliveryInfo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(length = 30,  nullable = false, name="recipient_name")
    private String recipientName;
	@Column(length = 30,  nullable = false, name="recipient_phone")
    private String recipientPhone;
	@Column(length = 30,  nullable = false)
	private String province;
	@Column(length = 30,  nullable = false)
	private String district;
	@Column(length = 30,  nullable = false)
	private String ward;
	@Column(nullable = false)
	private String description;
//	@ManyToOne(fetch = FetchType.LAZY)
//    @Column(name = "user_id", nullable = false)
//	private User user;
	@Column(name="user_id")
	private Long userId;
	@OneToMany(mappedBy = "deliveryInfo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Set<Order> orders;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
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

//	public User getUser() {
//		return user;
//	}
//	public void setUser(User user) {
//		this.user = user;
//	}
	public Set<Order> getOrders() {
		return orders;
	}
	public void setOrders(Set<Order> orders) {
		this.orders = orders;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	
	
}
