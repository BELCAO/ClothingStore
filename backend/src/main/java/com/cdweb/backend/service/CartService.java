package com.cdweb.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdweb.backend.dto.CartDTO;
import com.cdweb.backend.dto.CartItemDTO;
import com.cdweb.backend.entity.User;
import com.cdweb.backend.entity.Cart;
import com.cdweb.backend.entity.CartItem;
import com.cdweb.backend.entity.ProductEntity;
import com.cdweb.backend.repository.CartItemRepository;
import com.cdweb.backend.repository.CartRepository;
import com.cdweb.backend.repository.ProductRepository;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    public CartDTO getCartByUserId(Long userId) {
        Cart cart = cartRepository.findByUserId(userId);
        return convertToDTO(cart);
    }

    public CartDTO addProductToCart(Long userId, Long productId, int quantity) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) {
            cart = new Cart();
            User user = new User();
            user.setId(userId);
            cart.setUser(user);
            cart = cartRepository.save(cart);
        }

        if (cart.getItems() == null) {
            cart.setItems(new ArrayList<>());
        }

        Optional<ProductEntity> productOpt = productRepository.findById(productId);
        if (!productOpt.isPresent()) {
            throw new RuntimeException("Product not found");
        }
        ProductEntity product = productOpt.get();

        CartItem cartItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getProductId().equals(productId))
                .findFirst()
                .orElse(new CartItem());

        cartItem.setCart(cart);
        cartItem.setProduct(product);
        cartItem.setQuantity(cartItem.getQuantity() + quantity);

        cart.getItems().add(cartItem);
        cartItemRepository.save(cartItem);

        return convertToDTO(cartRepository.save(cart));
    }

    public void removeProductFromCart(Long userId, Long productId) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) {
            throw new RuntimeException("Cart not found");
        }

        cart.getItems().removeIf(item -> item.getProduct().getProductId().equals(productId));
        cartRepository.save(cart);
    }

    private CartDTO convertToDTO(Cart cart) {
        CartDTO cartDTO = new CartDTO();
        cartDTO.setId(cart.getId());
        cartDTO.setUserId(cart.getUser().getId());
        List<CartItemDTO> items = cart.getItems().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        cartDTO.setItems(items);
        cartDTO.setTotalPrice(items.stream().mapToDouble(CartItemDTO::getTotalItemPrice).sum());
        return cartDTO;
    }

    private CartItemDTO convertToDTO(CartItem cartItem) {
        CartItemDTO cartItemDTO = new CartItemDTO();
        cartItemDTO.setId(cartItem.getId());
        cartItemDTO.setProductId(cartItem.getProduct().getProductId());
        cartItemDTO.setProductName(cartItem.getProduct().getName());
        cartItemDTO.setProductImage(cartItem.getProduct().getImageUrl());
        cartItemDTO.setProductPrice(cartItem.getProduct().getPrice());
        cartItemDTO.setQuantity(cartItem.getQuantity());
        cartItemDTO.setTotalItemPrice(cartItem.getQuantity() * cartItem.getProduct().getPrice());
        return cartItemDTO;
    }
}
