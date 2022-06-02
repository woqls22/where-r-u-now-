package com.spring.whereru.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducer {
    private static final String TOPIC = "whereRU";
    private final KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    KafkaProducer(KafkaTemplate kafkaTemplate){
        this.kafkaTemplate=kafkaTemplate;
    }

    public void sendLocation(String location){
        System.out.println(String.format("Produce Location : %s", location));
        this.kafkaTemplate.send(TOPIC, location);
    }

}
