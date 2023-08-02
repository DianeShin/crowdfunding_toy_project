package com.jumpbooster.jumpboosterbackend.post;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Entity
@Table
public class Post {
    @Id
    @SequenceGenerator(
            name = "post_sequence",
            sequenceName = "post_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "post_sequence"
    )
    Long postId;
    Long userId;
    String title;
    byte[] titleImg;
    String content;
    byte[] contentImg;

    LocalDateTime goalDateTime;

    // -1 if aborted, 0 if pending, 1 if approved
    int status;

    boolean completed;
    Long currentMoney;
    Long goalMoney;

    public Post(){}

    public Post(Long postId, Long userId, String title, byte[] titleImg, String content, byte[] contentImg, LocalDateTime goalDateTime, int status, boolean completed, Long currentMoney, Long goalMoney) {
        this.postId = postId;
        this.userId = userId;
        this.title = title;
        this.titleImg = titleImg;
        this.content = content;
        this.contentImg = contentImg;
        this.goalDateTime = goalDateTime;
        this.status = status;
        this.completed = completed;
        this.currentMoney = currentMoney;
        this.goalMoney = goalMoney;
    }

    public Post(Long userId, String title, byte[] titleImg, String content, byte[] contentImg, LocalDateTime goalDateTime, int status, boolean completed, Long currentMoney, Long goalMoney) {
        this.userId = userId;
        this.title = title;
        this.titleImg = titleImg;
        this.content = content;
        this.contentImg = contentImg;
        this.goalDateTime = goalDateTime;
        this.status = status;
        this.completed = completed;
        this.currentMoney = currentMoney;
        this.goalMoney = goalMoney;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public byte[] getTitleImg() {
        return titleImg;
    }

    public void setTitleImg(byte[] titleImg) {
        this.titleImg = titleImg;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public byte[] getContentImg() {
        return contentImg;
    }

    public void setContentImg(byte[] contentImg) {
        this.contentImg = contentImg;
    }

    public LocalDateTime getGoalDateTime() {
        return goalDateTime;
    }

    public void setGoalDateTime(LocalDateTime goalDateTime) {
        this.goalDateTime = goalDateTime;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public Long getCurrentMoney() {
        return currentMoney;
    }

    public void setCurrentMoney(Long currentMoney) {
        this.currentMoney = currentMoney;
    }

    public Long getGoalMoney() {
        return goalMoney;
    }

    public void setGoalMoney(Long goalMoney) {
        this.goalMoney = goalMoney;
    }

    @Override
    public String toString() {
        return "Post{" +
                "postId=" + postId +
                ", userId=" + userId +
                ", title='" + title + '\'' +
                ", titleImg=" + Arrays.toString(titleImg) +
                ", content='" + content + '\'' +
                ", contentImg=" + Arrays.toString(contentImg) +
                ", goalDateTime=" + goalDateTime +
                ", status=" + status +
                ", completed=" + completed +
                ", currentMoney=" + currentMoney +
                ", goalMoney=" + goalMoney +
                '}';
    }
}
