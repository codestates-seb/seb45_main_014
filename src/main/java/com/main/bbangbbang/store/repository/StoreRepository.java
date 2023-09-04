package com.main.bbangbbang.store.repository;

import com.main.bbangbbang.store.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreRepository extends JpaRepository<Store, Long> {
}
