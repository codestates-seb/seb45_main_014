package com.main.bbangbbang;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class BbangbbangApplication {

	public static void main(String[] args) {
		SpringApplication.run(BbangbbangApplication.class, args);
	}

}
