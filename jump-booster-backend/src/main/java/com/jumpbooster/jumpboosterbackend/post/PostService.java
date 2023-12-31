package com.jumpbooster.jumpboosterbackend.post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
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

    public List<Post> getPostsByUserId(Long userId) {
        return repository.findAllPostsByUserId(userId);
    }

    public void createPost(Post post){
        repository.save(post);
    }

    public void deletePost(Long postId) {
        repository.deleteById(postId);
    }

    public List<Post> getAllActivePosts() {
        return repository.findAllActivePosts();
    }

    public void abortPost(Long postId) {
        repository.abortPostByPostId(postId);
    }

    public void activatePost(Long postId) {
        repository.activatePostByPostId(postId);
    }
}
