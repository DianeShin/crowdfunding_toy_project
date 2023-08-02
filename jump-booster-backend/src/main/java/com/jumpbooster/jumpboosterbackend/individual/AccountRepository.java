package com.jumpbooster.jumpboosterbackend.individual;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    @Query("SELECT i FROM Account i WHERE i.email = ?1")
    Optional<Account> findAccountByEmail(String email);

    @Query("SELECT i FROM Account i WHERE i.username = ?1")
    Optional<Account> findAccountByUsername(String username);

    @Query("SELECT i FROM Account i WHERE i.userId = ?1")
    Optional<Account> findAccountByUserId(Long userId);
}
