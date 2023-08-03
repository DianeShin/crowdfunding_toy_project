package com.jumpbooster.jumpboosterbackend.individual;

import jakarta.persistence.*;
import java.util.Arrays;

@Entity
@Table
public class Account {
    @Id
    @SequenceGenerator(
            name = "account_sequence",
            sequenceName = "account_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "account_sequence"
    )
    Long userId;
    String username;
    String email;
    String password;
    byte[] profileImg;
    String role;

    public Account(){}

    public Account(Long userId, String username, String email, String password, byte[] profileImg, String role) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.password = password;
        this.profileImg = profileImg;
        this.role = role;
    }

    public Account(String username, String email, String password, byte[] profileImg, String role) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.profileImg = profileImg;
        this.role = role;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public byte[] getProfileImg() {
        return profileImg;
    }

    public void setProfileImg(byte[] profileImg) {
        this.profileImg = profileImg;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "Individual{" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", profileImg=" + Arrays.toString(profileImg) +
                ", role='" + role + '\'' +
                '}';
    }
}
