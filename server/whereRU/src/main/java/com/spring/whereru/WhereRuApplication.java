package com.spring.whereru;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.kafka.annotation.EnableKafka;

@EnableKafka
@SpringBootApplication
public class WhereRuApplication {

    public static void main(String[] args) {
        SpringApplication.run(WhereRuApplication.class, args);
    }

}
