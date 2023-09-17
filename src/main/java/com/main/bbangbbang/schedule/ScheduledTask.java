package com.main.bbangbbang.schedule;

import com.main.bbangbbang.review.entity.Review;
import com.main.bbangbbang.review.service.ReviewService;
import com.main.bbangbbang.store.service.StoreService;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@AllArgsConstructor
public class ScheduledTask {
    private final StoreService storeService;
    private final ReviewService reviewService;

    @Scheduled(fixedRate = 1000L*60L, initialDelay = 1000L*10L)
    public void updateStoreRating() {
        Long storeSize = storeService.getSize();

        for (int i = 1; i <= storeSize; i++) {
            List<Review> reviews = reviewService.findAllReviewsByStore(i);
            float rating = getRating(reviews);
            storeService.updateRating(i, rating);
        }
        log.info("별점 업데이트 완료");
    }

    private float getRating(List<Review> reviews) {
        if (reviews.size() == 0) return 0;

        float totalRating = 0;
        for (Review review : reviews) {
            totalRating += review.getRating();
        }
        return Math.round(totalRating / reviews.size() * 10) / 10f;
    }
}
