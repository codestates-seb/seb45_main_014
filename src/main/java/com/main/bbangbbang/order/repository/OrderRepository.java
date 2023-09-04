package com.main.bbangbbang.order.repository;

import com.main.bbangbbang.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
