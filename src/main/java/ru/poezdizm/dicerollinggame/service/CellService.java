package ru.poezdizm.dicerollinggame.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.poezdizm.dicerollinggame.entity.CellEntity;
import ru.poezdizm.dicerollinggame.entity.CellPackEntity;
import ru.poezdizm.dicerollinggame.entity.CellTypeEntity;
import ru.poezdizm.dicerollinggame.entity.game.SettingsToTypeEntity;
import ru.poezdizm.dicerollinggame.exception.ValidationException;
import ru.poezdizm.dicerollinggame.model.CellModel;
import ru.poezdizm.dicerollinggame.model.CellPackModel;
import ru.poezdizm.dicerollinggame.model.CellTypeModel;
import ru.poezdizm.dicerollinggame.repository.CellPackRepository;
import ru.poezdizm.dicerollinggame.repository.CellRepository;
import ru.poezdizm.dicerollinggame.repository.CellTypeRepository;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class CellService {

    private final CellRepository cellRepository;
    private final CellTypeRepository cellTypeRepository;
    private final CellPackRepository cellPackRepository;

    private static final String DEFAULT_LABEL = "Default";

    private static final Integer DEFAULT_PACK_ID = 1;

    public List<CellModel> getAllCells(Integer packId) {
        if (packId == null) {
            return cellRepository.findAllByOrderByTimeOfCreationDesc().stream().map(CellService::mapCell).toList();
        }
        return cellRepository.findAllByPack_IdOrderByTimeOfCreationDesc(packId).stream().map(CellService::mapCell).toList();
    }

    public List<CellTypeModel> getAllCellTypes() {
        return cellTypeRepository.findAll().stream().map(CellService::mapType).toList();
    }

    public List<CellPackModel> getAllCellPacks() {
        return cellPackRepository.findAll().stream().map(CellService::mapPack).toList();
    }

    public long countCells() {
        return cellRepository.count();
    }

    public long countCellsByTypeId(Integer typeId) {
        return cellRepository.countAllByType_Id(typeId);
    }

    public CellModel getCellById(Long id) {
        return mapCell(findCellEntity(id));
    }

    private CellEntity findCellEntity(Long id) {
        if (id == null) return new CellEntity();
        return cellRepository.findById(id).orElse(new CellEntity());
    }

    public CellTypeEntity findCellTypeEntity(CellTypeModel model) {
        if (model == null || model.getId() == null) return cellTypeRepository.getByLabel(DEFAULT_LABEL);
        return cellTypeRepository.findById(model.getId()).orElse(cellTypeRepository.getByLabel(DEFAULT_LABEL));
    }

    public CellPackEntity findCellPackEntity(Integer packId) {
        if (packId == null) return cellPackRepository.getById(DEFAULT_PACK_ID);
        return cellPackRepository.findById(packId).orElse(cellPackRepository.getById(DEFAULT_PACK_ID));
    }

    public CellModel save(CellModel model) throws ValidationException {
        validate(model);
        CellEntity entity = findCellEntity(model.getId());
        CellTypeEntity typeEntity = findCellTypeEntity(model.getType());
        CellPackEntity packEntity = findCellPackEntity(model.getPackId());

        if (entity.getTimeOfCreation() == null) {
            entity.setTimeOfCreation(Timestamp.from(Instant.now()));
        }
        entity.setContent(model.getContent());
        entity.setType(typeEntity);
        entity.setPack(packEntity);

        return mapCell(cellRepository.save(entity));
    }

    public CellPackModel savePack(CellPackModel model) throws ValidationException {
        validatePack(model);
        CellPackEntity entity = new CellPackEntity();

        entity.setTitle(model.getTitle());

        return mapPack(cellPackRepository.save(entity));
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

    private void validatePack(CellPackModel model) throws ValidationException {
        if (model.getTitle() == null || model.getTitle().isBlank()) {
            throw new ValidationException("Pack name should not be empty");
        }
        if (cellPackRepository.findByTitle(model.getTitle()).isPresent()) {
            throw new ValidationException("Pack with same name already exists");
        }
    }

    public void deleteById(Long id) {
        cellRepository.deleteById(id);
    }

    private static CellModel mapCell(CellEntity entity) {
        return CellModel.builder()
                .id(entity.getId()).content(entity.getContent()).type(mapType(entity.getType()))
                .packId(entity.getPack().getId()).build();
    }

    private static CellTypeModel mapType(CellTypeEntity entity) {
        return CellTypeModel.builder()
                .id(entity.getId()).label(entity.getLabel()).color(entity.getColor())
                .build();
    }

    private static CellPackModel mapPack(CellPackEntity entity) {
        return CellPackModel.builder()
                .id(entity.getId()).title(entity.getTitle())
                .build();
    }

    public ArrayList<CellEntity> getRandomCellList(Random random, List<SettingsToTypeEntity> typeValues, Integer packId) {
        ArrayList<CellEntity> randomCells = new ArrayList<>();

        for (SettingsToTypeEntity typeValue: typeValues) {
            List<CellEntity> allCells = cellRepository.findAllByType_IdAndPack_Id(typeValue.getType().getId(), packId);
            Long count = countCellsByTypeId(typeValue.getType().getId());
            int numberOfElements = typeValue.getValue() > count ? count.intValue() : typeValue.getValue();

            for (int i = 0; i < numberOfElements; i++) {
                int randomIndex = random.nextInt(count.intValue());
                CellEntity randomCell = allCells.get(randomIndex);
                randomCells.add(randomCell);
                allCells.remove(randomCell);
                count--;
            }
        }
        Collections.shuffle(randomCells);

        return randomCells;
    }

}
