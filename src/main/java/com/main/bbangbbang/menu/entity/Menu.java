package com.main.bbangbbang.menu.entity;

import lombok.Getter;
import lombok.Setter;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Table
@Getter
@Setter
@Entity
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id; // 필드 이름을 Id로 변경

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "store_id", nullable = false)
//    private Store store; // 있던 말던 상관 없는 상태, mapper가 매핑 해주지 않음. 구현이 되어 있지 않은 기능이라 주석처리.

    // dbdiagram에 menu table 보고 entity 작성한 것
    @Column(name="menu_name", nullable = false)
    private String menuName;

    @Column
    private String menuDesc;

    @Column
    private String ingredient;

    @Column
    private int price;

    @Column
    private int stock;

    @Column
    private String img;
}
