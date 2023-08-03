package com.jumpbooster.jumpboosterbackend.complaint;

import jakarta.persistence.*;

@Entity
@Table
public class Complaint {
    @Id
    @SequenceGenerator(
            name = "complaint_sequence",
            sequenceName = "complaint_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "complaint_sequence"
    )
    Long complaintId;
    Long postId;
    Long userId;
    String complaintType;
    String content;

    // -1 for aborted, 0 for pending, 1 for reviewed
    int status;

    String reply;

    public Complaint(){};
    public Complaint(Long complaintId, Long postId, Long userId, String complaintType, String content, int status, String reply) {
        this.complaintId = complaintId;
        this.postId = postId;
        this.userId = userId;
        this.complaintType = complaintType;
        this.content = content;
        this.status = status;
        this.reply = reply;
    }

    public Complaint(Long postId, Long userId, String complaintType, String content, int status, String reply) {
        this.postId = postId;
        this.userId = userId;
        this.complaintType = complaintType;
        this.content = content;
        this.status = status;
        this.reply = reply;
    }

    public Complaint(Long postId, Long userId, String complaintType, String content) {
        this.postId = postId;
        this.userId = userId;
        this.complaintType = complaintType;
        this.content = content;
    }

    public Long getComplaintId() {
        return complaintId;
    }

    public void setComplaintId(Long complaintId) {
        this.complaintId = complaintId;
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

    public String getComplaintType() {
        return complaintType;
    }

    public void setComplaintType(String complaintType) {
        this.complaintType = complaintType;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getReply() {
        return reply;
    }

    public void setReply(String reply) {
        this.reply = reply;
    }

    @Override
    public String toString() {
        return "Complaint{" +
                "complaintId=" + complaintId +
                ", postId=" + postId +
                ", userId=" + userId +
                ", complaintType='" + complaintType + '\'' +
                ", content='" + content + '\'' +
                ", status=" + status +
                ", reply='" + reply + '\'' +
                '}';
    }
}
