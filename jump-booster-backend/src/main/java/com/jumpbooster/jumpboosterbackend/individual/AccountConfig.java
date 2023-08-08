package com.jumpbooster.jumpboosterbackend.individual;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

@Configuration
public class AccountConfig {
    @Bean
    @ConfigurationProperties(prefix = "spring.datasource")
    CommandLineRunner accountCommandLineRunner(AccountRepository repository) throws IOException {
        File file = new File("/home/diane/Desktop/crowdfunding_toy_project/jump-booster-backend/src/main/java/com/jumpbooster/jumpboosterbackend/post/titleImgStorage/example.jpeg");
        byte[] fileContent = Files.readAllBytes(file.toPath());
        return args -> {
            Account Diane = new Account(
                    "Diane",
                    "jadore845@snu.ac.kr",
                    "a",
                    fileContent,
                    "individual"
            );
            Account DianeBuss = new Account(
                    "Diane",
                    "jadore845@gmail.com",
                    "a",
                    fileContent,
                    "business"
            );
            Account DianeAdmin = new Account(
                    "Diane",
                    "a@b",
                    "a",
                    fileContent,
                    "administrator"
            );
            repository.saveAll(List.of(Diane,DianeBuss, DianeAdmin));
        };
    }
}
