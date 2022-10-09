package ru.poezdizm.dicerollinggame.api;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.poezdizm.dicerollinggame.model.UserStatModel;
import ru.poezdizm.dicerollinggame.service.UserStatsService;

import java.security.Principal;

@RestController
@RequestMapping("/main")
@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
public class MainRestController {

    private final UserStatsService statsService;

    @GetMapping("/health")
    public String healthCheck() {
        return "healthy";
    }

    @GetMapping("/stats")
    public UserStatModel getStats(Principal principal) {
        return statsService.getStats(principal.getName());
    }

}