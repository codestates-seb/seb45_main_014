package com.main.bbangbbang.menu.mapper;

import com.main.bbangbbang.menu.data.MenuBriefData;
import com.main.bbangbbang.menu.data.MenuDetailData;
import com.main.bbangbbang.menu.entity.Menu;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
@Component
public interface MenuMapper {
    MenuDetailData menuToMenuDetailData(Menu menu);
    MenuBriefData menuToMenuBriefData(Menu menu);
}
