package com.main.bbangbbang.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ExceptionCode {
    NOT_SAME_STORE(900, "다른 매장에서 주문 중입니다."),
    NO_ACCESS(901, "권한이 없습니다."),
    NO_ACTIVE_ORDER(902, "장바구니가 없습니다."),
    MANY_ACTIVE_ORDER(903, "장바구니가 너무 많습니다."),
    NO_MEMBER(904, "멤버가 존재하지 않습니다."),
    NO_ITEM(905, "해당 아이템이 없습니다."),
    OUT_OF_STOCK(906, "재고가 부족합니다:"),

    JWT_TOKEN_EXPIRED(401,"토큰이 만료되었습니다"),
    UNAUTHENTICATED_USER(402, "인증되지 않은 사용자입니다. 로그인이 필요합니다.");

    private final int status;
    private final String message;
}
