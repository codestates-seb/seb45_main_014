package com.main.bbangbbang.menu.repository;

import com.main.bbangbbang.menu.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MenuRepository extends JpaRepository<Menu, Long> {

}
