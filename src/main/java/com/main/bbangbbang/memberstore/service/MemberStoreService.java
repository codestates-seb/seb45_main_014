package com.main.bbangbbang.memberstore.service;

import com.main.bbangbbang.memberstore.entity.MemberStore;
import com.main.bbangbbang.memberstore.repository.MemberStoreRepository;
import com.main.bbangbbang.store.service.StoreService;
import java.util.NoSuchElementException;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class MemberStoreService {
    private final MemberStoreRepository memberStoreRepository;
    private final StoreService storeService;

    @Transactional
    public MemberStore changeFavorite(Long memberId, Long storeId) {
        try {
            MemberStore memberStore = findMemberStore(memberId, storeId);
            memberStore.setIsFavorite(!memberStore.getIsFavorite());
            return memberStore;
        } catch (NoSuchMethodException e) {
            return createFavorite(memberId, storeId);
        }
    }

    @Transactional
    public MemberStore createFavorite(Long memberId, Long storeId) {
        MemberStore memberStore = new MemberStore();
        memberStore.setStore(storeService.findStore(storeId));
        memberStore.setMember(null);
        return memberStoreRepository.save(memberStore);
    }

    private MemberStore findMemberStore(Long memberId, Long storeId) throws NoSuchMethodException {
        Optional<MemberStore> optionalMemberStore = memberStoreRepository.findByMemberIdAndStoreId(memberId, storeId);
        return optionalMemberStore.orElseThrow(NoSuchElementException::new);
    }
}
