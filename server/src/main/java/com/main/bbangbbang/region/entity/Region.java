package com.main.bbangbbang.region.entity;

import com.main.bbangbbang.store.entity.Store;
import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@EntityListeners(AuditingEntityListener.class)
@Entity
@Getter
@Setter
public class Region {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @Column
    @NotNull
    private String regionName;

    @Column
    private Long parentId;

    @Column
    @OneToMany(mappedBy = "region")
    private List<Store> stores;

    @Column
    @LastModifiedDate
    private LocalDateTime lastModifiedAt;

    @Column
    @CreatedDate
    private LocalDateTime createdAt;
}
