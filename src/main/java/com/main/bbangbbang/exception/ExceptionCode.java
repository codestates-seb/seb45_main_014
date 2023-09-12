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
    NO_MEMBER(904, "멤버가 존재하지 않습니다.");

    private final int status;
    private final String message;
}
