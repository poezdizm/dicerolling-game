package ru.poezdizm.dicerollinggame.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.poezdizm.dicerollinggame.exception.ValidationException;
import ru.poezdizm.dicerollinggame.model.GameSettingsModel;
import ru.poezdizm.dicerollinggame.model.response.MessageResponse;
import ru.poezdizm.dicerollinggame.service.GameSettingsService;

@RestController
@RequestMapping("/new")
@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
public class GameSettingsRestController {

    private final GameSettingsService settingsService;

    @PostMapping
    public ResponseEntity<MessageResponse> saveSettings(@RequestBody GameSettingsModel settingsModel) throws ValidationException {
        return ResponseEntity.ok().body(new MessageResponse(settingsService.save(settingsModel)));
    }
}