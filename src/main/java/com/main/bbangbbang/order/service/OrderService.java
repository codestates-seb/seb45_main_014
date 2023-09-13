package com.main.bbangbbang.order.service;

import com.main.bbangbbang.exception.BusinessLogicException;
import com.main.bbangbbang.exception.ExceptionCode;
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
        order.setMember(member); // 임시 1번 member
        order.setStore(store);
        order.setOrderStatus(OrderStatus.ACTIVE);

        return orderRepository.save(order);
    }

    @Transactional(readOnly = true)
    public boolean existActiveOrder(Long memberId) {

        return orderRepository.findByOrderStatusAndMemberId(OrderStatus.ACTIVE, memberId).size() > 0;
    }

    @Transactional
    public Order cancelActiveOrder(Long memberId) {
        if (existActiveOrder(memberId)) {
            Order order = findActiveOrder(memberId);
            order.setOrderStatus(OrderStatus.CANCELED);

            return orderRepository.save(order);
        }
        return null;
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
    public void removeOrder(Member member, Long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        Order order = optionalOrder.orElseThrow(NoSuchElementException::new);
        order.setOrderStatus(OrderStatus.DELETED);
    }

    @Transactional
    public Order doOrder(Order order, Integer minutes) {
        List<OrderMenu> orderMenus = order.getOrderMenus();
        if (orderMenus.size() == 0) throw new BusinessLogicException(ExceptionCode.NO_ITEM);

        for (OrderMenu orderMenu : order.getOrderMenus()) {
            orderMenuService.doOrderMenu(orderMenu);
        }
        order.setPickupTime(LocalDateTime.now().plusMinutes(minutes));
        order.setOrderStatus(OrderStatus.READY);

        return order;
    }

    @Transactional
    public void addCart(Order order, Menu menu, Integer quantity) {
        validateSameStore(order, menu); // 같은 매장의 매뉴임? 아니면 -> Exception!!
        for (OrderMenu orderMenu : order.getOrderMenus())
            if (orderMenu.getMenu().getId().equals(menu.getId())) {
                orderMenu.setQuantity(quantity);
                return;
            }

        order.addOrderMenu(orderMenuService.createOrderMenu(order, menu, quantity));
    }

    @Transactional
    public Order findOrNewOrder(Boolean isNewOrder, Member member, Store store) {
        Order order;
        if (isNewOrder) {
            cancelActiveOrder(member.getId()); // active가 있다면 해당 order -> canceled
            order = createOrder(member, store);
        } else if (!existActiveOrder(member.getId())) {
            order = createOrder(member, store);
        } else {
            order = findActiveOrder(member.getId());
        }
        return order;
    }

    private void validateOneActiveOrder(List<Order> orders) {
        if (orders.size() == 0) {
            throw new BusinessLogicException(ExceptionCode.NO_ACTIVE_ORDER);
        }
        if (orders.size() > 1) {
            throw new BusinessLogicException(ExceptionCode.MANY_ACTIVE_ORDER);
        }
    }

    private void validateSameStore(Order order, Menu menu) {
        if (!order.getStore().getId().equals(menu.getStore().getId())) {
            throw new BusinessLogicException(ExceptionCode.NOT_SAME_STORE);
        }
    }
}
