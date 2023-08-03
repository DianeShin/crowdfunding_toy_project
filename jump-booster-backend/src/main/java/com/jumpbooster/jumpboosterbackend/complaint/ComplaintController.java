package com.jumpbooster.jumpboosterbackend.complaint;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ComplaintController {
    private final ComplaintService service;

    @Autowired
    public ComplaintController(ComplaintService service){ this.service = service; }

    @GetMapping("/get-all-complaints")
    public ResponseEntity<List<Complaint>> getAllComplaints(){
        return ResponseEntity.ok(service.getAllComplaints());
    }

    @PostMapping("/add-complaint")
    public ResponseEntity<String> addComplaint(@RequestBody AddComplaintDTO data){
        return ResponseEntity.ok(service.addComplaint(data));
    }
}
