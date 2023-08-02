package com.jumpbooster.jumpboosterbackend.post;

import com.jumpbooster.jumpboosterbackend.individual.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    @Query("SELECT p FROM Post p WHERE p.postId = ?1")
    public Optional<Post> selectPostFromId(Long postId);
}
