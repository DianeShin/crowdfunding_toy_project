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

    @PostMapping("/comment/get-comments-by-post-id-by-role")
    public List<Comment> getFundersCommentsByPostId(@RequestParam Long postId,
                                                    @RequestParam String role){
        return service.getFundersCommentsByPostId(postId, role);
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
