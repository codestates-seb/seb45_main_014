package com.main.bbangbbang.order.dto;

import com.main.bbangbbang.order.data.OrderData;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class OrderResponseDto {
    private OrderData order;
}
