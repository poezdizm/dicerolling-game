package ru.poezdizm.dicerollinggame.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.poezdizm.dicerollinggame.model.RegistrationModel;
import ru.poezdizm.dicerollinggame.service.UserService;

@RestController
@CrossOrigin(origins = { "http://localhost:3000" }, allowedHeaders = "*", allowCredentials = "true")
@RequiredArgsConstructor
public class RegRestController {

    private final UserService userService;

    @PostMapping(path = "/reg")
    public ResponseEntity<String> register(@RequestBody RegistrationModel registrationModel) {
        boolean isRegistered = userService.registerUser(registrationModel);
        if (!isRegistered) {
            return ResponseEntity.internalServerError().build();
        }
        return ResponseEntity.ok().body(registrationModel.getUsername());
    }
}
