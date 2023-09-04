package com.main.bbangbbang.menu.service;

import com.main.bbangbbang.menu.entity.Menu;
import com.main.bbangbbang.menu.repository.MenuRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class MenuService {
    private final MenuRepository menuRepository;

    public Menu getMenuById(Long menuId) {
        Menu menu = menuRepository.findById(menuId).get();// menurepository 꺼내 온 것

        return menu; // 위에 되돌려줌
    }

//    private static 어디에 연결을 해야 하는지 아직 미구현(Menu entity){
//
//    }
}
