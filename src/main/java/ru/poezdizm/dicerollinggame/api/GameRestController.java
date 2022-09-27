package ru.poezdizm.dicerollinggame.api;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.poezdizm.dicerollinggame.model.GameSimplifiedModel;
import ru.poezdizm.dicerollinggame.service.GameService;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/game")
@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
public class GameRestController {

    private final GameService gameService;

    @GetMapping("/all")
    public List<GameSimplifiedModel> getGames(Principal principal) {
        return gameService.getGamesByCurrentUser(principal.getName());
    }
}