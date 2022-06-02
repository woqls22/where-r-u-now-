package com.spring.whereru.service;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class KafkaConsumer {
    @KafkaListener(topics="whereRU", groupId="rooms")
    public void consume(String location)throws IOException{
        System.out.println(String.format("Consumed Location : %s", location));
    }
}
