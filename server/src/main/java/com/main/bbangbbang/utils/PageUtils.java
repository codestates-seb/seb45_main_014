package com.main.bbangbbang.utils;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

public class PageUtils {
    public static <T> Page<T> convertToPage(List<T> items, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), items.size());
        List<T> pageContent = items.subList(start, end);

        return new PageImpl<>(pageContent, pageable, items.size());
    }
}
