package com.main.bbangbbang.store.dto;

import com.main.bbangbbang.store.data.StoreData;
import com.main.bbangbbang.utils.PageInfo;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class StoresResponseDto {
    private List<StoreData> stores;
    private PageInfo pageInfo;
}
