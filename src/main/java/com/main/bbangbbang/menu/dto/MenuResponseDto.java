package com.main.bbangbbang.menu.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MenuResponseDto {
    private Long id; // 메뉴 ID
    private String menuName; // 메뉴 이름
    private String menuDesc; // 메뉴 설명
    private String ingredient; // 메뉴 재료
    private int price; // 메뉴 가격
    private int stock; // 메뉴 재고
    private String img; // 메뉴 이미지 URL

    public MenuResponseDto(Long id, String menuName, String menuDesc, String ingredient, int price, int stock, String img) {
        this.id = id;
        this.menuName = menuName;
        this.menuDesc = menuDesc;
        this.ingredient = ingredient;
        this.price = price;
        this.stock = stock;
        this.img = img;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMenuName() {
        return menuName;
    }

    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }

    public String getMenuDesc() {
        return menuDesc;
    }

    public void setMenuDesc(String menuDesc) {
        this.menuDesc = menuDesc;
    }

    public String getIngredient() {
        return ingredient;
    }

    public void setIngredient(String ingredient) {
        this.ingredient = ingredient;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getStock() {
        return stock;}
}