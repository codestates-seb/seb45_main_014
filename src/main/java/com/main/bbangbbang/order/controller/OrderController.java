package com.main.bbangbbang.order.controller;

import com.main.bbangbbang.member.entity.Member;
import com.main.bbangbbang.member.service.MemberService;
import com.main.bbangbbang.menu.entity.Menu;
import com.main.bbangbbang.menu.service.MenuService;
import com.main.bbangbbang.order.data.OrderData;
import com.main.bbangbbang.order.dto.OrderResponseDto;
import com.main.bbangbbang.order.dto.OrdersResponseDto;
import com.main.bbangbbang.order.entity.Order;
import com.main.bbangbbang.order.entity.Order.OrderStatus;
import com.main.bbangbbang.order.mapper.OrderMapper;
import com.main.bbangbbang.order.service.OrderService;
import com.main.bbangbbang.store.entity.Store;
import com.main.bbangbbang.store.service.StoreService;
import com.main.bbangbbang.utils.PageInfo;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class OrderController { // jwt토큰 parsing하여 Member확인이 가능할 때까지 memberId = 1로 고정
    private final OrderService orderService;
    private final StoreService storeService;
    private final MenuService menuService;
    private final MemberService memberService;
    private final OrderMapper orderMapper;

    @GetMapping("/cart")
    public ResponseEntity<OrderResponseDto> getActiveOrder() {
        Order order = orderService.findActiveOrder(1L);

        return ResponseEntity.ok(new OrderResponseDto(orderMapper.orderToOrderData(order)));
    }

    @PostMapping("/cart")
    public ResponseEntity<OrderResponseDto> doOrder(@RequestParam("pickup_time") Integer minutes) { //pickup_time 명확한 명칭으로 수정 필
        Order order = orderService.findActiveOrder(1L);
        Order doneOrder = orderService.doOrder(order, minutes);

        if (doneOrder.getOrderStatus() == OrderStatus.CANCELED) {
            return ResponseEntity.status(410).build();
        }

        return ResponseEntity. ok(new OrderResponseDto(orderMapper.orderToOrderData(doneOrder)));
    }

    @PostMapping("/cart/{menu-id}")
    public ResponseEntity<?> addCart(@PathVariable("menu-id") Long menuId,
                                     @RequestParam("quantity") Integer quantity,
                                     @RequestParam(value = "new_order", defaultValue = "false") Boolean isNewOrder) { // order.storeId에 대한 비교도 필요 -> exception for frontend
        Menu menu = menuService.findMenu(menuId);
        Store store = storeService.findStoreByMenu(menu);
        Member member = memberService.findMember("hellobread1@googol.com"); // 임시 1번 멤버
        Order order;

        if (isNewOrder) {
            orderService.findActiveOrder(1L).setOrderStatus(OrderStatus.CANCELED); // active가 있다면 해당 order -> canceled
            order = orderService.createOrder(member, store);
        } else {
            order = orderService.findActiveOrder(1L);
        }
        orderService.addCart(order, menu, quantity);

        return ResponseEntity.ok().body(new OrderResponseDto(orderMapper.orderToOrderData(order)));
    }

    @GetMapping("/members/orders")
    public ResponseEntity<OrdersResponseDto> getOrders(@RequestParam("page") int page,
                                                       @RequestParam("size") int size) {
        Page<Order> orderPage = orderService.findOrders(1L, page, size);
        PageInfo pageInfo = PageInfo.of(page, size, orderPage);

        List<OrderData> orders = orderPage.stream()
                .map(orderMapper::orderToOrderData)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new OrdersResponseDto(orders, pageInfo));
    }

    @DeleteMapping("/members/orders/{order-id}")
    public ResponseEntity<?> deleteOrder(@PathVariable("order-id") long orderId) {
        orderService.removeOrder(orderId);

        return ResponseEntity.noContent().build();
    }
}
