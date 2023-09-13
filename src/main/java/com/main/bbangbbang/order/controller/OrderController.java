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
import org.springframework.security.core.Authentication;
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
    public ResponseEntity<OrderResponseDto> getActiveOrder(Authentication authentication) {
        String email = authentication.getPrincipal().toString();
        Member member = memberService.findMember(email);
        Order order = orderService.findActiveOrder(member.getId());

        return ResponseEntity.ok(new OrderResponseDto(orderMapper.orderToOrderData(order)));
    }

    @PostMapping("/cart")
    public ResponseEntity<OrderResponseDto> doOrder(@RequestParam("pickup_time") Integer minutes,
                                                    Authentication authentication) { //pickup_time 명확한 명칭으로 수정 필
        String email = authentication.getPrincipal().toString();
        Member member = memberService.findMember(email);

        Order order = orderService.findActiveOrder(member.getId());
        Order doneOrder = orderService.doOrder(order, minutes);

        if (doneOrder.getOrderStatus() == OrderStatus.CANCELED) { // 취소됐을 때 재주문에 대한 로직 필요
            return ResponseEntity.status(410).build(); // test 확인용 임시 코드
        }

        return ResponseEntity.ok(new OrderResponseDto(orderMapper.orderToOrderData(doneOrder)));
    }

    @PostMapping("/cart/{menu-id}")
    public ResponseEntity<?> addCart(@PathVariable("menu-id") Long menuId,
                                     @RequestParam("quantity") Integer quantity,
                                     @RequestParam(value = "new_order", defaultValue = "false") Boolean isNewOrder,
                                     Authentication authentication) {
        String email = authentication.getPrincipal().toString();
        Member member = memberService.findMember(email);
        Menu menu = menuService.findMenu(menuId);
        Store store = storeService.findStoreByMenu(menu);
        Order order = orderService.findOrNewOrder(isNewOrder, member, store);

        orderService.addCart(order, menu, quantity);

        return ResponseEntity.ok().body(new OrderResponseDto(orderMapper.orderToOrderData(order)));
    }

    @GetMapping("/members/orders")
    public ResponseEntity<OrdersResponseDto> getOrders(@RequestParam("page") int page,
                                                       @RequestParam("size") int size,
                                                       Authentication authentication) {
        String email = authentication.getPrincipal().toString();
        Member member = memberService.findMember(email);

        Page<Order> orderPage = orderService.findOrders(member.getId(), page, size);
        PageInfo pageInfo = PageInfo.of(page, size, orderPage);

        List<OrderData> orders = orderPage.stream()
                .map(orderMapper::orderToOrderData)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new OrdersResponseDto(orders, pageInfo));
    }

    @DeleteMapping("/members/orders/{order-id}")
    public ResponseEntity<?> deleteOrder(@PathVariable("order-id") long orderId,
                                         Authentication authentication) {
        String email = authentication.getPrincipal().toString();
        Member member = memberService.findMember(email);
        orderService.removeOrder(member, orderId);

        return ResponseEntity.noContent().build();
    }
}
