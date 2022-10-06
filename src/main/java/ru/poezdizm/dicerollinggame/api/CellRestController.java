package ru.poezdizm.dicerollinggame.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.poezdizm.dicerollinggame.exception.ValidationException;
import ru.poezdizm.dicerollinggame.model.CellModel;
import ru.poezdizm.dicerollinggame.model.CellPackModel;
import ru.poezdizm.dicerollinggame.model.CellTypeModel;
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
    public List<CellModel> getCells(@RequestParam("pack") Integer packId) {
        return cellService.getAllCells(packId);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getCellCount(@RequestParam("pack") Integer packId) {
        return ResponseEntity.ok().body(cellService.countCells(packId));
    }

    @GetMapping("/types")
    public List<CellTypeModel> getCellTypes() {
        return cellService.getAllCellTypes();
    }

    @GetMapping("/packs")
    public List<CellPackModel> getCellPacks() {
        return cellService.getAllCellPacks();
    }

    @GetMapping("/{id}")
    public CellModel geCellById(@PathVariable Long id) {
        return cellService.getCellById(id);
    }

    @PostMapping
    public ResponseEntity<CellModel> saveCell(@RequestBody CellModel cellModel) throws ValidationException {
        return ResponseEntity.ok().body(cellService.save(cellModel));
    }

    @PostMapping("/packs")
    public ResponseEntity<CellPackModel> savePack(@RequestBody CellPackModel pack) {
        return ResponseEntity.ok().body(cellService.savePack(pack));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteCell(@PathVariable Long id) {
        cellService.deleteById(id);
        return ResponseEntity.ok().body(new MessageResponse("Cell was deleted"));
    }
}