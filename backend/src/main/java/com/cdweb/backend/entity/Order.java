package com.cdweb.backend.entity;

import java.util.Date;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="orders")
public class Order {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
	@JsonIgnore
	private User user;
	
	@OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_id", referencedColumnName = "id")
	@JsonIgnore
	private Payment payment;
	private Date date;
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "delivery_info_id", referencedColumnName = "id")
	@JsonIgnore
	private DeliveryInfo deliveryInfo;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "transportation_id", referencedColumnName = "id")
	private Transportation transportation;
	private Long totalAmout;
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
	@JsonIgnore
    private Set<DetailOrder> detailOrders;
	private String status;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Payment getPayment() {
		return payment;
	}
	public void setPayment(Payment payment) {
		this.payment = payment;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public DeliveryInfo getDeliveryInfo() {
		return deliveryInfo;
	}
	public void setDeliveryInfo(DeliveryInfo deliveryInfo) {
		this.deliveryInfo = deliveryInfo;
	}
	public Transportation getTransportation() {
		return transportation;
	}
	public void setTransportation(Transportation transportation) {
		this.transportation = transportation;
	}
	public Long getTotalAmout() {
		return totalAmout;
	}
	public void setTotalAmout(Long totalAmout) {
		this.totalAmout = totalAmout;
	}
	public Set<DetailOrder> getDetailOrders() {
		return detailOrders;
	}
	public void setDetailOrders(Set<DetailOrder> detailOrders) {
		this.detailOrders = detailOrders;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	
	
	
	
}
