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
    NOT_MEMBER(904, "로그인 되어있지 않습니다."),
    NO_ITEM(905, "해당 아이템이 없습니다."),
    OUT_OF_STOCK(906, "재고가 부족합니다:"),
    IMPROPER_EXTENSION(907, "옳지 않은 파일 형식입니다."),
    BIG_FILE(908, "파일 사이즈가 너무 큽니다.");

    private final int status;
    private final String message;
}
