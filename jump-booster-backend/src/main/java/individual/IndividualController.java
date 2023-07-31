package individual;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "individual/")
public class IndividualController {

    private final IndividualService service;

    @Autowired
    public IndividualController(IndividualService service){this.service = service;}

    @PostMapping(path="register")
    public void registerNewIndividual(@RequestBody Individual individual){
        service.addIndividual(individual);
    }

    @DeleteMapping(path = "/deregister")
    public void deleteIndividual(@RequestBody IndividualDeregisterDTO data){
        service.deleteIndividual(data.getUserId());
    }

}
