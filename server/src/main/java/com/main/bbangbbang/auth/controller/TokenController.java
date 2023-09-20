package com.main.bbangbbang.auth.controller;

import com.main.bbangbbang.auth.service.TokenService;
import com.main.bbangbbang.auth.utils.CustomAuthorityUtils;
import com.main.bbangbbang.member.entity.Member;
import com.main.bbangbbang.member.repository.MemberRepository;
import com.main.bbangbbang.member.service.MemberService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@Slf4j
public class TokenController {

    private final TokenService tokenService;
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberService memberService;

    @PostMapping("/api/token/refresh")  // refresh 토큰을 이용한 access 토큰 재발급
    public ResponseEntity<String> refreshAccessToken(HttpServletRequest request) {
        String refreshTokenHeader = request.getHeader("Refresh").replace("Bearer ", "");

        // 체크: 리프레시 토큰 유효성
        Jws<Claims> claims;
        try {
            claims = tokenService.checkRefreshToken(refreshTokenHeader);
        } catch (JwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
        }

        String email = claims.getBody().getSubject();
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        List<String> authorities = authorityUtils.createRoles(email);

        if(optionalMember.isPresent()){
            Member member = optionalMember.get();
            String username = member.getNickname();
            String accessToken = tokenService.delegateAccessToken(username, authorities);

            return ResponseEntity.ok().header("Authorization", "Bearer " + accessToken).body("Successfully refreshed");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Member not found");
        }
    }
}
