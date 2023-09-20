package com.main.bbangbbang.store.mapper;

import com.main.bbangbbang.menu.mapper.MenuMapper;
import com.main.bbangbbang.store.data.StoreBriefData;
import com.main.bbangbbang.store.data.StoreDetailData;
import com.main.bbangbbang.store.entity.Store;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = MenuMapper.class)
public interface StoreMapper {
    @Mapping(source = "region.regionName", target = "regionName")
    StoreDetailData storeToStoreDetailData(Store store);
    @Mapping(source = "region.regionName", target = "regionName")
    StoreBriefData storeToStoreBriefData(Store store);
}

