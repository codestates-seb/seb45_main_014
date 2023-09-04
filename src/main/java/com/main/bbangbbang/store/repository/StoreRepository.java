package com.main.bbangbbang.store.repository;

import com.main.bbangbbang.store.entity.Store;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreRepository extends JpaRepository<Store, Long> {
    Page<Store> findByStoreNameContaining(String name, Pageable pageable);
    Page<Store> findByRegionIdIn(List<Long> regionIds, Pageable pageable);
    Optional<Store> findByMenusId(Long menuId);
}
