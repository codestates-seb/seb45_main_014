package com.main.bbangbbang.menu.service;

import com.main.bbangbbang.menu.dto.MenuResponseDto;
import com.main.bbangbbang.menu.entity.MenuEntity;
import com.main.bbangbbang.menu.mapper.MenuMapper;
import com.main.bbangbbang.menu.repository.MenuRepository;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.Map;

@Service
public class MenuService {

    private final MenuRepository menuRepository;
    private final MenuMapper menuMapper;

    @Autowired
    public MenuService(MenuRepository menuRepository, MenuMapper menuMapper) {
        this.menuRepository = menuRepository;
        this.menuMapper = menuMapper;
    }

    public MenuResponseDto getMenuById(Long menuId) {
        MenuEntity menuEntity = menuRepository.findByMenuId(menuId).get();// menurepository 꺼내 온 것
        MenuResponseDto menuResponseDto = menuMapper.toDto(menuEntity); // responsedto를 entity로 연결
        return menuResponseDto; // 위에 되돌려줌
    }

//    private static 어디에 연결을 해야 하는지 아직 미구현(Menu entity){
//
//    }
}
