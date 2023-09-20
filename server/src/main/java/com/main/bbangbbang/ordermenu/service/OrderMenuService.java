package com.main.bbangbbang.ordermenu.service;

import com.main.bbangbbang.exception.BusinessLogicException;
import com.main.bbangbbang.exception.ExceptionCode;
import com.main.bbangbbang.menu.entity.Menu;
import com.main.bbangbbang.menu.service.MenuService;
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
    private final MenuService menuService;
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

    @Transactional
    public void doOrderMenu(OrderMenu orderMenu) throws RuntimeException {
        menuService.calculateStock(orderMenu.getMenu(), orderMenu.getQuantity());
    }

    @Transactional
    public void deleteOrderMenus(List<Long> menuIds, Long orderId) {
        for (Long menuId : menuIds) {
            OrderMenu orderMenu = orderMenuRepository.findByMenuIdAndOrderId(menuId, orderId)
                    .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NO_ITEM));
            orderMenuRepository.delete(orderMenu);
        }
    }
}
