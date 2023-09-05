package com.main.bbangbbang.order.entity;

import com.main.bbangbbang.member.entity.Member;
import com.main.bbangbbang.ordermenu.entity.OrderMenu;
import com.main.bbangbbang.store.entity.Store;
import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@EntityListeners(AuditingEntityListener.class)
@Entity(name = "orders")
@Getter
@Setter
public class Order {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @JoinColumn
    @ManyToOne
    private Store store;

    @JoinColumn
    @ManyToOne
    private Member member;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderMenu> orderMenus;

    @Column
    @LastModifiedDate
    private LocalDateTime lastModifiedAt;

    @Column
    @CreatedDate
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime pickupTime;

    @Column
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus = OrderStatus.CREATED;

    public enum OrderStatus { // private로 설정하고 싶은데 mapper에서 Enum.name()을 사용하려면 public으로 둬야 하나?
        CREATED("생성"),
        ACTIVE("담는중"),
        BAKING("준비중"),
        READY("준비완료"),
        PICKUP("픽업"),
        REVIEWED("리뷰"),
        CANCELED("취소"),
        DELETED("삭제");

        private String status;

        OrderStatus(String status) {
            this.status = status;
        }

        public String getStatus() {
            return status;
        }
    }

    public void addOrderMenu(OrderMenu orderMenu) {
        for (OrderMenu orderMenuOnCart: orderMenus) {
            if (orderMenuOnCart.getMenu().getMenuName().equals(orderMenu.getMenu().getMenuName())) {
                orderMenuOnCart.setQuantity(orderMenuOnCart.getQuantity() + orderMenu.getQuantity());
                return;
            }
        }
        orderMenus.add(orderMenu);
    }
}
