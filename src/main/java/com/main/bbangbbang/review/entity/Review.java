package com.main.bbangbbang.review.entity;

import com.main.bbangbbang.member.entity.Member;
import com.main.bbangbbang.order.entity.Order;
import com.main.bbangbbang.store.entity.Store;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@EntityListeners(AuditingEntityListener.class)
@Entity
@Getter
@Setter
@NoArgsConstructor // JPA에서 entity는 반드시 NoArgsConstructor가 있어야 함
public class Review {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @Column
    @Min(1)
    @Max(5)
    @NotNull
    private Integer rating;

    @Column
    @NotNull
    private String content;

    @Column
    private String img;

    @ManyToOne
    @JoinColumn
    private Store store;

    @ManyToOne
    @JoinColumn
    private Member member;

    @ManyToOne
    @JoinColumn(name = "orders_id")
    private Order order;

    @Column
    @LastModifiedDate
    private LocalDateTime lastModifiedAt;

    @Column
    @CreatedDate
    private LocalDateTime createdAt;

    public Review(Integer rating, String content, Store store, Member member, Order order) {
        this.rating = rating;
        this.content = content;
        this.store = store;
        this.member = member;
        this.order = order;
    }

    public static Review of(Integer rating, String content, Store store, Member member, Order order) {
        return new Review(rating, content, store, member, order);
    }
}
