package com.main.bbangbbang.review.data;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Getter
@Setter
public abstract class ReviewData {
    private Long id;
    private Integer rating;
    private String content;
    private String img;
    private LocalDateTime lastModifiedAt;
    private LocalDateTime createdAt;
}
