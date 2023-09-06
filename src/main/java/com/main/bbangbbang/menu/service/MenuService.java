package com.main.bbangbbang.menu.service;

import com.main.bbangbbang.menu.entity.Menu;
import com.main.bbangbbang.menu.repository.MenuRepository;
import java.util.List;
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
        Optional<Menu> optionalMenu = menuRepository.findById(menuId);

        return optionalMenu.orElseThrow(NoSuchElementException::new);
    }

    @Transactional(readOnly = true)
    public List<Menu> findMenusByName(String menuName) {

        return menuRepository.findByMenuNameContaining(menuName);
    }
}
