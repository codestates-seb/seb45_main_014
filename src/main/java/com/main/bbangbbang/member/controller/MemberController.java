package com.main.bbangbbang.member.controller;

import com.main.bbangbbang.auth.jwt.JwtTokenizer;
import com.main.bbangbbang.member.dto.requestDto.MemberPatchDto;
import com.main.bbangbbang.member.dto.responseDto.MemberResponseDto;
import com.main.bbangbbang.member.entity.Member;
import com.main.bbangbbang.member.mapper.MemberMapper;
import com.main.bbangbbang.member.service.MemberService;
import com.main.bbangbbang.s3.S3Service;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

@AllArgsConstructor
@RestController
@RequestMapping("/api/member")
public class MemberController {
    private MemberService memberService;
    private MemberMapper memberMapper;
    private JwtTokenizer jwtTokenizer;
    private S3Service s3Service;

    @PostMapping("/logout")
    public ResponseEntity logout(HttpServletRequest request) {
        // "Bearer " 이후의 토큰 문자열 추출
        // .substring -> .split(" ") -> .replace("Bearer ", "") 로 대체 가능
        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("Authorization header is not valid");
        }

        String[] parts = authorizationHeader.split(" ");
        String jws;

        if (parts.length > 1) {
            jws = parts[1];
        } else {
            return ResponseEntity.badRequest().body("Invalid Authorization header format.");
        }

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

        // 회원 이미지 업로드
        @PostMapping(value ="/image")
        public ResponseEntity uploadImage(Authentication authentication, @RequestPart("file") MultipartFile multipartFile) {
            System.out.println(multipartFile.getOriginalFilename());
            // 파일이 비어있는 경우
            if (multipartFile.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        String email = authentication.getPrincipal().toString();
        Member member = memberService.findMember(email);

        String img = s3Service.uploadImage(multipartFile, "members", member.getId());

        // 업로드된 이미지의 URL을 회원 정보에 저장 (이 부분은 회원 엔터티와 서비스에 따라 다를 수 있습니다)
        member.setImg(img);
        memberService.updateMember(member);

        return new ResponseEntity<>(img, HttpStatus.OK);
    }
    }