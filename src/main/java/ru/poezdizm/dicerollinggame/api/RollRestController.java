package ru.poezdizm.dicerollinggame.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.poezdizm.dicerollinggame.entity.RollHistory;
import ru.poezdizm.dicerollinggame.repository.RollHistoryRepository;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/rolls")
@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
public class RollRestController {

    private final RollHistoryRepository rollHistoryRepository;

    @GetMapping
    public List<RollHistory> getRolls() {
        return rollHistoryRepository.findAll();
    }

    @GetMapping("/{id}")
    public RollHistory getRollHistoryById(@PathVariable Long id) {
        return rollHistoryRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity<RollHistory> createRollHistory(@RequestBody RollHistory rollHistory) throws URISyntaxException {
        RollHistory savedRoll = rollHistoryRepository.save(rollHistory);
        return ResponseEntity.created(new URI("/rolls/" + savedRoll.getId())).body(savedRoll);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RollHistory> updateRollHistory(@PathVariable Long id, @RequestBody RollHistory rollHistory) {
        RollHistory currentRollHistory = rollHistoryRepository.findById(id).orElseThrow(RuntimeException::new);
        currentRollHistory.setUsername(rollHistory.getUsername());
        currentRollHistory.setRollValue(rollHistory.getRollValue());
        currentRollHistory = rollHistoryRepository.save(rollHistory);

        return ResponseEntity.ok(currentRollHistory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteRollHistory(@PathVariable Long id) {
        rollHistoryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}