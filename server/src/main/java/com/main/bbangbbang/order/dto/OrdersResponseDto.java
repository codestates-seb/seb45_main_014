package com.main.bbangbbang.order.dto;

import com.main.bbangbbang.order.data.OrderData;
import com.main.bbangbbang.utils.PageInfo;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class OrdersResponseDto {
    private List<OrderData> orders;
    private PageInfo pageInfo;
}
