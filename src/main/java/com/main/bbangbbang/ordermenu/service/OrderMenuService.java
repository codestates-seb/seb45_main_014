package com.main.bbangbbang.ordermenu.service;

import com.main.bbangbbang.menu.entity.Menu;
import com.main.bbangbbang.order.entity.Order;
import com.main.bbangbbang.ordermenu.entity.OrderMenu;
import com.main.bbangbbang.ordermenu.repository.OrderMenuRepository;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class OrderMenuService {
    private final OrderMenuRepository orderMenuRepository;

    @Transactional
    public OrderMenu createOrderMenu(Order order, Menu menu, Integer quantity) {
        OrderMenu orderMenu = new OrderMenu();
        orderMenu.setMenu(menu);
        orderMenu.setOrder(order);
        orderMenu.setQuantity(quantity);

        return orderMenuRepository.save(orderMenu);
    }

    @Transactional(readOnly = true)
    public List<OrderMenu> findOrderMenus(Long orderId) {
        return orderMenuRepository.findByOrderId(orderId);
    }
}
