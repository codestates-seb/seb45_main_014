package com.main.bbangbbang.review.service;

import com.main.bbangbbang.exception.BusinessLogicException;
import com.main.bbangbbang.exception.ExceptionCode;
import com.main.bbangbbang.order.entity.Order;
import com.main.bbangbbang.order.entity.Order.OrderStatus;
import com.main.bbangbbang.review.dto.ReviewRequestDto;
import com.main.bbangbbang.review.entity.Review;
import com.main.bbangbbang.review.repository.ReviewRepository;
import java.util.List;
import java.util.NoSuchElementException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;

    @Transactional
    public Review createReview(Order order, ReviewRequestDto reviewRequestDto) {
        if (order.getOrderStatus() != OrderStatus.PICKUP) {
            throw new RuntimeException("주문 상태가 PICKUP이 아닙니다.");
        }

        Review review = Review.of(
                reviewRequestDto.getRating(),
                reviewRequestDto.getContent(),
                order.getStore(),
                order.getMember(),
                order);

        return reviewRepository.save(review);
    }

    @Transactional
    public void setReviewImage(Review review, String img) {
        review.setImg(img);
    }

    @Transactional
    public Review updateReview() {

        return null;
    }

    @Transactional(readOnly = true)
    public Review findReview(long reviewId) {

        return reviewRepository.findById(reviewId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.NO_ITEM));
    }

    @Transactional(readOnly = true)
    public Page<Review> findReviews(Long memberId, Integer page, Integer size) {

        return reviewRepository.findByMemberId(memberId, PageRequest.of(page-1, size));
    }

    @Transactional(readOnly = true)
    public Page<Review> findReviewsByStore(long storeId, int page, int size) {

        return reviewRepository.findByStoreId(storeId, PageRequest.of(page-1, size));
    }

    @Transactional
    public void deleteReview(Long reviewId) {
        Review review = reviewRepository.findById(reviewId).orElseThrow(NoSuchElementException::new);
        reviewRepository.delete(review);
    }

    @Transactional
    public List<Review> findAllReviewsByStore(long storeId) {

        return reviewRepository.findByStoreId(storeId);
    }
}
