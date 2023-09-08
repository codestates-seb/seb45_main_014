package com.main.bbangbbang.menu.entity;

import com.main.bbangbbang.store.entity.Store;
import java.time.LocalDateTime;
import javax.persistence.EntityListeners;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@Entity
public class Menu {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @ManyToOne
    @JoinColumn
    private Store store;

    @Column
    @Size(max = 30)
    private String menuName;

    @Column
    @Size(max = 200)
    private String menuDesc;

    @Column
    @Size(max = 200)
    private String ingredient;

    @Column
    @Min(100)
    @Max(1000000)
    private Integer price;

    @Column
    @Max(1000)
    private Integer stock;

    @Column
    private String img;

    @Column
    @LastModifiedDate
    private LocalDateTime lastModifiedAt;

    @Column
    @CreatedDate
    private LocalDateTime createdAt;
}
