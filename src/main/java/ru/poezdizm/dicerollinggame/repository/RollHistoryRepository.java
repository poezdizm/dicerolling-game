package ru.poezdizm.dicerollinggame.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.poezdizm.dicerollinggame.entity.RollHistory;

public interface RollHistoryRepository extends JpaRepository<RollHistory, Long> {
}
