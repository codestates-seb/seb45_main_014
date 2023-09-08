package com.main.bbangbbang.store.entity;

import com.main.bbangbbang.menu.entity.Menu;
import com.main.bbangbbang.region.entity.Region;
import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@EntityListeners(AuditingEntityListener.class)
@Entity
@Getter
@Setter
public class Store {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @Column
    @Size(max = 40)
    private String storeName;

    @Column
    private String introduction;

    @Column
    @Size(max = 40)
    private String address;

    @Column
    private Long placeId;

    @Column(unique = true)
    @Pattern(regexp = "\\d{10,11}$")
    private String phoneNum;

    @Column
    private String img;

    @Column
    private Float rating;

    @ManyToOne
    @JoinColumn
    private Region region;

    @OneToMany(mappedBy = "store")
    private List<Menu> menus;

    @Column
    @LastModifiedDate
    private LocalDateTime lastModifiedAt;

    @Column
    @CreatedDate
    private LocalDateTime createdAt;
}
