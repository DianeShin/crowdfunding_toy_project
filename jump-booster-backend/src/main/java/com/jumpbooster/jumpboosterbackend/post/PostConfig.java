package com.jumpbooster.jumpboosterbackend.post;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class PostConfig {
    @Bean
    @ConfigurationProperties(prefix = "spring.datasource.post")
    CommandLineRunner postCommandLineRunner(PostRepository repository) throws IOException {
        File file = new File("/home/diane/Desktop/crowdfunding_toy_project/jump-booster-backend/src/main/java/com/jumpbooster/jumpboosterbackend/post/titleImgStorage/example.jpeg");
        byte[] fileContent = Files.readAllBytes(file.toPath());
        return args -> {
            Post newPost = new Post(
                1L,
                    2L,
                    "Sample post",
                    fileContent,
                    "This is just a sample.",
                    fileContent,
                    LocalDateTime.of(2023, 9, 30, 23, 4),
                    1,
                    false,
                    20L,
                    400L

            );
            Post newPost1 = new Post(
                    2L,
                    2L,
                    "Sample post2",
                    fileContent,
                    "This is just a sample2.",
                    fileContent,
                    LocalDateTime.of(2023, 10, 30, 23, 4),
                    1,
                    false,
                    30L,
                    500L

            );
            Post newPost2 = new Post(
                    3L,
                    2L,
                    "Sample post3",
                    fileContent,
                    "This is just a sample3.",
                    fileContent,
                    LocalDateTime.of(2023, 10, 30, 23, 4),
                    -1,
                    false,
                    30L,
                    500L

            );
            Post newPost4 = new Post(
                    4L,
                    1L,
                    "Sample post2",
                    fileContent,
                    "This is just a sample2.",
                    fileContent,
                    LocalDateTime.of(2023, 10, 30, 23, 4),
                    1,
                    false,
                    30L,
                    500L

            );
            repository.saveAll(List.of(newPost,newPost1, newPost2, newPost4));
        };
    }
}
