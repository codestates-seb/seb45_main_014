package com.main.bbangbbang.review.repository;

import com.main.bbangbbang.review.entity.Review;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Page<Review> findByStoreIdOrderByLastModifiedAtDesc(long storeId, Pageable pageable);
    List<Review> findByStoreId(long storeId);
    Page<Review> findByMemberIdOrderByLastModifiedAtDesc(long memberId, Pageable pageable);
    Optional<Review> findByOrderId(long orderId);
}
