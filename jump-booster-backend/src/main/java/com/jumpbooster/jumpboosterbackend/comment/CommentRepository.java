package com.jumpbooster.jumpboosterbackend.comment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query("SELECT c FROM Comment c WHERE c.postId = ?1 AND c.role = ?2")
    List<Comment> getFundersCommentsByPostId(Long postId, String role);
}
