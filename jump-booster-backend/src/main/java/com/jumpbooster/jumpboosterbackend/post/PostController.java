package com.jumpbooster.jumpboosterbackend.post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
public class PostController {
    private final PostService service;

    @Autowired
    public PostController(PostService service){this.service = service;}

    @GetMapping("/fetchAllPosts")
    public ResponseEntity<List<Post>> getAllPosts(){
        return ResponseEntity.ok(service.getAllPosts());
    }

    @PostMapping("/fetchBlogPostById")
    public ResponseEntity<Post> getPostById(@RequestBody Long postId){
        Optional<Post> result = service.getPostById(postId);
        return result.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/fetchPostsByUserId")
    public ResponseEntity<List<Post>> getPostsByUserId(@RequestBody Long userId){
        return ResponseEntity.ok(service.getPostsByUserId(userId));
    }

    @PostMapping("/create-post")
    public void createPost(@RequestParam("userId") Long userId,
                           @RequestParam("title") String title,
                           @RequestParam("titleImg") MultipartFile titleImg,
                           @RequestParam("content") String content,
                           @RequestParam("contentImg") MultipartFile contentImg,
                           @RequestParam("goalMoney") Long goalMoney) throws IOException {
        Post newPost = new Post(userId, title, titleImg.getBytes(), content, contentImg.getBytes(), LocalDateTime.now(), goalMoney);
        service.createPost(newPost);
    }
}
