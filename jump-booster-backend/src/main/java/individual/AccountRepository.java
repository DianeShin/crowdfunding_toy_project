package individual;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    @Query("SELECT i FROM Account i WHERE i.email = ?1")
    Optional<Account> findAccountByEmail(String email);
}
