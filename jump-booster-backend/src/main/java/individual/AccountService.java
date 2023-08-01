package individual;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
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
}
