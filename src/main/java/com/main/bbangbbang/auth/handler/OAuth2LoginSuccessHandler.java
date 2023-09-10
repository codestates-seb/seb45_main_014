package com.main.bbangbbang.auth.handler;

import com.main.bbangbbang.auth.jwt.JwtTokenizer;
import com.main.bbangbbang.auth.utils.CustomAuthorityUtils;
import com.main.bbangbbang.member.service.MemberService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {   // (1)

    @Value("${app.frontend.deployment.url}")  // 배포된 프론트엔드 URL을 프로퍼티 파일로부터 읽어옴
    private String frontendDeploymentUrl;

        private final CustomAuthorityUtils authorityUtils;
        private final JwtTokenizer jwtTokenizer;
        private final MemberService memberService;

        // (2)
        public OAuth2LoginSuccessHandler(JwtTokenizer jwtTokenizer,
                                         CustomAuthorityUtils authorityUtils
                                         , MemberService memberService
        ) {
            this.jwtTokenizer = jwtTokenizer;
            this.authorityUtils = authorityUtils;
            this.memberService = memberService;
        }

        @Override
        public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
            var oAuth2User = (OAuth2User)authentication.getPrincipal();
            // OAuth2User extends OAuth2AuthenticatedPrincipal extends AuthenticatedPrincipal extends Principal
            // Map<String, Object> attributes = oAuth2User.getAttributes(); 을 사용한 것입니다.
            // OAuth2User 인터페이스를 구현한 구글, 페이스북, 네이버, 카카오 등의 OAuth2User 객체를 받아올 수 있습니다.
            String email = String.valueOf(oAuth2User.getAttributes().get("email")); // (3)
            String nickname = String.valueOf(oAuth2User.getAttributes().get("name"));
            String img = String.valueOf(oAuth2User.getAttributes().get("picture"));

            System.out.println("OAuth 사용자 정보 : " + oAuth2User);
            System.out.println("사용자 이름 : " + nickname);
            System.out.println("사용자 이메일 : " + email);
            System.out.println("사용자 프로필 사진 : " + img);

            List<String> authorities = authorityUtils.createRoles(email);           // (4)

            saveMember(email, nickname, img);  // (5)

            redirect(request, response, email, nickname, authorities);  // (6)
        }

        private void saveMember(String email, String nickname, String img) {
            memberService.createMember(email, nickname, img);
        }

        private void redirect(HttpServletRequest request, HttpServletResponse response, String username, String nickname, List<String> authorities) throws IOException {
            String accessToken = delegateAccessToken(username, authorities);
            System.out.println("Access Token : " + accessToken);

            String refreshToken = delegateRefreshToken(username);
            System.out.println("Refresh Token : " + refreshToken);

            response.setHeader("Authorization", "Bearer " + accessToken);   // setHeader 메서드를 통해 accessToken, refreshToken을 response에 담기는 것 확인했습니다.
            response.setHeader("Refresh", refreshToken);
//            String uri = "http://localhost:3000";

            String uri = createURI(accessToken, refreshToken).toString();   // createURI 메서드를 통해 고정주소 + accessToken, refreshToken을 함께 주는 메서드
            System.out.println("redirect to URI : " + uri);
            System.out.println(request.getRequestURL());

            getRedirectStrategy().sendRedirect(request, response, uri);   // sendRedirect 메서드를 통해 redirect
        }

        private String delegateAccessToken(String username, List<String> authorities) {
            Map<String, Object> claims = new HashMap<>();
            claims.put("username", username);
            claims.put("roles", authorities);

            String subject = username;
            Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

            String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

            String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

            return accessToken;
        }

        private String delegateRefreshToken(String username) {
            String subject = username;
            Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
            String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

            String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

            return refreshToken;
        }

        private URI createURI(String accessToken, String refreshToken) {
            MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
            queryParams.add("access_token", accessToken);
            queryParams.add("refresh_token", refreshToken);

        String host;  // 호스트 이름을 저장할 변수
        int port;  // 포트 번호를 저장할 변수

        // 프론트 배포 환경 체크
        if (frontendDeploymentUrl != null && !frontendDeploymentUrl.isEmpty()) {
            // 배포 환경일 경우
            host = frontendDeploymentUrl;
            port = 80;  // 기본 HTTP 포트, 필요에 따라 변경 가능
        } else {
            // 개발 환경일 경우
            host = "localhost";
            port = 3000;
        }

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host(host)
                .port(port) // 추후 포트번호 변경 시 작성
                .path("/auth/google")
                .queryParams(queryParams)
                .build()
                .toUri();
    }
    }
