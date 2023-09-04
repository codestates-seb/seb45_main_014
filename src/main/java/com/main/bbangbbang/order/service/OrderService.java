package com.main.bbangbbang.order.service;

import com.main.bbangbbang.member.entity.Member;
import com.main.bbangbbang.menu.entity.Menu;
import com.main.bbangbbang.order.entity.Order;
import com.main.bbangbbang.store.entity.Store;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class OrderService {
    @Transactional
    public Order createOrder(Member member, Store store) {
        return null;
    }

    @Transactional(readOnly = true)
    public Order findActiveOrder(Long memberId) {
        return null;
    }

    @Transactional(readOnly = true)
    public Page<Order> findOrders(Long memberId, Integer page, Integer size) {
        return null;
    }

    @Transactional
    public void removeOrder(Long orderId) {
    }

    @Transactional
    public Order doOrder(Order order, Integer minutes) {
        return null;
    }

    @Transactional
    public void addCart(Order order, Menu menu, Integer quantity) {
    }
}
