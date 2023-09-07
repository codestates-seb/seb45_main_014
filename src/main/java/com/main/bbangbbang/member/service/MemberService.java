package com.main.bbangbbang.member.service;

import com.main.bbangbbang.member.entity.Member;
import com.main.bbangbbang.member.repository.MemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@AllArgsConstructor
@Service
public class MemberService {
    private MemberRepository memberRepository;

    public Member findMember(String email) {
        return memberRepository.findByEmail(email).orElseThrow(NoSuchElementException::new);
    }
}
