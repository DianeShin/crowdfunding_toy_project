package com.jumpbooster.jumpboosterbackend.complaint;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ComplaintController {
    private final ComplaintService service;

    @Autowired
    public ComplaintController(ComplaintService service){ this.service = service; }

    @GetMapping("/complaint/fetch-all-complaints")
    public ResponseEntity<List<Complaint>> getAllComplaints(){
        return ResponseEntity.ok(service.getAllComplaints());
    }

    @PostMapping("/complaint/get-complaint-by-post-id")
    public ResponseEntity<List<Complaint>> getComplaintsByPostId(@RequestParam Long postId){
        return ResponseEntity.ok(service.getComplaintsByPostId(postId));
    }

    @PostMapping("/complaint/get-complaint-by-user-id")
    public ResponseEntity<List<Complaint>> getComplaintsByUserId(@RequestParam Long userId){
        return ResponseEntity.ok(service.getComplaintsByUserId(userId));
    }

    @PostMapping("/complaint/get-complaint-by-complaint-id")
    public ResponseEntity<Complaint> getComplaintById(@RequestParam Long complaintId){
        return ResponseEntity.ok(service.getComplaintById(complaintId));
    }
    @PostMapping("/add-complaint")
    public ResponseEntity<String> addComplaint(@RequestBody AddComplaintDTO data){
        return ResponseEntity.ok(service.addComplaint(data));
    }

    @PostMapping("/complaint/update-reply")
    public ResponseEntity<String> updateReply(@RequestParam String reply,
                                              @RequestParam Long complaintId){
        return ResponseEntity.ok(service.updateReply(reply, complaintId));
    }

    @PostMapping("/complaint/abort-complaint")
    public ResponseEntity<String> abortComplaint(@RequestParam Long complaintId){
        return ResponseEntity.ok(service.abortComplaint(complaintId));
    }
}
