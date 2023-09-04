package com.main.bbangbbang.order.mapper;

import com.main.bbangbbang.order.data.OrderData;
import com.main.bbangbbang.order.entity.Order;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    OrderData orderToOrderData(Order order);
}
