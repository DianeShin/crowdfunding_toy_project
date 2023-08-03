package com.jumpbooster.jumpboosterbackend.complaint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ComplaintService {
    private final ComplaintRepository repository;

    @Autowired
    public ComplaintService(ComplaintRepository repository){this.repository = repository;}

    public Optional<Complaint> findComplaintById(Long id){
        return repository.findComplaintById(id);
    }

    public List<Complaint> getAllComplaints() {
        return repository.findAll();
    }

    public String addComplaint(AddComplaintDTO data) {
        Optional<Complaint> result = repository.findComplaintByPostIdAndUserId(data.postId, data.userId);
        if (result.isPresent()) return "You can only file one complaint per post.";
        else {
            Complaint newComplaint = new Complaint(data.postId, data.userId, data.complaintType, data.content);
            repository.save(newComplaint);
            return "Request filed successfully!";
        }
    }
}
