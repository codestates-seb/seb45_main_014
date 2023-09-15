package com.main.bbangbbang.store.data;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.main.bbangbbang.menu.data.MenuDetailData;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Getter
@Setter
public class StoreDetailData extends StoreData {
    private String address;
    private String phoneNum;
    private String introduction;
    private List<MenuDetailData> menus;
}
