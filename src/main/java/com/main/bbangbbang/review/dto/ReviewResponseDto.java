package com.main.bbangbbang.review.dto;

import com.main.bbangbbang.review.data.ReviewData;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class ReviewResponseDto {
    private ReviewData review;
}
