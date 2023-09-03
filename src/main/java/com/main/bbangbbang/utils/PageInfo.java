package com.main.bbangbbang.utils;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

@Getter
@Setter
@AllArgsConstructor
public class PageInfo {
    private int page;
    private int size;
    private long totalElements;
    private int totalPages;

    public static PageInfo of(int page, int size, Page<?> pageObject){

        return new PageInfo(page,size,pageObject.getTotalElements(),pageObject.getTotalPages());
    }
}
