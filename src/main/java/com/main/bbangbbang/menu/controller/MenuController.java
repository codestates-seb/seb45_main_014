package com.main.bbangbbang.menu.controller;

import com.main.bbangbbang.menu.dto.MenuResponseDto;
import com.main.bbangbbang.menu.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class MenuController {
    private final MenuService menuService;

    @Autowired
    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping("/api/stores/{store-id}/menus/{menu-id}")
    public ResponseEntity<MenuResponseDto> getMenu(@PathVariable("store-id") Long storeId, @PathVariable("menu-id") Long menuId) {
        MenuResponseDto menuResponseDto = menuService.getMenuById(menuId);
        return ResponseEntity.ok(menuResponseDto); // 리턴 타입은 메소드 명 좌측에 항상 명시되어 있다.
    }
}
