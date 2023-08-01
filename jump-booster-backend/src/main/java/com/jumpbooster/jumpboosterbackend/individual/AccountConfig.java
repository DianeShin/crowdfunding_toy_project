package com.jumpbooster.jumpboosterbackend.individual;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AccountConfig {
    @Bean
    @ConfigurationProperties(prefix = "spring.datasource")
    CommandLineRunner commandLineRunner(AccountRepository repository) {
        byte[] a = new byte[0];
        return args -> {
            Account Diane = new Account(
                    "Diane",
                    "jadore845@snu.ac.kr",
                    "a",
                    a,
                    "individual"
            );
            repository.save(Diane);
        };
    }
}
