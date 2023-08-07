package com.jumpbooster.jumpboosterbackend.Administrator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdministratorController {
    private final AdministratorService service;

    @Autowired
    public AdministratorController(AdministratorService service){this.service = service;}
}
