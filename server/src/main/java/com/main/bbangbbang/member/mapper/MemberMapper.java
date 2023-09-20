package com.main.bbangbbang.member.mapper;

import com.main.bbangbbang.member.dto.requestDto.MemberPostDto;
import com.main.bbangbbang.member.dto.requestDto.MemberPatchDto;
import com.main.bbangbbang.member.dto.responseDto.MemberResponseDto;
import com.main.bbangbbang.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member memberPostDtoToMember(MemberPostDto memberPostDto);
    Member memberPatchDtoToMember(MemberPatchDto memberPatchDto);
    MemberResponseDto memberToMemberResponseDto(Member member);
}
