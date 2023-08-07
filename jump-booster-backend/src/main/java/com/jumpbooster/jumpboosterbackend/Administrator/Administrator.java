package com.jumpbooster.jumpboosterbackend.Administrator;

import jakarta.persistence.*;

@Entity
@Table
public class Administrator {
    @Id
    @SequenceGenerator(
            name = "administrator_sequence",
            sequenceName = "administrator_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "administrator_sequence"
    )
    Long administratorId;
    String username;
    String password;

    public Administrator(){}
    public Administrator(Long administratorId, String username, String password) {
        this.administratorId = administratorId;
        this.username = username;
        this.password = password;
    }

    public Administrator(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public Long getAdministratorId() {
        return administratorId;
    }

    public void setAdministratorId(Long administratorId) {
        this.administratorId = administratorId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "Administrator{" +
                "administratorId=" + administratorId +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
