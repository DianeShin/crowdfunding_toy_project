package com.jumpbooster.jumpboosterbackend.comment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    private final CommentRepository repository;

    @Autowired
    public CommentService(CommentRepository repository){this.repository = repository;}

    public List<Comment> getFundersCommentsByPostId(Long postId) {
        return repository.getFundersCommentsByPostId(postId);
    }

    public void uploadComment(Comment newComment) {
        repository.save(newComment);
    }
}
