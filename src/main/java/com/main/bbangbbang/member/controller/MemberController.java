package com.main.bbangbbang.member.controller;

import com.main.bbangbbang.member.dto.requestDto.MemberPatchDto;
import com.main.bbangbbang.member.dto.responseDto.MemberResponseDto;
import com.main.bbangbbang.member.entity.Member;
import com.main.bbangbbang.member.mapper.MemberMapper;
import com.main.bbangbbang.member.service.MemberService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/api/member")


public class MemberController {
    private MemberService memberService;
    private MemberMapper memberMapper;

    // 회원 정보 수정
    @PatchMapping
    public ResponseEntity<MemberResponseDto> patchMember(@RequestBody MemberPatchDto memberPatchDto,
                                      Authentication authentication) {
        try {
            String email = authentication.getPrincipal().toString();
            // MemberPatchDto를 사용하여 회원 정보를 수정하고, 수정된 회원 정보를 MemberResponseDto로 변환// Authroization 헤더에 토큰 담으면 -> JwtVerificationFilter에서 토큰 검증 할 때
            //            필터가 토큰 확인해서 토큰이 유효하면 신분증을 시큐리티컨텍스트홀더에 넣어놓는다.
            //            -> 컨트롤러에서 시큐리티컨텍스트홀더에서 신분증 꺼내서 사용할 수 있다.
            //                    -> authentication 신분증에서 principal(주체) 꺼내서 사용할 수 있다.
            // 여기서 authentication의 역할은 끝 !
            //            -> 이제부터는 서비스에서 principal(주체)를 사용할 수 있다.
            //            -> 서비스에서 principal(주체)를 사용할 수 있게 하려면
            //            -> 서비스에 principal(주체)를 전달해줘야 한다.
            //             SetAuthentication(authentication)
            // SecurityContextHolder는 필터에서 자격증명이 된 유저 정보를 저장한다.
            //            -> 필터에서 자격증명이 된 유저 정보를 저장할 때 사용하는 것이 SecurityContextHolder
            // 필터는 언제 이루어지는가? -> 요청이 들어올 때마다 필터가 실행된다.
            // 필터가 10종류 정도 있는데 그 중에 하나가 JwtVerificationFilter
            // Oauth2LoginAuthenticationFilter -> OAuth2 로그인을 처리하는 필터
            // JwtVerificationFilter -> JWT 토큰을 검증하는 필터
            // Request -> Filter -> Controller -> Service -> Repository -> DB -> Repository -> Service -> Controller -> Filter -> Response
            // 10종류 중 로그인을 오어스로그인으로 하게 되면

            Member member = memberService.findMember(email);

//            if (member == null) {
//
//                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//            }
//
//            if (memberPatchDto.getNickname() != null) {
//                member.setNickname(memberPatchDto.getNickname());
//            }
//
//            if (memberPatchDto.getImg() != null) {
//                member.setImg(memberPatchDto.getImg());
//            }

            memberService.updateMember(member);
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

//    @GetMapping(value = "/{member-id}", produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<MemberResponseDto> getMember(@PathVariable("member-id") Long id) {
//        try {
//            // memberId를 사용하여 회원을 조회하고, 조회된 회원 정보를 MemberResponseDto로 변환
//            Member member = memberService.findMemberById(id);
//            if (member == null) {
//                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//            }
//            MemberResponseDto responseDto = memberMapper.memberToMemberResponseDto(member);
//            return new ResponseEntity<>(responseDto, HttpStatus.OK);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

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