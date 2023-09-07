package com.main.bbangbbang.memberstore.controller;

import com.main.bbangbbang.memberstore.dto.MemberStoreResponseDto;
import com.main.bbangbbang.memberstore.entity.MemberStore;
import com.main.bbangbbang.memberstore.mapper.MemberStoreMapper;
import com.main.bbangbbang.memberstore.service.MemberStoreService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/api")
public class MemberStoreController {
    private final MemberStoreService memberStoreService;
    private final MemberStoreMapper memberStoreMapper;

    @PostMapping("/members/favorites/{store-id}")
    public ResponseEntity<?> postFavorite(@PathVariable("store-id") Long storeId) {
        MemberStore memberStore = memberStoreService.changeFavorite(1L, storeId);

        return ResponseEntity.ok(new MemberStoreResponseDto(memberStoreMapper.memberStoreToMemberStoreData(memberStore)));
    }
}
