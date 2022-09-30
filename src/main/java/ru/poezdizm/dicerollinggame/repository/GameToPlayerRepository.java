package ru.poezdizm.dicerollinggame.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.poezdizm.dicerollinggame.entity.game.GameToPlayerEntity;

@Repository
public interface GameToPlayerRepository extends JpaRepository<GameToPlayerEntity, Long> {

}
