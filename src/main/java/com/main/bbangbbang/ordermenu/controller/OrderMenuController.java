package com.main.bbangbbang.ordermenu.controller;

import com.main.bbangbbang.exception.BusinessLogicException;
import com.main.bbangbbang.exception.ExceptionCode;
import com.main.bbangbbang.member.entity.Member;
import com.main.bbangbbang.member.service.MemberService;
import com.main.bbangbbang.order.entity.Order;
import com.main.bbangbbang.order.entity.Order.OrderStatus;
import com.main.bbangbbang.order.service.OrderService;
import com.main.bbangbbang.ordermenu.service.OrderMenuService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/api")
public class OrderMenuController {
    private final OrderService orderService;
    private final OrderMenuService orderMenuService;
    private final MemberService memberService;

    @DeleteMapping("/cart")
    public ResponseEntity<?> deleteOrderMenu(@RequestBody List<Long> menuIds,
                                             Authentication authentication) {
        String email = authentication.getPrincipal().toString();
        Member member = memberService.findMember(email);
        Order order = orderService.findUnderActiveOrder(member.getId());
        if (order.getOrderStatus() != OrderStatus.ACTIVE) throw new BusinessLogicException(ExceptionCode.NO_ITEM);

        orderMenuService.deleteOrderMenus(menuIds, order.getId());
        if (orderMenuService.findOrderMenus(order.getId()).size() == 0) {
            order.setOrderStatus(OrderStatus.CREATED);
        }

        return ResponseEntity.noContent().build();
    }
}