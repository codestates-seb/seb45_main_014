package com.main.bbangbbang.menu.service;

import com.main.bbangbbang.menu.entity.Menu;
import com.main.bbangbbang.menu.repository.MenuRepository;
import java.util.NoSuchElementException;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@AllArgsConstructor
@Service
public class MenuService {
    private final MenuRepository menuRepository;

    @Transactional(readOnly = true)
    public Menu findMenu(Long menuId) {
        Optional<Menu> optionalMenu = menuRepository.findById(menuId);// menurepository 꺼내 온 것

        return optionalMenu.orElseThrow(NoSuchElementException::new); // 위에 되돌려줌
    }

//    private static 어디에 연결을 해야 하는지 아직 미구현(Menu entity){
//
//    }
}
