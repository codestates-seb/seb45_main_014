package com.main.bbangbbang.memberstore.data;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.Setter;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Getter
@Setter
public class MemberStoreDetailData extends MemberStoreData {
    private String storeName;
    private Float rating;
    private String regionName;
    private String img;
}
