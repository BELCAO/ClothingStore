package com.cdweb.backend.service;

import java.text.SimpleDateFormat;
import java.time.ZonedDateTime;
import java.time.format.DateTimeParseException;
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
	public OrderDTO getOrderById(Long id) {
		OrderDTO result = new OrderDTO();
		Optional<Order> orderOptional = orderRepository.findById(id);
		if (orderOptional.isPresent()) {
		    Order order = orderOptional.get();
		    result.setOnline(order.getPayment().isOnline());
		    result.setPaymentAmout(order.getPayment().getPaymentAmout());
		    result.setTransType(order.getTransportation().getTransType());
		    result.setTransportFree(order.getTransportation().getTransportFree());
		    result.setTotalAmout(order.getTotalAmout());
		    
		    result.setRecipientName(order.getDeliveryInfo().getRecipientName());
		    result.setRecipientPhone(order.getDeliveryInfo().getRecipientPhone());
		    result.setProvince(order.getDeliveryInfo().getProvince());
		    result.setDistrict(order.getDeliveryInfo().getDistrict());
		    result.setWard(order.getDeliveryInfo().getWard());
		    result.setDescription(order.getDeliveryInfo().getDistrict());
		    
		    Set<DetailOrder> detailOrders = order.getDetailOrders();
		    for (DetailOrder detailOrder : detailOrders) {
				DetailOrderDTO detailOrderDTO = new DetailOrderDTO();
				detailOrderDTO.setProductEntityId(detailOrder.getProductEntity().getProductId());
				detailOrderDTO.setQuantity(detailOrder.getQuantity());
				detailOrderDTO.setTotalPrice(detailOrder.getTotalPrice());
				detailOrderDTO.setImageUrl(detailOrder.getProductEntity().getImageUrl());
				detailOrderDTO.setProductName(detailOrder.getProductEntity().getName());
				detailOrderDTO.setProductPrice(detailOrder.getProductEntity().getPrice());
				result.addDetailOrderDTOs(detailOrderDTO);
			}
		    result.setStatus(order.getStatus());
		    result.setDate(formatDate(order.getDate()));
		}
		return result;
//		return orderRepository.findById(id);
	}
	@Transactional
	public Long createOrder(OrderDTO orderDTO) {
		System.out.println(orderDTO.toString());
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
		
//		// Thông tin vận chuyển
//		Optional<DeliveryInfo> deliveryInfo = deliveryInfoService.getDeliveryInfoById(orderDTO.getDeliveryInfoId());
//		if(deliveryInfo.isPresent()) {
//			order.setDeliveryInfo(deliveryInfo.get());			
//		}else {
//			return null;
//		}
		
		DeliveryInfo deliveryInfo = new DeliveryInfo();
		deliveryInfo.setRecipientName(orderDTO.getRecipientName());
		deliveryInfo.setRecipientPhone(orderDTO.getRecipientPhone());
		deliveryInfo.setProvince(orderDTO.getProvince());
		deliveryInfo.setDistrict(orderDTO.getDistrict());
		deliveryInfo.setWard(orderDTO.getWard());
		deliveryInfo.setDescription(orderDTO.getDescription());
		deliveryInfo.setUserId(orderDTO.getUserId());
		deliveryInfo = deliveryInfoService.createDeliveryInfo(deliveryInfo);
		order.setDeliveryInfo(deliveryInfo);
		
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
	
	private String formatDate(Date date) {
        try {
            // Định dạng đối tượng Date thành chuỗi ngày giờ
            SimpleDateFormat outputFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
            String formattedDate = outputFormat.format(date);
            return formattedDate;
        } catch (DateTimeParseException e) {
            System.err.println("Invalid date format: ");
        }
        return null;
	}
}
