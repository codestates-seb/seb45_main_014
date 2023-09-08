package com.main.bbangbbang.ordermenu.mapper;

import com.main.bbangbbang.ordermenu.data.OrderMenuData;
import com.main.bbangbbang.ordermenu.entity.OrderMenu;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface OrderMenuMapper {
    @Mapping(source = "menu.menuName", target = "menuName")
    @Mapping(source = "menu.price", target = "price")
    @Mapping(source = "menu.id", target = "id")
    @Mapping(source = "menu.img", target = "img")
    OrderMenuData orderMenuToOrderMenuData(OrderMenu orderMenu);
}
