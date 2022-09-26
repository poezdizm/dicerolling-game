package ru.poezdizm.dicerollinggame.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.poezdizm.dicerollinggame.entity.*;
import ru.poezdizm.dicerollinggame.exception.ValidationException;
import ru.poezdizm.dicerollinggame.model.GameSettingsModel;
import ru.poezdizm.dicerollinggame.model.SettingsToTypeModel;
import ru.poezdizm.dicerollinggame.repository.*;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GameSettingsService {

    private final GameSettingsRepository settingsRepository;
    private final UserRepository userRepository;
    private final CellService cellService;
    private final SettingsToTypeRepository settingsToTypeRepository;

    public String save(GameSettingsModel model) throws ValidationException {
        UserEntity owner = validateAndGetUser(model);
        GameSettingsEntity entity = new GameSettingsEntity();

        if (entity.getTimeOfCreation() == null) {
            entity.setTimeOfCreation(Timestamp.from(Instant.now()));
        }
        entity.setTitle(model.getTitle());
        entity.setMaxCellNumber(model.getMaxCellNumber());
        entity.setIsShared(model.getIsShared());
        entity.setGrayZoneNumber(model.getGrayZoneNumber());
        entity.setHasSharedCell(model.getHasSharedCell());
        entity.setPlayersNumber(model.getPlayersNumber());
        entity.setOwner(owner);

        GameSettingsEntity newEntity = settingsRepository.save(entity);

        for (SettingsToTypeModel sttModel : model.getTypeValues()) {
            saveSettingsToType(sttModel, newEntity);
        }

        return "Game settings saved successfully";
    }

    private UserEntity validateAndGetUser(GameSettingsModel model) throws ValidationException {
        if (model.getTitle() == null || model.getTitle().isBlank()) {
            throw new ValidationException("Title cannot be empty");
        }
        Integer maxCellNumber = model.getMaxCellNumber();
        long poolMax = cellService.countCells();
        if (maxCellNumber > poolMax) {
            throw new ValidationException("Max cell number (" + maxCellNumber + ") cannot be greater than " +
                    "number of cells in pool (" + poolMax + ")");
        }
        Integer sttNumber = model.getTypeValues().stream().map(SettingsToTypeModel::getValue).reduce(Integer::sum).orElse(0);
        if (!Objects.equals(maxCellNumber, sttNumber)) {
            throw new ValidationException("Cell types number sum (" + sttNumber + ") cannot be greater than " +
                    "max cell number (" + maxCellNumber + ")");
        }

        return userRepository.findByUsername(model.getOwner().getUsername())
                .orElseThrow(() -> new ValidationException("User was not found"));
    }

    private void saveSettingsToType(SettingsToTypeModel model, GameSettingsEntity settings) {
        SettingsToTypeEntity entity = new SettingsToTypeEntity();

        entity.setValue(model.getValue());
        entity.setSettings(settings);
        entity.setType(cellService.findCellTypeEntity(model.getType()));

        settingsToTypeRepository.save(entity);
    }

    public void deleteById(Long id) {
        Optional<GameSettingsEntity> optional = settingsRepository.findById(id);
        if (optional.isPresent()) {
            for (SettingsToTypeEntity sttEntities : settingsToTypeRepository.findAllBySettings(optional.get())) {
                settingsToTypeRepository.deleteById(sttEntities.getId());
            }
            settingsRepository.deleteById(id);
        }
    }

}
