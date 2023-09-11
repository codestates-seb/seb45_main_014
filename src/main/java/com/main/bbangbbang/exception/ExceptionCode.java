package com.main.bbangbbang.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ExceptionCode {
    NOT_SAME_STORE(900, "다른 매장에서 주문 중입니다."),
    NO_ACCESS(901, "권한이 없습니다.");

    private final int status;
    private final String message;
}
