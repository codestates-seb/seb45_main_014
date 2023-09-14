package com.main.bbangbbang.memberstore.dto;

import com.main.bbangbbang.memberstore.data.MemberStoreData;
import com.main.bbangbbang.utils.PageInfo;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class MemberStoresResponseDto {
    private List<MemberStoreData> stores;
    private PageInfo pageInfo;
}
