package com.main.bbangbbang.menu.data;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.Setter;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Getter
@Setter
public class MenuSearchData extends MenuData{
    private String storeId;
    private String storeName;
    private String img;
}
