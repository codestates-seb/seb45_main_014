package com.main.bbangbbang.menu.mapper;

import com.main.bbangbbang.menu.dto.MenuResponseDto;
import com.main.bbangbbang.menu.entity.MenuEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring") // componentModel을 "spring"으로 설정
@Component
public interface MenuMapper {
    @Mapping(source = "menuId", target = "id")
    MenuResponseDto toDto (MenuEntity menuEntity);
}