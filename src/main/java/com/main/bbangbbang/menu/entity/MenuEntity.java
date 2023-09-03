package com.main.bbangbbang.menu.entity;

import lombok.Getter;
import lombok.Setter;
import org.apache.catalina.Store;

import javax.persistence.*;
@Table(name = "menus")
@Getter
@Setter
@Entity
public class MenuEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_id") // 데이터베이스에서 menu_id 컬럼과 매핑
    private Long menuId; // 필드 이름을 menuId로 변경

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
