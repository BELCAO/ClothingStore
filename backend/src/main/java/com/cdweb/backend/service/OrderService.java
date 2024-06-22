package com.cdweb.backend.service;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdweb.backend.dto.DetailOrderDTO;
import com.cdweb.backend.dto.OrderDTO;
import com.cdweb.backend.entity.DeliveryInfo;
import com.cdweb.backend.entity.DetailOrder;
import com.cdweb.backend.entity.Order;
import com.cdweb.backend.entity.Payment;
import com.cdweb.backend.entity.ProductEntity;
import com.cdweb.backend.entity.Transportation;
import com.cdweb.backend.repository.OrderRepository;
import com.cdweb.backend.service.impl.ProductService;

import jakarta.transaction.Transactional;

@Service
public class OrderService {
	@Autowired
	private OrderRepository orderRepository;
	@Autowired
	private ProductService productService;
	@Autowired
	private UserService userService;
	@Autowired
	private PaymentService paymentService;
	@Autowired
	private TransportationService transportationService;
	@Autowired 
	private DeliveryInfoService deliveryInfoService;
	@Transactional
	public List<Order> getAllOrders() {
		return orderRepository.findAll();
	}
	@Transactional
	public Optional<Order> getOrderById(Long id) {
		return orderRepository.findById(id);
	}
	@Transactional
	public Long createOrder(OrderDTO orderDTO) {
		Order order = new Order();
		order = orderRepository.save(order);
		
		order.setUser(userService.getAccountById(orderDTO.getUserId()));
		
		// Phần liên quan đến thanh toán
		Payment payment = new Payment();
		payment.setOnline(orderDTO.isOnline());
		payment.setPaymentAmout(orderDTO.getPaymentAmout());
		payment.setDescription("text");
		payment.setStatus("Chua chuyen tien");
		payment.setOrder(order);
		payment = paymentService.createPayment(payment);
		order.setPayment(payment);
		
		
		// Ngày tạo đơn hàng
		order.setDate(new Date(System.currentTimeMillis()));
		
		// Thông tin vận chuyển
		Optional<DeliveryInfo> deliveryInfo = deliveryInfoService.getDeliveryInfoById(orderDTO.getDeliveryInfoId());
		if(deliveryInfo.isPresent()) {
			order.setDeliveryInfo(deliveryInfo.get());			
		}else {
			return null;
		}
		
		// Vận chuyển
		Transportation transportation = new Transportation();
		transportation.setTransType(orderDTO.getTransType());
		transportation.setTransportFree(orderDTO.getTransportFree());
		transportation.setStartDate(new Date(System.currentTimeMillis()));
		transportation.setEndDate(new Date());
		transportation.setStatus("xac nhan");
		transportation.setOrder(order);
		transportation = transportationService.createTransportation(transportation);
		order.setTransportation(transportation);
		
		// Tổng tiền
		order.setTotalAmout(orderDTO.getTotalAmout());
		
		// Thêm chi tiết đơn hàng
		Set<DetailOrder> detailOrders = new HashSet<>();
		for (DetailOrderDTO detailOrderDTO : orderDTO.getDetailOrderDTOs()) {
			DetailOrder detailOrder = new DetailOrder();
			ProductEntity productEntity = productService.getProducById(detailOrderDTO.getProductEntityId()).orElseThrow(() -> new RuntimeException("Product not found"));
			detailOrder.setProductEntity(productEntity);
			detailOrder.setQuantity(detailOrderDTO.getQuantity());
			detailOrder.setTotalPrice(detailOrderDTO.getTotalPrice());
			detailOrders.add(detailOrder);
			detailOrder.setOrder(order);
		}
		order.setDetailOrders(detailOrders);
		order.setStatus("cho xac nhan");
		
		
		return orderRepository.save(order).getId();
	}
	@Transactional
	public boolean deleteOrderById(Long id) {
		if(orderRepository.existsById(id)) {
			orderRepository.deleteById(id);
			return true;
		}
		return false;
	}
	@Transactional
	public Optional<Order> updateOrderStatus(Long id, String status) {
		return orderRepository.findById(id).map(order ->{
			order.setStatus(status);
			return orderRepository.save(order);
		});
	}
}
