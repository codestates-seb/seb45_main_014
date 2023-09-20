package com.main.bbangbbang.exception;

import lombok.Getter;

@Getter
public class AuthLogicException extends RuntimeException {
    private final ExceptionCode exceptionCode;

    public AuthLogicException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }
}
