package com.main.bbangbbang.menu.controller;

import com.main.bbangbbang.menu.dto.MenuResponseDto;
import com.main.bbangbbang.menu.entity.Menu;
import com.main.bbangbbang.menu.mapper.MenuMapper;
import com.main.bbangbbang.menu.service.MenuService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/api")
public class MenuController {
    private final MenuService menuService;
    private final MenuMapper menuMapper;

    @GetMapping("/stores/{store-id}/menus/{menu-id}") // will be deleted: {store-id}
    public ResponseEntity<MenuResponseDto> getMenu(@PathVariable("store-id") Long storeId,
                                                   @PathVariable("menu-id") Long menuId) {
        Menu menu = menuService.findMenu(menuId);
        MenuResponseDto menuResponseDto = new MenuResponseDto(menuMapper.menuToMenuDetailData(menu));

        return ResponseEntity.ok(menuResponseDto);
    }
}
