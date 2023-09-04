package com.main.bbangbbang.menu.dto;

import com.main.bbangbbang.menu.data.MenuData;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter // 이거가 있으면 get set 필요 없음
@AllArgsConstructor //
public class MenuResponseDto {
    private MenuData menu;
}
