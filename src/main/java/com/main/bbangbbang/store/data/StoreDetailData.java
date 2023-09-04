package com.main.bbangbbang.store.data;

import com.main.bbangbbang.menu.data.MenuDetailData;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StoreDetailData extends StoreData {
    private String address;
    private String introduction;
    private List<MenuDetailData> menus;
}