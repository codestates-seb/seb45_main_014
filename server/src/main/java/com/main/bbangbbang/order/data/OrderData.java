package com.main.bbangbbang.order.data;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.main.bbangbbang.ordermenu.data.OrderMenuData;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Getter
@Setter
public class OrderData {
    private Long id;
    private Long storeId;
    private String orderStatus;
    private String storeName;
    private LocalDateTime pickupTime;
    private LocalDateTime lastModifiedAt;
    private LocalDateTime createdAt;
    private List<OrderMenuData> orderMenus;
}
