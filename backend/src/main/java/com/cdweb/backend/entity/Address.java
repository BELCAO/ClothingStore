package com.cdweb.backend.entity;


import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="addresses")
public class Address {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(length = 30,  nullable = false)
	private String province;
	@Column(length = 30,  nullable = false)
	private String district;
	@Column(length = 30,  nullable = false)
	private String ward;
	@Column(nullable = false)
	private String description;
	@ManyToOne
    @JoinColumn(name = "user_id")
	private User user;
	@OneToMany(mappedBy = "address", cascade = CascadeType.ALL)
	private Set<Order> orders;
	
	
	public Address() {
		super();
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
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
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Set<Order> getOrder() {
		return orders;
	}
	public void setOrder(Set<Order> orders) {
		this.orders = orders;
	}
	
	
	
	
}
