package com.main.bbangbbang.menu.dto;

import com.main.bbangbbang.menu.data.MenuData;
import com.main.bbangbbang.utils.PageInfo;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MenusResponseDto {
    private List<MenuData> menus;
    private PageInfo pageInfo;
}
