package com.main.bbangbbang;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableJpaAuditing
@EnableScheduling
@SpringBootApplication
public class BbangbbangApplication {

	public static void main(String[] args) {
		SpringApplication.run(BbangbbangApplication.class, args);
		System.out.println("Hello, World!");
	}
}
