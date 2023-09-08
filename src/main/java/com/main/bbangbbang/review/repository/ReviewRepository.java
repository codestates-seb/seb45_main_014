package com.main.bbangbbang.review.repository;

import com.main.bbangbbang.review.entity.Review;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Page<Review> findByStoreId(long storeId, Pageable pageable);
    Page<Review> findByMemberId(long memberId, Pageable pageable);
    Optional<Review> findByOrderId(long orderId);
}
