package com.jumpbooster.jumpboosterbackend.comment;

import ch.qos.logback.core.util.CachingDateFormatter;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Table
public class Comment {
    @Id
    @SequenceGenerator(
            name = "comment_sequence",
            sequenceName = "comment_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "comment_sequence"
    )
    Long commentId;
    Long userId;
    Long postId;
    @SequenceGenerator(
            name = "comment_group_sequence",
            sequenceName = "comment_group_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "comment_group_sequence"
    )
    Long commentGroup;
    String title;
    String content;
    String role;

    String timestamp;

    public Comment(){}

    public Comment(Long commentId, Long userId, Long postId, Long commentGroup, String title, String content, String role) {
        this.commentId = commentId;
        this.userId = userId;
        this.postId = postId;
        this.commentGroup = commentGroup;
        this.title = title;
        this.content = content;
        this.role = role;
        LocalDateTime localDateTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yy.MM.dd HH.mm");
        this.timestamp = localDateTime.format(formatter);

    }

    public Comment(Long userId, Long postId, Long commentGroup, String title, String content, String role) {
        this.userId = userId;
        this.postId = postId;
        this.commentGroup = commentGroup;
        this.title = title;
        this.content = content;
        this.role = role;
        LocalDateTime localDateTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yy.MM.dd HH.mm");
        this.timestamp = localDateTime.format(formatter);
    }

    public Comment(Long userId, Long postId, String title, String content, String role) {
        this.userId = userId;
        this.postId = postId;
        this.title = title;
        this.content = content;
        this.role = role;
        LocalDateTime localDateTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yy HH.mm");
        this.timestamp = localDateTime.format(formatter);
    }

    public Long getCommentId() {
        return commentId;
    }

    public void setCommentId(Long commentId) {
        this.commentId = commentId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public Long getCommentGroup() {
        return commentGroup;
    }

    public void setCommentGroup(Long commentGroup) {
        this.commentGroup = commentGroup;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "Comment{" +
                "commentId=" + commentId +
                ", userId=" + userId +
                ", postId=" + postId +
                ", commentGroup=" + commentGroup +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", role='" + role + '\'' +
                ", timestamp=" + timestamp +
                '}';
    }
}
