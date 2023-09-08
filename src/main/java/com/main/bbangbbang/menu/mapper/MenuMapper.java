package com.main.bbangbbang.menu.mapper;

import com.main.bbangbbang.menu.data.MenuBriefData;
import com.main.bbangbbang.menu.data.MenuDetailData;
import com.main.bbangbbang.menu.data.MenuSearchData;
import com.main.bbangbbang.menu.entity.Menu;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
@Component
public interface MenuMapper {
    MenuDetailData menuToMenuDetailData(Menu menu);
    MenuBriefData menuToMenuBriefData(Menu menu);
    @Mapping(source = "store.storeName", target = "storeName")
    MenuSearchData menuToMenuSearchData(Menu menu);
}
