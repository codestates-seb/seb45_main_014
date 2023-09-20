package com.main.bbangbbang.store.service;

import com.main.bbangbbang.exception.BusinessLogicException;
import com.main.bbangbbang.exception.ExceptionCode;
import com.main.bbangbbang.menu.entity.Menu;
import com.main.bbangbbang.store.entity.Store;
import com.main.bbangbbang.store.repository.StoreRepository;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class StoreService {
    private final StoreRepository storeRepository;

    @Transactional(readOnly = true)
    public Store findStore(long storeId) {
        Optional<Store> optionalStore = storeRepository.findById(storeId);
        Store store = optionalStore.orElseThrow(NoSuchElementException::new);

        return store;
    }

    @Transactional(readOnly = true)
    public Store findStoreByMenu(Menu menu) {
        Long menuId = menu.getId();
        Optional<Store> optionalStore = storeRepository.findByMenusIdOrderByRatingDesc(menuId);
        Store store = optionalStore.orElseThrow(NoSuchElementException::new);

        return store;
    }

    @Transactional(readOnly = true)
    public Page<Store> findStores(int page, int size) {
        return storeRepository.findAllByOrderByRatingDesc(PageRequest.of(page-1, size));
    }

    @Transactional(readOnly = true)
    public Page<Store> findStoresByName(String storeName, Pageable pageable) {

        return storeRepository.findByStoreNameContainingOrderByRatingDesc(storeName, pageable);
    }

    @Transactional(readOnly = true)
    public Page<Store> findStoresByRegion(List<Long> regionIds, Pageable pageable) {

        return storeRepository.findByRegionIdInOrderByRatingDesc(regionIds, pageable);
    }

    @Transactional(readOnly = true)
    public Long getSize(){

        return storeRepository.count();
    }

    @Transactional
    public void updateRating(long storeId, float rating) {
        Store store = storeRepository.findById(storeId).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.NO_ITEM));
        if (store.getRating() != rating) {
            store.setRating(rating);
        }
    }
}
