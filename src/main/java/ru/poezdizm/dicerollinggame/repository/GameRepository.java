package ru.poezdizm.dicerollinggame.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.poezdizm.dicerollinggame.entity.GameEntity;

import java.util.List;
import java.util.Optional;

@Repository
public interface GameRepository extends JpaRepository<GameEntity, Long> {

    List<GameEntity> findAllByGamePlayers_Player_Username(String username);

    Optional<GameEntity> findByIdAndGamePlayers_Player_Username(Long id, String username);

}
