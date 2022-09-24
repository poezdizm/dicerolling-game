package ru.poezdizm.dicerollinggame.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.poezdizm.dicerollinggame.model.CellModel;
import ru.poezdizm.dicerollinggame.model.response.MessageResponse;
import ru.poezdizm.dicerollinggame.service.CellService;

import java.util.List;

@RestController
@RequestMapping("/cells")
@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
public class CellRestController {

    private final CellService cellService;

    @GetMapping
    public List<CellModel> getRolls() {
        return cellService.getAllCells();
    }

    @GetMapping("/{id}")
    public CellModel geCellById(@PathVariable Long id) {
        return cellService.getCellById(id);
    }

    @PostMapping
    public ResponseEntity<CellModel> saveCell(@RequestBody CellModel cellModel) {
        return ResponseEntity.ok().body(cellService.save(cellModel));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteCell(@PathVariable Long id) {
        cellService.deleteById(id);
        return ResponseEntity.ok().body(new MessageResponse("Cell was deleted"));
    }
}