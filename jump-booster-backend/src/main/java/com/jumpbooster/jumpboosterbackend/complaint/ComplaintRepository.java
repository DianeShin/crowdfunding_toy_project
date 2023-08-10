package com.jumpbooster.jumpboosterbackend.complaint;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    @Query("SELECT c FROM Complaint c WHERE c.complaintId = ?1")
    Optional<Complaint> findComplaintById(Long id);

    @Query("SELECT c FROM Complaint c WHERE c.postId = ?1 AND c.userId = ?2")
    Optional<Complaint> findComplaintByPostIdAndUserId(Long postId, Long userId);

    @Query("SELECT c FROM Complaint c WHERE c.postId = ?1")
    List<Complaint> getComplaintsByPostId(Long postId);

    @Query("SELECT c FROM Complaint c WHERE c.complaintId = ?1")
    Complaint getComplaintById(Long complaintId);

    @Modifying
    @Transactional
    @Query("UPDATE Complaint c SET c.reply = ?2 WHERE c.complaintId = ?1")
    void updateReply(Long complaintId, String reply);
    @Modifying
    @Transactional
    @Query("UPDATE Complaint c SET c.status = ?2 WHERE c.complaintId = ?1")
    void updateStatus(Long complaintId, int i);

    @Query("SELECT c FROM Complaint c WHERE c.userId = ?1")
    List<Complaint> getComplaintsByUserId(Long userId);
}
