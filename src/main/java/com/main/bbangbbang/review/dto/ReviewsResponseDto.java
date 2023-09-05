package com.main.bbangbbang.review.dto;

import com.main.bbangbbang.review.data.ReviewData;
import com.main.bbangbbang.utils.PageInfo;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class ReviewsResponseDto {
    private List<ReviewData> reviews;
    private PageInfo pageInfo;
}
