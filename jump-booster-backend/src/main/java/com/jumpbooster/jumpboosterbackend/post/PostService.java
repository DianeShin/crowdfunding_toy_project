package com.jumpbooster.jumpboosterbackend.post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    private final PostRepository repository;
    @Autowired
    public PostService(PostRepository repository){ this.repository = repository;}

    public List<Post> getAllPosts(){
        return repository.findAll();
    }

    public Optional<Post> getPostById(Long postId) {
        return repository.findById(postId);
    }
}
