package com.jumpbooster.jumpboosterbackend.Administrator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdministratorService {
    private final AdministratorRepository repository;

    @Autowired
    public AdministratorService(AdministratorRepository repository){this.repository = repository;}
}
