package com.main.bbangbbang.store.service;

import com.main.bbangbbang.menu.entity.Menu;
import com.main.bbangbbang.store.entity.Store;
import com.main.bbangbbang.store.repository.StoreRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class StoreService {
    private final StoreRepository storeRepository;

    @Transactional(readOnly = true)
    public Store findStore(long storeId) {
        return null;
    }

    @Transactional(readOnly = true)
    public Store findStoreByMenu(Menu menu) {
        return null;
    }
}
