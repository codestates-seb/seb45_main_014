package com.main.bbangbbang.utils;

import com.main.bbangbbang.exception.BusinessLogicException;
import com.main.bbangbbang.exception.ExceptionCode;
import org.springframework.security.core.Authentication;

public class MemberUtils {
    public static String getEmail(Authentication authentication) {
        if (authentication == null) {
            throw new BusinessLogicException(ExceptionCode.NOT_MEMBER);
        }
        return authentication.getPrincipal().toString();
    }
}
