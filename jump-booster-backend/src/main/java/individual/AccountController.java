package individual;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "individual/")
public class AccountController {

    private final AccountService service;

    @Autowired
    public AccountController(AccountService service){this.service = service;}

    @PostMapping(path="register")
    public void registerNewAccount(@RequestBody Account account){
        service.addAccount(account);
    }

    @DeleteMapping(path = "/deregister")
    public void deleteAaccount(@RequestBody AccountDeregisterDTO data){
        service.deleteAccount(data.getUserId());
    }

}
