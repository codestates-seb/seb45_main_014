package com.main.bbangbbang.order.service;

import com.main.bbangbbang.member.entity.Member;
import com.main.bbangbbang.menu.entity.Menu;
import com.main.bbangbbang.order.entity.Order;
import com.main.bbangbbang.order.entity.Order.OrderStatus;
import com.main.bbangbbang.order.repository.OrderRepository;
import com.main.bbangbbang.store.entity.Store;
import java.util.List;
import java.util.NoSuchElementException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@AllArgsConstructor
@Service
public class OrderService {
    private final OrderRepository orderRepository;

    @Transactional
    public Order createOrder(Member member, Store store) {
        Order order = new Order();
        order.setMember(member);
        order.setStore(store);

        return orderRepository.save(order);
    }

    @Transactional(readOnly = true)
    public Order findActiveOrder(Long memberId) {
        List<Order> orders = orderRepository.findByOrderStatusAndMemberId(OrderStatus.ACTIVE, memberId);
        validateOneActiveOrder(orders);

        return orders.get(0);
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

    private void validateOneActiveOrder(List<Order> orders) {
        if (orders.size() == 0) {
            throw new NoSuchElementException();
        }
        if (orders.size() > 1) {
            throw new RuntimeException(); // 추후 BusinessException 구현하여 적용 예정
        }
    }
}
