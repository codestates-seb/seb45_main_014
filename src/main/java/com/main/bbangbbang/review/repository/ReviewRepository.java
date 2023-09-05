package com.main.bbangbbang.review.repository;

import com.main.bbangbbang.review.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Page<Review> findByStoreId(long storeId, Pageable pageable);
}
