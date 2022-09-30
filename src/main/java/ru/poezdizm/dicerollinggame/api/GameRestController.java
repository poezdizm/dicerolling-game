package ru.poezdizm.dicerollinggame.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.poezdizm.dicerollinggame.model.game.GameModel;
import ru.poezdizm.dicerollinggame.model.game.GameSimplifiedModel;
import ru.poezdizm.dicerollinggame.model.game.GenericRequest;
import ru.poezdizm.dicerollinggame.model.response.MessageResponse;
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

    @GetMapping
    public ResponseEntity<GameModel> getGame(@RequestParam("id") Long gameId, Principal principal) {
        return ResponseEntity.ok().body(gameService.getGame(gameId, principal.getName()));
    }

    @DeleteMapping
    public ResponseEntity<MessageResponse> deleteGame(@RequestParam("id") Long gameId, Principal principal) {
        try {
            gameService.deleteGameAndSettings(gameId, principal.getName());
            return ResponseEntity.ok().body(new MessageResponse("Game was deleted successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/roll")
    public ResponseEntity<MessageResponse> saveRoll(@RequestBody GenericRequest request, Principal principal) {
        gameService.saveRoll(request, principal.getName());
        return ResponseEntity.ok().body(new MessageResponse("Roll was saved successfully"));
    }

    @PostMapping("/position")
    public ResponseEntity<GameModel> savePosition(@RequestBody GenericRequest request, Principal principal) {
        gameService.savePosition(request, principal.getName());
        return ResponseEntity.ok().body(gameService.getGame(request.getGameId(), principal.getName()));
    }
}