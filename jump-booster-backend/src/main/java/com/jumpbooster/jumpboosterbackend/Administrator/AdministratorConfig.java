package com.jumpbooster.jumpboosterbackend.Administrator;

import com.jumpbooster.jumpboosterbackend.individual.Account;
import com.jumpbooster.jumpboosterbackend.individual.AccountRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

@Configuration
public class AdministratorConfig {
    @Bean
    @ConfigurationProperties(prefix = "spring.datasource.administrator")
    CommandLineRunner postCommandLineRunner(AdministratorRepository repository) {
        return args -> {
            Administrator Diane = new Administrator(
                    1L,
                    "diane",
                    "a"
            );
            repository.save(Diane);
        };
    }
}
