package com.main.bbangbbang.utils;

import com.main.bbangbbang.member.entity.Member;
import com.main.bbangbbang.memberstore.entity.MemberStore;
import com.main.bbangbbang.store.data.StoreData;
import com.main.bbangbbang.store.dto.StoreResponseDto;
import com.main.bbangbbang.store.dto.StoresResponseDto;

public class FavoriteUtils {
    public static void checkFavorite(Member member, StoreData storeData) {
        for (MemberStore memberStore : member.getMemberStores()) {
            if (memberStore.getStore().getId().equals(storeData.getId())) {
                storeData.setIsFavorite(true);
                return;
            }
        }
    }

    public static void markFavorite(Member member, StoreResponseDto responseDto) {
        StoreData storeData = responseDto.getStore();
        checkFavorite(member, storeData);
    }

    public static void markFavorite(Member member, StoresResponseDto responseDto) {
        for (StoreData storeData : responseDto.getStores()) {
            checkFavorite(member, storeData);
        }
    }
}
