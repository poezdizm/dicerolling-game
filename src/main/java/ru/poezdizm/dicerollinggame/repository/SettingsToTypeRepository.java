package ru.poezdizm.dicerollinggame.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.poezdizm.dicerollinggame.entity.game.GameSettingsEntity;
import ru.poezdizm.dicerollinggame.entity.game.SettingsToTypeEntity;

import java.util.List;

@Repository
public interface SettingsToTypeRepository extends JpaRepository<SettingsToTypeEntity, Long> {

    List<SettingsToTypeEntity> findAllBySettings(GameSettingsEntity entity);
}
