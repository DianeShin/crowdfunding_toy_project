package individual;

import jakarta.persistence.*;
import org.hibernate.annotations.Type;

import java.util.Arrays;

@Entity
@Table
public class Individual{
    @Id
    @SequenceGenerator(
            name = "individual_sequence",
            sequenceName = "individual_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "individual_sequence"
    )
    Long userId;
    String username;
    String email;
    String password;
    @Lob
    byte[] profileImg;

    public Individual(){}

    public Individual(Long userId, String username, String email, String password, byte[] profileImg) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.password = password;
        this.profileImg = profileImg;
    }

    public Individual(String username, String email, String password, byte[] profileImg) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.profileImg = profileImg;
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

    @Override
    public String toString() {
        return "Individual{" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", profileImg=" + Arrays.toString(profileImg) +
                '}';
    }
}
