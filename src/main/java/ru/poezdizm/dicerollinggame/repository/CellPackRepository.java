package ru.poezdizm.dicerollinggame.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.poezdizm.dicerollinggame.entity.CellPackEntity;

import java.util.Optional;

@Repository
public interface CellPackRepository extends JpaRepository<CellPackEntity, Integer> {

    Optional<CellPackEntity> findByTitle(String title);
}
