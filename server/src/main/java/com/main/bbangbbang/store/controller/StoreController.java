package com.main.bbangbbang.store.controller;

import com.main.bbangbbang.member.entity.Member;
import com.main.bbangbbang.member.service.MemberService;
import com.main.bbangbbang.review.data.ReviewData;
import com.main.bbangbbang.review.dto.ReviewsResponseDto;
import com.main.bbangbbang.review.entity.Review;
import com.main.bbangbbang.review.mapper.ReviewMapper;
import com.main.bbangbbang.review.service.ReviewService;
import com.main.bbangbbang.store.data.StoreData;
import com.main.bbangbbang.store.dto.StoreResponseDto;
import com.main.bbangbbang.store.dto.StoresResponseDto;
import com.main.bbangbbang.store.entity.Store;
import com.main.bbangbbang.store.mapper.StoreMapper;
import com.main.bbangbbang.store.service.StoreService;
import com.main.bbangbbang.utils.FavoriteUtils;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/api")
public class StoreController { // 매장 상세 페이지
    private final StoreService storeService;
    private final ReviewService reviewService;
    private final MemberService memberService;
    private final StoreMapper storeMapper;
    private final ReviewMapper reviewMapper;

    @GetMapping("/stores/{store-id}")
    public ResponseEntity<StoreResponseDto> getStore(@PathVariable("store-id") long storeId,
                                                     Authentication authentication) { // 매장 상세 내용 (이름, 설명, 주소, 메뉴들)
        Store store = storeService.findStore(storeId);
        StoreData storeData = storeMapper.storeToStoreDetailData(store);
        StoreResponseDto responseDto = new StoreResponseDto(storeData);

        if (authentication != null) {
            String email = MemberUtils.getEmail(authentication);
            Member member = memberService.findMember(email);
            FavoriteUtils.markFavorite(member, responseDto);
        }

        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/stores/{store-id}/reviews")
    public ResponseEntity<?> getReviews(@PathVariable("store-id") long storeId,
                                        @RequestParam("page") int page,
                                        @RequestParam("size") int size) { // 매장 리뷰 가져오기
        Page<Review> reviewPage = reviewService.findReviewsByStore(storeId, page, size);
        PageInfo pageInfo = PageInfo.of(page, size, reviewPage);

        List<ReviewData> reviews = reviewPage.stream()
                .map(reviewMapper::reviewToReviewDataWithNickname)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new ReviewsResponseDto(reviews, pageInfo));
    }

    @GetMapping("/stores")
    public ResponseEntity<?> getStores(@RequestParam("page") int page,
                                       @RequestParam("size") int size,
                                       Authentication authentication) {
        Page<Store> storePage = storeService.findStores(page, size);
        PageInfo pageInfo = PageInfo.of(page, size, storePage);

        List<StoreData> stores = storePage.stream()
                .map(storeMapper::storeToStoreBriefData)
                .collect(Collectors.toList());
        StoresResponseDto responseDto = new StoresResponseDto(stores,pageInfo);

        if (authentication != null) {
            String email = MemberUtils.getEmail(authentication);
            Member member = memberService.findMember(email);
            FavoriteUtils.markFavorite(member, responseDto);
        }

        return ResponseEntity.ok(responseDto);
    }
}

