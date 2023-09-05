package com.main.bbangbbang.ordermenu.repository;

import com.main.bbangbbang.ordermenu.entity.OrderMenu;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderMenuRepository extends JpaRepository<OrderMenu, Long> {
    List<OrderMenu> findByOrderId(Long orderId);
}
