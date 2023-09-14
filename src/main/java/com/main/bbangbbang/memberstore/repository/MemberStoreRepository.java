package com.main.bbangbbang.memberstore.repository;

import com.main.bbangbbang.memberstore.entity.MemberStore;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberStoreRepository extends JpaRepository<MemberStore, Long> {
    Optional<MemberStore> findByMemberIdAndStoreId(Long memberId, Long StoreId);
    Page<MemberStore> findByMemberIdAndIsFavorite(Long memberId, Boolean isFavorite, Pageable pageable);
}
