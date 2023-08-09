package com.jumpbooster.jumpboosterbackend.post;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    @Query("SELECT p FROM Post p WHERE p.userId = ?1")
    public List<Post> findAllPostsByUserId(Long userId);

    @Query("SELECT p FROM Post p WHERE p.status = 1")
    public List<Post> findAllActivePosts();
    @Modifying
    @Transactional
    @Query("UPDATE Post p SET p.status = -1 WHERE p.postId = ?1")
    void abortPostByPostId(Long postId);
    @Modifying
    @Transactional
    @Query("UPDATE Post p SET p.status = 0 WHERE p.postId = ?1")
    void activatePostByPostId(Long postId);
}
