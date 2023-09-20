package com.main.bbangbbang.ordermenu.data;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.Setter;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Getter
@Setter
public class OrderMenuData {
    private Long id;
    private String menuName;
    private Integer price;
    private Integer quantity;
    private String img;
}
