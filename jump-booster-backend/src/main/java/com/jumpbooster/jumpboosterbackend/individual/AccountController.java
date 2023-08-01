package com.jumpbooster.jumpboosterbackend.individual;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class AccountController {

    private final AccountService service;

    @Autowired
    public AccountController(AccountService service){this.service = service;}

    @PostMapping("account/register")
    public void registerNewAccount(@RequestBody Account account){
        service.addAccount(account);
    }

    @PostMapping("account/login")
    public ResponseEntity<Long> login(@RequestBody AccountLoginDTO data){
        Long result;

        if (data.user.contains("@")){
            result = service.loginWithEmail(data.user, data.password, data.role);
        }
        else result = service.loginWithUsername(data.user, data.password, data.role);

        // -3 if no acct, -2 if wrong role, -1 if wrong password, positive int if userId.
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("account/deregister")
    public void deleteAccount(@RequestBody AccountDeregisterDTO data){
        service.deleteAccount(data.getUserId());
    }

}
