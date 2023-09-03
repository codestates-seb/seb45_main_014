package com.main.bbangbbang.menu.repository;

import com.main.bbangbbang.menu.entity.MenuEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MenuRepository extends JpaRepository<MenuEntity, Long> {
    Optional<MenuEntity> findByMenuId(Long id);
}