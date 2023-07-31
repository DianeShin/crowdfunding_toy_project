package individual;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface IndividualRepository extends JpaRepository<Individual, Long> {
    @Query("SELECT i FROM Individual i WHERE i.email = ?1")
    Optional<Individual> findIndividualByEmail(String email);
}
