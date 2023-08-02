package com.jumpbooster.jumpboosterbackend.individual;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class AccountService {
    private final AccountRepository repository;

    @Autowired
    public AccountService(AccountRepository repository){this.repository = repository;}

    public void addAccount(Account account){
        Optional<Account> individualOptional = repository.findAccountByEmail(account.getEmail());
        if (individualOptional.isPresent()) throw new IllegalStateException("Email already taken.");
        repository.save(account);
    }

    public void deleteAccount(Long accountId){
        if(!repository.existsById(accountId)) throw new IllegalStateException("Wrong account id.");
        repository.deleteById(accountId);
    }

    // -3 if no acct, -2 if wrong role, -1 if wrong password, positive int if userId.
    public Long loginWithEmail(String email, String password, String role) {
        Optional<Account> individualOptional = repository.findAccountByEmail(email);
        if (individualOptional.isEmpty()) return -3L;
        else if (!individualOptional.get().getRole().equals(role)) return -2L;
        else if (!individualOptional.get().getPassword().equals(password)) return -1L;
        else return individualOptional.get().getUserId();
    }

    // -3 if no acct, -2 if wrong role, -1 if wrong password, positive int if userId.
    public Long loginWithUsername(String username, String password, String role) {
        Optional<Account> individualOptional = repository.findAccountByUsername(username);
        if (individualOptional.isEmpty()) return -3L;
        else if (!individualOptional.get().getRole().equals(role)) return -2L;
        else if (!individualOptional.get().getPassword().equals(password)) return -1L;
        else return individualOptional.get().getUserId();
    }

    public Optional<Account> getAccountById(Long userId) {
        return repository.findAccountByUserId(userId);
    }
}
