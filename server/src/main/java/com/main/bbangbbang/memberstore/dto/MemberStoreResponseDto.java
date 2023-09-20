package com.main.bbangbbang.memberstore.dto;

import com.main.bbangbbang.memberstore.data.MemberStoreData;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class MemberStoreResponseDto {
    private MemberStoreData store;
}
