package com.spring.whereru.controller;

import com.spring.whereru.service.KafkaConsumer;
import com.spring.whereru.service.KafkaProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/kafka")
public class KafkaController {
    private final KafkaProducer kafkaProducer;
    private final KafkaConsumer kafkaConsumer;
    @Autowired
    KafkaController(KafkaProducer kafkaProducer, KafkaConsumer kafkaConsumer){
        this.kafkaProducer=kafkaProducer;
        this.kafkaConsumer=kafkaConsumer;
    }

    @PostMapping
    public String sendMessage(@RequestParam("location") String location){
        this.kafkaProducer.sendLocation(location);
        return "Success";
    }
}
