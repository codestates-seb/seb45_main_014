package com.main.bbangbbang.menu.dto;

import com.main.bbangbbang.menu.data.MenuData;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MenuResponseDto {
    private MenuData menu;
}
