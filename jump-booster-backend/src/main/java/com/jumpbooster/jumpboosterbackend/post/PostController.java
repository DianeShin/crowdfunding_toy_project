package com.jumpbooster.jumpboosterbackend.post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
}
