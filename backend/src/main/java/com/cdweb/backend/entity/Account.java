package com.cdweb.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Account {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	String name;
	@Column(unique = true)
	String email;
	String phone;
	String avatar;
	String password;
	int role;
	int status;
	
	public Account() {
		super();
		this.avatar = "avatar";
		this.role = 0;
		this.status = 1;
	}
	public Account(Long id, String name, String email, String phone, String avatar, String password, int role, int status) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.avatar = avatar;
		this.password = password;
		this.role = role;
		this.status = status;
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
	public String getAvatar() {
		return avatar;
	}
	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public int getRole() {
		return role;
	}
	public void setRole(int role) {
		this.role = role;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	
	public String toString() {
		return this.name+"_"+this.email+"_"+this.phone+"_"+this.password;
	}
	
	
}
