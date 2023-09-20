package com.main.bbangbbang.store.data;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Getter
@Setter
public abstract class StoreData {
    private Long id;
    private String storeName;
    private String regionName;
    private Float rating;
    private String img;
    private Boolean isFavorite;
    private LocalDateTime lastModifiedAt;
    private LocalDateTime createdAt;
}
