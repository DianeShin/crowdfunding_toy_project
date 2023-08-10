package com.jumpbooster.jumpboosterbackend.comment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CommentController {
    private final CommentService service;

    @Autowired
    public CommentController(CommentService service){this.service = service;}

    @PostMapping("/comment/get-funders-comments-by-post-id")
    public List<Comment> getFundersCommentsByPostId(Long postId){
        return service.getFundersCommentsByPostId(postId);
    }

    @PostMapping("/comment/upload")
    public void uploadComment(@RequestParam Long postId,
                              @RequestParam Long userId,
                              @RequestParam String content,
                              @RequestParam String role){
        Comment newComment = new Comment(userId, postId, "", content, role);
        service.uploadComment(newComment);
    }
}
