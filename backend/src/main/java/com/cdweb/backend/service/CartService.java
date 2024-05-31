package com.cdweb.backend.service;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdweb.backend.entity.Account;
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

    public Cart getCartByAccountId(Long accountId) {
        return cartRepository.findByAccountId(accountId);
    }

    public Cart addProductToCart(Long accountId, Long productId, int quantity) {
        Cart cart = cartRepository.findByAccountId(accountId);
        if (cart == null) {
            cart = new Cart();
            Account account = new Account();
            account.setId(accountId);
            cart.setAccount(account);
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

        return cartRepository.save(cart);
    }

    public void removeProductFromCart(Long accountId, Long productId) {
        Cart cart = cartRepository.findByAccountId(accountId);
        if (cart == null) {
            throw new RuntimeException("Cart not found");
        }

        cart.getItems().removeIf(item -> item.getProduct().getProductId().equals(productId));
        cartRepository.save(cart);
    }
}
