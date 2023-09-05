package com.main.bbangbbang.search.service;

import com.main.bbangbbang.menu.entity.Menu;
import com.main.bbangbbang.menu.service.MenuService;
import com.main.bbangbbang.region.entity.Region;
import com.main.bbangbbang.region.service.RegionService;
import com.main.bbangbbang.store.entity.Store;
import com.main.bbangbbang.store.service.StoreService;
import com.main.bbangbbang.utils.PageUtils;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class SearchService {
    private final RegionService regionService;
    private final StoreService storeService;
    private final MenuService menuService;

    public Page<Store> findByName(String storeName, int page, int size) {
        return storeService.findStoresByName(storeName, PageRequest.of(page-1, size));
    }

    public Page<Store> findByRegion(String regionName, int page, int size) {
        List<Region> regions = regionService.findChildRegions(regionName);
        List<Long> regionIds = regions.stream()
                                .map(Region::getId)
                                .collect(Collectors.toList());

        return storeService.findStoresByRegion(regionIds, PageRequest.of(page-1, size));
    }

    public Page<Store> findByMenu(String menuName, int page, int size) {
        List<Menu> menus = menuService.findMenusByName(menuName);
        List<Store> stores = menus.stream()
                .map(menu -> menu.getStore())
                .distinct()
                .collect(Collectors.toList());

        return PageUtils.convertToPage(stores, page-1, size);
    }
}
