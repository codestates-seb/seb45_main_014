package com.main.bbangbbang.search.controller;

import com.main.bbangbbang.search.service.SearchService;
import com.main.bbangbbang.store.data.StoreData;
import com.main.bbangbbang.store.dto.StoresResponseDto;
import com.main.bbangbbang.store.entity.Store;
import com.main.bbangbbang.store.mapper.StoreMapper;
import com.main.bbangbbang.utils.PageInfo;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/search")
public class SearchController {
    private final SearchService searchService;
    private final StoreMapper storeMapper;

    @GetMapping(params = "search_target=store")
    public ResponseEntity<?> getStoresByName(@RequestParam(name = "search_keyword") String keyword,
                                       @RequestParam(name = "page") Integer page,
                                       @RequestParam(name = "size") Integer size) {
        Page<Store> storePage = searchService.findByName(keyword, page, size);
        PageInfo pageInfo = PageInfo.of(page, size, storePage);

        return ResponseEntity.ok(convertToResponseDto(storePage, pageInfo));
    }

    @GetMapping(params = "search_target=region")
    public ResponseEntity<?> getStoresByRegion(@RequestParam(name = "search_keyword") String keyword,
                                       @RequestParam(name = "page") Integer page,
                                       @RequestParam(name = "size") Integer size) {
        Page<Store> storePage = searchService.findByRegion(keyword, page, size);
        PageInfo pageInfo = PageInfo.of(page, size, storePage);

        return ResponseEntity.ok(convertToResponseDto(storePage, pageInfo));
    }

    @GetMapping(params = "search_target=menu")
    public ResponseEntity<?> getStoresByMenu(@RequestParam(name = "search_keyword") String keyword,
                                       @RequestParam(name = "page") Integer page,
                                       @RequestParam(name = "size") Integer size) {
        Page<Store> storePage = searchService.findByMenu(keyword, page, size);
        PageInfo pageInfo = PageInfo.of(page, size, storePage);

        return ResponseEntity.ok(convertToResponseDto(storePage, pageInfo));
    }

    private StoresResponseDto convertToResponseDto(Page<Store> storePage, PageInfo pageInfo) {
        List<StoreData> stores = storePage.stream()
                .map(storeMapper::storeToStoreBriefData)
                .collect(Collectors.toList());

        return new StoresResponseDto(stores,pageInfo);
    }
}
