package com.main.bbangbbang.member.controller;

import com.main.bbangbbang.auth.jwt.JwtTokenizer;
import com.main.bbangbbang.member.dto.requestDto.MemberPatchDto;
import com.main.bbangbbang.member.dto.responseDto.MemberResponseDto;
import com.main.bbangbbang.member.entity.Member;
import com.main.bbangbbang.member.mapper.MemberMapper;
import com.main.bbangbbang.member.service.MemberService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@AllArgsConstructor
@RestController
@RequestMapping("/api/member")
public class MemberController {
    private MemberService memberService;
    private MemberMapper memberMapper;
    private JwtTokenizer jwtTokenizer;

    @PostMapping("/logout")
    public ResponseEntity logout(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        String jws = authorizationHeader.substring(7);    // "Bearer " 이후의 토큰 문자열 추출

        jwtTokenizer.addToTokenBlacklist(jws);     //블랙리스트에 jws 추가, 접근 막음

        return ResponseEntity.ok().body("Successfully logged out");
    }

    // 회원 정보 수정
    @PatchMapping
    public ResponseEntity<MemberResponseDto> patchMember(@RequestBody MemberPatchDto memberPatchDto,
                                      Authentication authentication) {
        try {
            String email = authentication.getPrincipal().toString();
            Member member = memberService.findMember(email);

            if (member == null) {

                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            if (memberPatchDto.getNickname() != null) {
                member.setNickname(memberPatchDto.getNickname());
            }

            if (memberPatchDto.getImg() != null) {
                member.setImg(memberPatchDto.getImg());
            }

            member = memberService.updateMember(member);
            MemberResponseDto responseDto = memberMapper.memberToMemberResponseDto(member);

            return new ResponseEntity<>(responseDto, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 회원 조회
    @GetMapping
    public ResponseEntity<MemberResponseDto> getMember(Authentication authentication) {
        try {
            String email = authentication.getPrincipal().toString();
            Member member = memberService.findMember(email);

            if (member == null) {

                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            MemberResponseDto responseDto = memberMapper.memberToMemberResponseDto(member);
            return new ResponseEntity<>(responseDto, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

        // 회원 탈퇴
        @DeleteMapping
        public ResponseEntity<MemberResponseDto> deleteMember (Authentication authentication){

            try {
                String email = authentication.getPrincipal().toString();
                Member member = memberService.findMember(email);

                if (member != null) {
                    memberService.deleteMember(member.getId());
                    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
                } else {
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }
            } catch (Exception e) {
                e.printStackTrace();
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        // 이미지 업로드 (미완성)
//    @PostMapping(value ="/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity uploadImage(Authentication authentication,
//                                      @RequestParam("file") MultipartFile file) {
////        Member savedMember = memberService.uploadImage(authentication, file);
////        String email = authentication.getAttribute("email");
////        Member member = memberService.findMember(email);
////        if (!file.isEmpty()) {
////            // 파일 저장
////        }
////        memberService.updateMember(member);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
    }