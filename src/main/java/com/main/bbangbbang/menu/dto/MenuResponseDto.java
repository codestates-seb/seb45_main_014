package com.main.bbangbbang.menu.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter // 이거가 있으면 get set 필요 없음
@AllArgsConstructor //
public class MenuResponseDto {
    private Long id; // 메뉴 ID
    private String menuName; // 메뉴 이름
    private String menuDesc; // 메뉴 설명
    private String ingredient; // 메뉴 재료
    private int price; // 메뉴 가격
    private int stock; // 메뉴 재고
    private String img; // 메뉴 이미지 URL
    }
