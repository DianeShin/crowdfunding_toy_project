package com.jumpbooster.jumpboosterbackend.complaint;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class ComplaintConfig {
    @Bean
    @ConfigurationProperties(prefix = "spring.datasource.complaint")
    CommandLineRunner complaintCommandLineRunner(ComplaintRepository repository) {
        return args -> {
            Complaint complaint1 = new Complaint(
                    1L,
                    1L,
                    "Other",
                    "I don't like this."
            );
            Complaint complaint2 = new Complaint(
                    2L,
                    1L,
                    "Other",
                    "I don't like this so much."
            );
            Complaint complaint3 = new Complaint(
                    2L,
                    2L,
                    "Other",
                    "I really don't like this"
            );
            repository.saveAll(List.of(complaint1,complaint2,complaint3));
        };
    }
}
