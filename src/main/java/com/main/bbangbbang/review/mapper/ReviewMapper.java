package com.main.bbangbbang.review.mapper;

import com.main.bbangbbang.review.data.ReviewDataWithNickname;
import com.main.bbangbbang.review.data.ReviewDataWithStoreName;
import com.main.bbangbbang.review.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ReviewMapper {
    @Mapping(source = "store.storeName" , target = "storeName")
    ReviewDataWithStoreName reviewToReviewDataWithStoreName(Review review);

    @Mapping(source = "member.nickname", target = "nickname")
    ReviewDataWithNickname reviewToReviewDataWithNickname(Review review);
}
