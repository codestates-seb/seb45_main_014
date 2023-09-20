package com.main.bbangbbang.member.dto.responseDto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class MemberResponseDto {
    private Long id;
    private String email;
    private String nickname;
    private String img;
    private LocalDateTime lastModifiedAt;
    private LocalDateTime createdAt;
}
