package com.cdweb.backend.service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdweb.backend.dto.DetailOrderDTO;
import com.cdweb.backend.dto.OrderDTO;
import com.cdweb.backend.entity.Address;
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
	private AddressService addressService;
	@Transactional
	public List<Order> getAllOrders() {
		return orderRepository.findAll();
	}
	@Transactional
	public Optional<Order> getOrderById(Long id) {
		return orderRepository.findById(id);
	}
	@Transactional
	public Order createOrder(OrderDTO orderDTO) {
		Order order = new Order();
		System.out.println(orderDTO.toString());
		order.setUser(userService.getAccountById(orderDTO.getUserId()));
		order.setBuyerName(orderDTO.getBuyerName());
		order.setBuyerPhone(orderDTO.getBuyerPhone());
		
		Payment payment = orderDTO.getPayment();
		payment.setOrder(order);
		payment = paymentService.createPayment(payment);
		order.setPayment(payment);
		
		order.setDate(orderDTO.getDate());
		order.setAddress(orderDTO.getAddress());

		Transportation transportation = orderDTO.getTransportation();
		transportation.setOrder(order);
		transportation = transportationService.createTransportation(transportation);
		order.setTransportation(transportation);
		
		Address address = orderDTO.getAddress();
		address = addressService.createAddress(address);
		order.setAddress(address);
		
		order.setTotalAmout(orderDTO.getTotalAmout());
		order.setStatus("Check");
		
		order = orderRepository.save(order);
		Set<DetailOrder> detailOrders = new HashSet<>();
		for (DetailOrderDTO detailOrderDTO : orderDTO.getDetailOrderDTOs()) {
			DetailOrder detailOrder = new DetailOrder();
			ProductEntity productEntity = productService.getProducById(detailOrderDTO.getProductEntityId()).orElseThrow(() -> new RuntimeException("Product not found"));
			detailOrder.setProductEntity(productEntity);
			detailOrder.setQuantity(detailOrderDTO.getQuantity());
			detailOrder.setTotalPrice(detailOrderDTO.getTotalPrice());
			detailOrder.setOrder(order);
			detailOrders.add(detailOrder);
		}
		order.setDetailOrders(detailOrders);
		return orderRepository.save(order);
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
