package com.main.bbangbbang.memberstore.controller;

import com.main.bbangbbang.member.entity.Member;
import com.main.bbangbbang.member.service.MemberService;
import com.main.bbangbbang.memberstore.dto.MemberStoreResponseDto;
import com.main.bbangbbang.memberstore.entity.MemberStore;
import com.main.bbangbbang.memberstore.mapper.MemberStoreMapper;
import com.main.bbangbbang.memberstore.service.MemberStoreService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/api")
public class MemberStoreController {
    private final MemberStoreService memberStoreService;
    private final MemberService memberService;
    private final MemberStoreMapper memberStoreMapper;

    @PostMapping("/members/favorites/{store-id}")
    public ResponseEntity<?> postFavorite(@PathVariable("store-id") Long storeId,
                                          Authentication authentication) {
        String email = authentication.getPrincipal().toString();
        Member member = memberService.findMember(email);
        MemberStore memberStore = memberStoreService.changeFavorite(member.getId(), storeId);

        return ResponseEntity.ok(new MemberStoreResponseDto(memberStoreMapper.memberStoreToMemberStoreData(memberStore)));
    }
}
