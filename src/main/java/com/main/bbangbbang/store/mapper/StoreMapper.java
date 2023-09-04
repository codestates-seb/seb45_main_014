package com.main.bbangbbang.store.mapper;

import com.main.bbangbbang.menu.mapper.MenuMapper;
import com.main.bbangbbang.store.data.StoreBriefData;
import com.main.bbangbbang.store.data.StoreDetailData;
import com.main.bbangbbang.store.entity.Store;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = MenuMapper.class)
public interface StoreMapper {
    StoreDetailData storeToStoreDetailData(Store store);
    StoreBriefData storeToStoreBriefData(Store store);
}

