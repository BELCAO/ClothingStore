package com.cdweb.backend.entity;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;


import com.cdweb.backend.enums.Role;
import com.cdweb.backend.enums.Status;
import com.fasterxml.jackson.annotation.JsonIgnore;

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
@Table(name="users")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;
	@Column(name="name", length = 50, nullable = false)
	private String name;
	@Column(name="email", unique = true, length = 50, nullable = false)
	private String email;
	@Column(name="phone", length = 20, nullable = false)
	private String phone;
	@Column(name="gender", length = 10)
	private String gender;
	@Column(name="password", nullable = false)
	private String password;
	private Date birthday;
	private String avatarUrl;
	@Column(nullable = false)
	private String role;
	@Column(length = 10, nullable = false)
	private String status;
	
	@OneToMany(mappedBy = "userId", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonIgnore
	private Set<DeliveryInfo> deliveryInfos;
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonIgnore
	private Set<Order> orders;
	
	
	public User() {
		super();
	}

	public User(String name, String email, String phone, String password) {
		super();
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.password = password;
		this.role = Role.USER.name();
		this.status = Status.NORMAL.name();
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getAvatarUrl() {
		return avatarUrl;
	}

	public void setAvatarUrl(String avatarUrl) {
		this.avatarUrl = avatarUrl;
	}


	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Set<DeliveryInfo> getDeliveryInfos() {
		return deliveryInfos;
	}

	public void setDeliveryInfos(Set<DeliveryInfo> deliveryInfos) {
		this.deliveryInfos = deliveryInfos;
	}

	public Set<Order> getOrders() {
		return orders;
	}

	public void setOrders(Set<Order> orders) {
		this.orders = orders;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", email=" + email + ", phone=" + phone + ", gender=" + gender
				+ ", password=" + password + ", birthday=" + birthday + ", avatarUrl=" + avatarUrl + ", role=" + role
				+ ", status=" + status + ", deliveryInfos=" + deliveryInfos + ", orders=" + orders + "]";
	}
	

	
	
}
