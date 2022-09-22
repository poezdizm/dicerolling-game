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
        RollHistory savedClient = rollHistoryRepository.save(rollHistory);
        return ResponseEntity.created(new URI("/rolls/" + savedClient.getId())).body(savedClient);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RollHistory> updateRollHistory(@PathVariable Long id, @RequestBody RollHistory rollHistory) {
        RollHistory currentClient = rollHistoryRepository.findById(id).orElseThrow(RuntimeException::new);
        currentClient.setUsername(rollHistory.getUsername());
        currentClient.setRollValue(rollHistory.getRollValue());
        currentClient = rollHistoryRepository.save(rollHistory);

        return ResponseEntity.ok(currentClient);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteRollHistory(@PathVariable Long id) {
        rollHistoryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}