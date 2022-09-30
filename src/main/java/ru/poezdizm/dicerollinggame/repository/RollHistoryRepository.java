package ru.poezdizm.dicerollinggame.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.poezdizm.dicerollinggame.entity.game.RollHistory;

@Repository
public interface RollHistoryRepository extends JpaRepository<RollHistory, Long> {

}
