package com.cdweb.backend.entity;

import java.util.Date;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
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
	@ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
	private User user;
	@Column(name="buyer_name", nullable = false)
	private String buyerName;
	@Column(name="buyer_phone", nullable = false)
	private String buyerPhone;
	@OneToOne
    @JoinColumn(name = "payment_id", referencedColumnName = "id", nullable = false)
	private Payment payment;
	@Column(nullable = false)
	private Date date;
	@ManyToOne
    @JoinColumn(name = "address_id", referencedColumnName = "id", nullable = false)
	private Address address;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "transportation_id", referencedColumnName = "id", nullable = false)
	private Transportation transportation;
	@Column(nullable = false)
	private Long totalAmout;
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
	private Set<DetailOrder> detailOrders;
	@Column(nullable = false)
	private String status;
	
	public Order() {
		super();
	}

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

	public String getBuyerName() {
		return buyerName;
	}

	public void setBuyerName(String buyerName) {
		this.buyerName = buyerName;
	}

	public String getBuyerPhone() {
		return buyerPhone;
	}

	public void setBuyerPhone(String buyerPhone) {
		this.buyerPhone = buyerPhone;
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

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
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
