package com.main.bbangbbang.member.entity;

import com.main.bbangbbang.memberstore.entity.MemberStore;
import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
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
public class Member {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @Column
    @Size(max = 12)
    private String nickname;

    @Column
    private String img;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<MemberStore> memberStores;

    @Column
    @LastModifiedDate
    private LocalDateTime lastModifiedAt;

    @Column
    @CreatedDate
    private LocalDateTime createdAt;
}
