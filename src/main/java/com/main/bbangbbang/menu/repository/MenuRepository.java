package com.main.bbangbbang.menu.repository;

import com.main.bbangbbang.menu.entity.Menu;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuRepository extends JpaRepository<Menu, Long> {
    List<Menu> findByMenuNameContaining(String menuName);
}
