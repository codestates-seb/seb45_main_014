package com.main.bbangbbang.search.controller;

import com.main.bbangbbang.member.entity.Member;
import com.main.bbangbbang.member.service.MemberService;
import com.main.bbangbbang.menu.data.MenuData;
import com.main.bbangbbang.menu.dto.MenusResponseDto;
import com.main.bbangbbang.menu.entity.Menu;
import com.main.bbangbbang.menu.mapper.MenuMapper;
import com.main.bbangbbang.search.service.SearchService;
import com.main.bbangbbang.store.data.StoreData;
import com.main.bbangbbang.store.dto.StoresResponseDto;
import com.main.bbangbbang.store.entity.Store;
import com.main.bbangbbang.store.mapper.StoreMapper;
import com.main.bbangbbang.utils.FavoriteUtils;
import com.main.bbangbbang.utils.PageInfo;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/search")
public class SearchController {
    private final SearchService searchService;
    private final MemberService memberService;
    private final StoreMapper storeMapper;
    private final MenuMapper menuMapper;

    @GetMapping(params = "search_target=store")
    public ResponseEntity<?> getStoresByName(@RequestParam(name = "search_keyword") String keyword,
                                             @RequestParam(name = "page") Integer page,
                                             @RequestParam(name = "size") Integer size,
                                             Authentication authentication) {
        Page<Store> storePage = searchService.findByName(keyword, page, size);
        return getResponseDto(page, size, authentication, storePage);
    }

    @GetMapping(params = "search_target=region")
    public ResponseEntity<?> getStoresByRegion(@RequestParam(name = "search_keyword") String keyword,
                                               @RequestParam(name = "page") Integer page,
                                               @RequestParam(name = "size") Integer size,
                                               Authentication authentication) {
        Page<Store> storePage = searchService.findByRegion(keyword, page, size);
        return getResponseDto(page, size, authentication, storePage);
    }

    @GetMapping(params = "search_target=menu")
    public ResponseEntity<?> getMenusByMenu(@RequestParam(name = "search_keyword") String keyword,
                                            @RequestParam(name = "page") Integer page,
                                            @RequestParam(name = "size") Integer size) {
        Page<Menu> menuPage = searchService.findByMenu(keyword, page, size);
        PageInfo pageInfo = PageInfo.of(page, size, menuPage);
        List<MenuData> menus = menuPage.stream()
                .map(menuMapper::menuToMenuSearchData)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new MenusResponseDto(menus, pageInfo));
    }

    private ResponseEntity<?> getResponseDto(Integer page, Integer size, Authentication authentication, Page<Store> storePage) {
        PageInfo pageInfo = PageInfo.of(page, size, storePage);
        StoresResponseDto responseDto = convertToResponseDto(storePage, pageInfo);

        if (authentication != null) {
            String email = authentication.getPrincipal().toString();
            Member member = memberService.findMember(email);
            FavoriteUtils.markFavorite(member, responseDto);
        }

        return ResponseEntity.ok(responseDto);
    }

    private StoresResponseDto convertToResponseDto(Page<Store> storePage, PageInfo pageInfo) {
        List<StoreData> stores = storePage.stream()
                .map(storeMapper::storeToStoreBriefData)
                .collect(Collectors.toList());

        return new StoresResponseDto(stores,pageInfo);
    }
}
