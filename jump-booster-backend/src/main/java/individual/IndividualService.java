package individual;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class IndividualService {
    private final IndividualRepository repository;

    @Autowired
    public IndividualService(IndividualRepository repository){this.repository = repository;}

    public void addIndividual(Individual individual){
        Optional<Individual> individualOptional = repository.findIndividualByEmail(individual.getEmail());
        if (individualOptional.isPresent()) throw new IllegalStateException("Email already taken.");
        repository.save(individual);
    }

    public void deleteIndividual(Long individualId){
        if(!repository.existsById(individualId)) throw new IllegalStateException("Wrong individual id.");
        repository.deleteById(individualId);
    }
}
