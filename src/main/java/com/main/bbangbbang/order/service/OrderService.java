package com.main.bbangbbang.order.service;

import com.main.bbangbbang.member.entity.Member;
import com.main.bbangbbang.member.service.MemberService;
import com.main.bbangbbang.menu.entity.Menu;
import com.main.bbangbbang.order.entity.Order;
import com.main.bbangbbang.order.entity.Order.OrderStatus;
import com.main.bbangbbang.order.repository.OrderRepository;
import com.main.bbangbbang.ordermenu.entity.OrderMenu;
import com.main.bbangbbang.ordermenu.service.OrderMenuService;
import com.main.bbangbbang.store.entity.Store;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@AllArgsConstructor
@Service
public class OrderService {
    private final OrderMenuService orderMenuService;
    private final OrderRepository orderRepository;
    private final MemberService memberService;

    @Transactional
    public Order createOrder(Member member, Store store) {
        Order order = new Order();
        order.setMember(memberService.findMember("hellobread1@googol.com")); // 임시 1번 member
        order.setStore(store);
        order.setOrderStatus(OrderStatus.ACTIVE);

        return orderRepository.save(order);
    }

    @Transactional(readOnly = true)
    public Order findOrder(Long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);

        return optionalOrder.orElseThrow(NoSuchElementException::new);
    }

    @Transactional(readOnly = true)
    public Order findActiveOrder(Long memberId) {
        List<Order> orders = orderRepository.findByOrderStatusAndMemberId(OrderStatus.ACTIVE, memberId);
        validateOneActiveOrder(orders);

        return orders.get(0);
    }

    @Transactional(readOnly = true)
    public Page<Order> findOrders(Long memberId, Integer page, Integer size) {

        return orderRepository.findByMemberIdAndOrderStatusNot(
                memberId,
                OrderStatus.DELETED,
                PageRequest.of(page-1, size)
        );
    }

    @Transactional
    public void removeOrder(Long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        Order order = optionalOrder.orElseThrow(NoSuchElementException::new);
        order.setOrderStatus(OrderStatus.DELETED);
    }

    @Transactional
    public Order doOrder(Order order, Integer minutes) {
        order.setPickupTime(LocalDateTime.now().plusMinutes(minutes));
        order.setOrderStatus(OrderStatus.READY);

        return order;
    }

    @Transactional
    public void addCart(Order order, Menu menu, Integer quantity) {
        for (OrderMenu orderMenu : order.getOrderMenus())
            if (orderMenu.getMenu().getId().equals(menu.getId())) {
                orderMenu.setQuantity(orderMenu.getQuantity() + quantity);
                return;
            }

        order.addOrderMenu(orderMenuService.createOrderMenu(order, menu, quantity));
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
