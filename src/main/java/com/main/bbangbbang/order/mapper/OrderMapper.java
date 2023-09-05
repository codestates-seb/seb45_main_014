package com.main.bbangbbang.order.mapper;

import com.main.bbangbbang.order.data.OrderData;
import com.main.bbangbbang.order.entity.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    @Mapping(source = "store.id", target = "storeId")
    @Mapping(source = "orderStatus.status", target = "orderStatus")
    @Mapping(source = "orderMenus", target = "orderMenus")
    OrderData orderToOrderData(Order order);
}
