package com.main.bbangbbang.search.service;

import com.main.bbangbbang.store.entity.Store;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class SearchService {

    public Page<Store> findByName(String storeName, int page, int size) {
        return null;
    }

    public Page<Store> findByRegion(String regionName, int page, int size) {
        return null;
    }

    public Page<Store> findByMenu(String menuName, int page, int size) {
        return null;
    }
}
