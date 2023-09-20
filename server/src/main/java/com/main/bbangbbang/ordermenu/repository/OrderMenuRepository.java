package com.main.bbangbbang.ordermenu.repository;

import com.main.bbangbbang.ordermenu.entity.OrderMenu;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderMenuRepository extends JpaRepository<OrderMenu, Long> {
    List<OrderMenu> findByOrderId(Long orderId);
    Optional<OrderMenu> findByMenuIdAndOrderId(Long menuId, Long orderId);
}
