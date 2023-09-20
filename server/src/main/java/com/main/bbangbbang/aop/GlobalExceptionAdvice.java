package com.main.bbangbbang.aop;

import com.main.bbangbbang.exception.BusinessLogicException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionAdvice {
    @ExceptionHandler(BusinessLogicException.class)
    public ResponseEntity<?> handleBusinessLogicException(BusinessLogicException e) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("BBANGBBANG_EXCEPTION", String.valueOf(e.getExceptionCode().getStatus()));

        return ResponseEntity.ok().headers(headers).body(e.getMessage());
    }
}
