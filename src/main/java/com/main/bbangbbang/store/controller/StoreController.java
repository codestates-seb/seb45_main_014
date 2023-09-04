package com.main.bbangbbang.store.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/api")
public class StoreController { // 매장 상세 페이지

    @GetMapping("/stores/{store-id}")
    public ResponseEntity<?> getStore(@PathVariable("store-id") long storeId) { // 매장 상세 내용 (이름, 설명, 주소, 메뉴들)
        return null;
    }

    @GetMapping("/stores/{store-id}/reviews")
    public ResponseEntity<?> getReviews(@PathVariable("store-id") long storeId,
                                        @RequestParam("page") int page,
                                        @RequestParam("size") int size) { // 매장 리뷰 가져오기
        return null;
    }
}
