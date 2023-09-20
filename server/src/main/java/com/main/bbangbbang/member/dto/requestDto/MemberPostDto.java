package com.main.bbangbbang.member.dto.requestDto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
public class MemberPostDto {
    @NotNull
    @Email
    private String email;
    @NotNull
    @Size(max = 12)
    private String nickname;
    private String img;
}