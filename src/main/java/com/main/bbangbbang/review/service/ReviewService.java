package com.main.bbangbbang.review.service;

import com.main.bbangbbang.order.entity.Order;
import com.main.bbangbbang.order.entity.Order.OrderStatus;
import com.main.bbangbbang.review.entity.Review;
import com.main.bbangbbang.review.repository.ReviewRepository;
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
    public Review createReview(Order order, String content, Integer rating) {
        if (order.getOrderStatus() != OrderStatus.PICKUP) {
            throw new RuntimeException("주문 상태가 PICKUP이 아닙니다.");
        }

        Review review = new Review();
        review.setOrder(order);
        review.setMember(order.getMember());
        review.setRating(rating);

        return reviewRepository.save(review);
    }

    @Transactional
    public Review updateReview() {
        return null;
    }

    @Transactional(readOnly = true)
    public Review findReview() {
        return null;
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
    public void deleteReview(Long orderId) {
        Review review = reviewRepository.findByOrderId(orderId).orElseThrow(NoSuchElementException::new);
        reviewRepository.delete(review);
    }
}
