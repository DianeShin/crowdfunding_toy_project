package com.jumpbooster.jumpboosterbackend.complaint;

import org.springframework.data.jpa.repository.JpaRepository;
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
}
