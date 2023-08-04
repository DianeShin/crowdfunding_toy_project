package com.jumpbooster.jumpboosterbackend.individual;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
public class AccountController {

    private final AccountService service;

    @Autowired
    public AccountController(AccountService service){this.service = service;}

    @PostMapping("account/register")
    public void registerNewAccount( @RequestParam("username") String username,
                                    @RequestParam("email") String email,
                                    @RequestParam("password") String password,
                                    @RequestParam("profileImg") MultipartFile profileImg,
                                    @RequestParam("role") String role

    ) throws IOException {
        Account newAccount = new Account(username, email, password, profileImg.getBytes(), role);
        service.addAccount(newAccount);
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

    @PostMapping("account/get-account-by-id")
    public ResponseEntity<Account> getAccountById(@RequestBody Long userId){
        Optional<Account> result = service.getAccountById(userId);
        return result.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("account/deregister")
    public void deleteAccount(@RequestBody AccountDeregisterDTO data){
        service.deleteAccount(data.getUserId());
    }

}
