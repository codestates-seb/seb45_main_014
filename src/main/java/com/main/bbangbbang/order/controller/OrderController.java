package com.main.bbangbbang.order.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class OrderController {

    @GetMapping("/cart")
    public ResponseEntity<?> getActiveOrder() {
        return null;
    }

    @PostMapping("/cart")
    public ResponseEntity<?> doOrder(@RequestParam("pickup_time") Integer minutes) { //pickup_time 명확한 명칭으로 수정 필
        return null;
    }

    @PostMapping("/cart/{menu-id}")
    public ResponseEntity<?> addCart(@PathVariable("menu-id") Long menuId,
                                     @RequestParam("quantity") Integer quantity,
                                     @RequestParam("new_order") Boolean isNewOrder) {
        return null;
    }

    @GetMapping("/members/orders")
    public ResponseEntity<?> getOrders(@RequestParam("page") int page,
                                       @RequestParam("size") int size) {
        return null;
    }

    @DeleteMapping("/members/orders/{order-id}")
    public ResponseEntity<?> deleteOrder(@PathVariable("order-id") long orderId) {
        return null;
    }
}
