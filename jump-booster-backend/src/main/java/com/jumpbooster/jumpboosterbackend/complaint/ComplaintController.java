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

    @PostMapping("/add-complaint")
    public ResponseEntity<String> addComplaint(@RequestBody AddComplaintDTO data){
        return ResponseEntity.ok(service.addComplaint(data));
    }
}
