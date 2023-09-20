package com.main.bbangbbang.review.controller;

import com.main.bbangbbang.exception.BusinessLogicException;
import com.main.bbangbbang.exception.ExceptionCode;
import com.main.bbangbbang.member.entity.Member;
import com.main.bbangbbang.member.service.MemberService;
import com.main.bbangbbang.order.entity.Order;
import com.main.bbangbbang.order.entity.Order.OrderStatus;
import com.main.bbangbbang.order.service.OrderService;
import com.main.bbangbbang.review.data.ReviewData;
import com.main.bbangbbang.review.dto.ReviewRequestDto;
import com.main.bbangbbang.review.dto.ReviewResponseDto;
import com.main.bbangbbang.review.dto.ReviewsResponseDto;
import com.main.bbangbbang.review.entity.Review;
import com.main.bbangbbang.review.mapper.ReviewMapper;
import com.main.bbangbbang.review.service.ReviewService;
import com.main.bbangbbang.s3.S3Service;
import com.main.bbangbbang.utils.MemberUtils;
import com.main.bbangbbang.utils.PageInfo;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class ReviewController {
    private final ReviewService reviewService;
    private final OrderService orderService;
    private final MemberService memberService;
    private final S3Service s3Service;
    private final ReviewMapper reviewMapper;

    @PostMapping("/orders/{order-id}/reviews")
    public ResponseEntity<?> postReview(@PathVariable("order-id") Long orderId,
                                        @RequestBody ReviewRequestDto reviewRequestDto,
                                        Authentication authentication) {
        String email = MemberUtils.getEmail(authentication);
        Member member = memberService.findMember(email);
        Order order = orderService.findOrder(orderId);
        validateSameMember(member, order);

        Review review = reviewService.createReview(order, reviewRequestDto);
        orderService.setOrderStatus(order.getId(), OrderStatus.REVIEWED);

        return ResponseEntity.ok(new ReviewResponseDto(reviewMapper.reviewToReviewDataWithStoreName(review)));
    }

    @PostMapping("/reviews/{review-id}/image")
    public ResponseEntity<?> postReviewImage(@PathVariable("review-id") Long reviewId,
                                             @RequestPart("file") MultipartFile multipartFile,
                                             Authentication authentication) {
        String email = MemberUtils.getEmail(authentication);
        Member member = memberService.findMember(email);
        Review review = reviewService.findReview(reviewId);
        Order order = review.getOrder();

        validateSameMember(member, order);

        String img = s3Service.uploadImage(multipartFile, "review", review.getId());
        reviewService.setReviewImage(review, img);

        return ResponseEntity.ok(img);
    }

    @GetMapping("/reviews")
    public ResponseEntity<?> getReviews(@RequestParam(name = "page") Integer page,
                                        @RequestParam(name = "size") Integer size,
                                        Authentication authentication) {
        String email = MemberUtils.getEmail(authentication);
        Member member = memberService.findMember(email);
        Page<Review> reviewPage = reviewService.findReviews(member.getId(), page, size);
        PageInfo pageInfo = PageInfo.of(page, size, reviewPage);

        List<ReviewData> reviews = reviewPage.stream()
                .map(reviewMapper::reviewToReviewDataWithStoreName)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new ReviewsResponseDto(reviews, pageInfo));
    }

    @DeleteMapping("/reviews/{review-id}")
    public ResponseEntity<?> deleteReview(@PathVariable("review-id") Long reviewId,
                                          Authentication authentication) {
        String email = MemberUtils.getEmail(authentication);
        Member member = memberService.findMember(email);
        Review review = reviewService.findReview(reviewId);

        validateSameMember(member, review);
        reviewService.deleteReview(reviewId);

        return ResponseEntity.noContent().build();
    }

    private void validateSameMember(Member member, Order order) {
        if (!order.getMember().getId().equals(member.getId())) {
            throw new BusinessLogicException(ExceptionCode.NO_ACCESS);
        }
    }

    private void validateSameMember(Member member, Review review) {
        if (!review.getMember().getId().equals(member.getId())) {
            throw new BusinessLogicException(ExceptionCode.NO_ACCESS);
        }
    }
}
