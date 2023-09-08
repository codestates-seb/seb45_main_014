package com.main.bbangbbang.order.repository;

import com.main.bbangbbang.order.entity.Order;
import com.main.bbangbbang.order.entity.Order.OrderStatus;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Page<Order> findByMemberIdAndOrderStatusNot(Long memberId, OrderStatus orderStatus, Pageable pageable);
    List<Order> findByOrderStatusAndMemberId(OrderStatus orderStatus, Long memberId);
}
