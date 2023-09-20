package com.main.bbangbbang.memberstore.mapper;

import com.main.bbangbbang.memberstore.data.MemberStoreData;
import com.main.bbangbbang.memberstore.data.MemberStoreDetailData;
import com.main.bbangbbang.memberstore.entity.MemberStore;
import com.main.bbangbbang.store.mapper.StoreMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = StoreMapper.class)
public interface MemberStoreMapper {
    @Mapping(source = "store.id", target = "id")
    MemberStoreData memberStoreToMemberStoreData(MemberStore memberStore);
    @Mapping(source = "store.id", target="id")
    @Mapping(source = "store.storeName", target = "storeName")
    @Mapping(source = "store.rating", target = "rating")
    @Mapping(source = "store.region.regionName", target = "regionName")
    @Mapping(source = "store.img", target = "img")
    MemberStoreDetailData memberStoreToMemberStoreDetailData(MemberStore memberStore);
}
