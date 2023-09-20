package com.main.bbangbbang.memberstore.controller;

import com.main.bbangbbang.member.entity.Member;
import com.main.bbangbbang.member.service.MemberService;
import com.main.bbangbbang.memberstore.data.MemberStoreData;
import com.main.bbangbbang.memberstore.dto.MemberStoreResponseDto;
import com.main.bbangbbang.memberstore.dto.MemberStoresResponseDto;
import com.main.bbangbbang.memberstore.entity.MemberStore;
import com.main.bbangbbang.memberstore.mapper.MemberStoreMapper;
import com.main.bbangbbang.memberstore.service.MemberStoreService;
import com.main.bbangbbang.utils.MemberUtils;
import com.main.bbangbbang.utils.PageInfo;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/api")
public class MemberStoreController {
    private final MemberStoreService memberStoreService;
    private final MemberService memberService;
    private final MemberStoreMapper memberStoreMapper;

    @GetMapping("/members/favorites")
    public ResponseEntity<?> getFavorite(@RequestParam("page") int page,
                                         @RequestParam("size") int size,
                                         Authentication authentication) {
        String email = MemberUtils.getEmail(authentication);
        Member member = memberService.findMember(email);
        Page<MemberStore> memberStorePage = memberStoreService.findFavorite(member.getId(), page, size);
        PageInfo pageInfo = PageInfo.of(page, size, memberStorePage);
        List<MemberStoreData> memberStores = memberStorePage.stream()
                .map(memberStoreMapper::memberStoreToMemberStoreDetailData)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new MemberStoresResponseDto(memberStores, pageInfo));
    }

    @PostMapping("/members/favorites/{store-id}")
    public ResponseEntity<?> postFavorite(@PathVariable("store-id") Long storeId,
                                          Authentication authentication) {
        String email = MemberUtils.getEmail(authentication);
        Member member = memberService.findMember(email);
        MemberStore memberStore = memberStoreService.changeFavorite(member.getId(), storeId);

        return ResponseEntity.ok(new MemberStoreResponseDto(memberStoreMapper.memberStoreToMemberStoreData(memberStore)));
    }
}
