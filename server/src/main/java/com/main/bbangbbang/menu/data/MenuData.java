package com.main.bbangbbang.menu.data;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.Setter;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Getter
@Setter
public abstract class MenuData {
    private Long id;
    private String menuName;
    private Integer price;
    private Integer stock;
}
