package com.cdweb.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cdweb.backend.entity.Cart;
import com.cdweb.backend.service.CartService;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<Cart> addProductToCart(@RequestBody Map<String, Object> payload) {
        Long accountId = Long.parseLong(payload.get("accountId").toString());
        Long productId = Long.parseLong(payload.get("productId").toString());
        int quantity = Integer.parseInt(payload.get("quantity").toString());
        
        Cart cart = cartService.addProductToCart(accountId, productId, quantity);
        return ResponseEntity.ok(cart);
    }

    @GetMapping("/get")
    public ResponseEntity<Cart> getCart(@RequestParam Long accountId) {
        Cart cart = cartService.getCartByAccountId(accountId);
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<Void> removeProductFromCart(@RequestBody Map<String, Object> payload) {
        Long accountId = Long.parseLong(payload.get("accountId").toString());
        Long productId = Long.parseLong(payload.get("productId").toString());
        
        cartService.removeProductFromCart(accountId, productId);
        return ResponseEntity.noContent().build();
    }
}
