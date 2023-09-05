package com.main.bbangbbang.review.service;

import com.main.bbangbbang.review.entity.Review;
import com.main.bbangbbang.review.repository.ReviewRepository;
import java.util.List;
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
    public Review createReview() {
        return null;
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
    public List<Review> findReviews() {
        return null;
    }

    @Transactional(readOnly = true)
    public Page<Review> findReviewsByStore(long storeId, int page, int size) {
        return reviewRepository.findByStoreId(storeId, PageRequest.of(page-1, size));
    }

    @Transactional
    public void deleteReview() {
    }
}
