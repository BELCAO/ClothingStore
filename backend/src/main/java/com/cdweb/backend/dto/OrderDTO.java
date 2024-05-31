package com.cdweb.backend.dto;
import java.util.Date;
import java.util.List;
import com.cdweb.backend.entity.Address;
import com.cdweb.backend.entity.Payment;
import com.cdweb.backend.entity.Transportation;


public class OrderDTO {
	private Long userId;
	private String buyerName;
	private String buyerPhone;
	private Payment payment;
	private Date date;
	private Address address;
	private Transportation transportation;
	private Long totalAmout;
	private List<DetailOrderDTO> detailOrderDTOs;
	
	public OrderDTO() {
		super();
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
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
	public List<DetailOrderDTO> getDetailOrderDTOs() {
		return detailOrderDTOs;
	}
	public void setDetailOrderDTOs(List<DetailOrderDTO> detailOrderDTOs) {
		this.detailOrderDTOs = detailOrderDTOs;
	}
	@Override
	public String toString() {
		return "OrderDTO [userId=" + userId + ", buyerName=" + buyerName + ", buyerPhone=" + buyerPhone + ", payment="
				+ payment + ", date=" + date + ", address=" + address + ", transportation=" + transportation
				+ ", totalAmout=" + totalAmout + ", detailOrderDTOs=" + detailOrderDTOs + "]";
	}
	
}
