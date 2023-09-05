package com.main.bbangbbang.review.controller;

import com.main.bbangbbang.review.service.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping("/orders/{order-id}/reviews")
    public ResponseEntity<?> postReview() {
        reviewService.createReview();
        return null;
    }

    @GetMapping("/reviews")
    public ResponseEntity<?> getReviews() {
        reviewService.findReviews();
        return null;
    }

    @DeleteMapping("/orders/{order-id}/reviews")
    public ResponseEntity<?> deleteReview() {
        reviewService.createReview();
        return null;
    }
}
