package ru.poezdizm.dicerollinggame.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.poezdizm.dicerollinggame.entity.CellEntity;
import ru.poezdizm.dicerollinggame.entity.CellTypeEntity;
import ru.poezdizm.dicerollinggame.exception.ValidationException;
import ru.poezdizm.dicerollinggame.model.CellModel;
import ru.poezdizm.dicerollinggame.model.CellTypeModel;
import ru.poezdizm.dicerollinggame.repository.CellRepository;
import ru.poezdizm.dicerollinggame.repository.CellTypeRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CellService {

    private final CellRepository cellRepository;
    private final CellTypeRepository cellTypeRepository;

    private static final String DEFAULT_LABEL = "Default";

    public List<CellModel> getAllCells() {
        return cellRepository.findAll().stream().map(CellService::mapCell).toList();
    }

    public List<CellTypeModel> getAllCellTypes() {
        return cellTypeRepository.findAll().stream().map(CellService::mapType).toList();
    }

    public CellModel getCellById(Long id) {
        return mapCell(findCellEntity(id));
    }

    private CellEntity findCellEntity(Long id) {
        if (id == null) return new CellEntity();
        return cellRepository.findById(id).orElse(new CellEntity());
    }

    private CellTypeEntity findCellTypeEntity(CellTypeModel model) {
        if (model == null || model.getId() == null) return cellTypeRepository.getByLabel(DEFAULT_LABEL);
        return cellTypeRepository.findById(model.getId()).orElse(cellTypeRepository.getByLabel(DEFAULT_LABEL));
    }

    public CellModel save(CellModel model) throws ValidationException {
        validate(model);
        CellEntity entity = findCellEntity(model.getId());
        CellTypeEntity typeEntity = findCellTypeEntity(model.getType());

        entity.setContent(model.getContent());
        entity.setType(typeEntity);

        return mapCell(cellRepository.save(entity));
    }

    private void validate(CellModel model) throws ValidationException {
        if (model.getType() == null || model.getType().getId() == null || model.getType().getId() == 0) {
            throw new ValidationException("Cell is invalid");
        }
        if (model.getContent() == null || model.getContent().isBlank()) {
            throw new ValidationException("Cell content should not be empty");
        }
        if (cellRepository.findByContent(model.getContent()).isPresent()) {
            throw new ValidationException("Cell with same content already exists");
        }
    }

    public void deleteById(Long id) {
        cellRepository.deleteById(id);
    }

    private static CellModel mapCell(CellEntity entity) {
        return CellModel.builder()
                .id(entity.getId()).content(entity.getContent()).type(mapType(entity.getType()))
                .build();
    }

    private static CellTypeModel mapType(CellTypeEntity entity) {
        return CellTypeModel.builder()
                .id(entity.getId()).label(entity.getLabel()).color(entity.getColor())
                .build();
    }

}
