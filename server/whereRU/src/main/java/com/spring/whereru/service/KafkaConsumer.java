package com.spring.whereru.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class KafkaConsumer {
    @Autowired
    private final SimpMessagingTemplate template;

    @KafkaListener(topics="whereRU", groupId="rooms")
    public void consume(String location)throws IOException{
        System.out.println(String.format("Consumed Location : %s", location));
        template.convertAndSend("/topic",location);
    }
}
