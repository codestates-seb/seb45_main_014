package com.main.bbangbbang.memberstore.service;

import com.main.bbangbbang.member.service.MemberService;
import com.main.bbangbbang.memberstore.entity.MemberStore;
import com.main.bbangbbang.memberstore.repository.MemberStoreRepository;
import com.main.bbangbbang.store.service.StoreService;
import java.util.NoSuchElementException;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class MemberStoreService {
    private final MemberStoreRepository memberStoreRepository;
    private final StoreService storeService;
    private final MemberService memberService;

    @Transactional
    public MemberStore changeFavorite(Long memberId, Long storeId) {
        if (existFavorite(memberId, storeId)) {
            MemberStore memberStore = findMemberStore(memberId, storeId);
            memberStore.setIsFavorite(!memberStore.getIsFavorite());

            return memberStoreRepository.save(memberStore);
        }

        return createFavorite(memberId, storeId);
    }

    @Transactional
    public MemberStore createFavorite(Long memberId, Long storeId) {
        MemberStore memberStore = new MemberStore();
        memberStore.setStore(storeService.findStore(storeId));
        memberStore.setMember(memberService.findMemberById(memberId));

        return memberStoreRepository.save(memberStore);
    }

    @Transactional(readOnly = true)
    public Page<MemberStore> findFavorite(Long memberId, int page, int size) {
        return memberStoreRepository.findByMemberIdAndIsFavorite(memberId, true, PageRequest.of(page-1, size));
    }

    private MemberStore findMemberStore(Long memberId, Long storeId) {
        Optional<MemberStore> optionalMemberStore = memberStoreRepository.findByMemberIdAndStoreId(memberId, storeId);

        return optionalMemberStore.orElseThrow(NoSuchElementException::new);
    }

    private boolean existFavorite(long memberId, long storeId) {

        return memberStoreRepository.findByMemberIdAndStoreId(memberId, storeId).isPresent();
    }
}
