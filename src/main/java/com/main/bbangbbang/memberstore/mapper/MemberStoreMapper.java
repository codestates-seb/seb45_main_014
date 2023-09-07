package com.main.bbangbbang.memberstore.mapper;

import com.main.bbangbbang.memberstore.data.MemberStoreData;
import com.main.bbangbbang.memberstore.entity.MemberStore;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MemberStoreMapper {
    @Mapping(source = "store.id", target = "id")
    MemberStoreData memberStoreToMemberStoreData(MemberStore memberStore);
}
