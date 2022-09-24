package ru.poezdizm.dicerollinggame.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.poezdizm.dicerollinggame.entity.CellTypeEntity;

@Repository
public interface CellTypeRepository extends JpaRepository<CellTypeEntity, Integer> {

    CellTypeEntity getByLabel(String label);
}
