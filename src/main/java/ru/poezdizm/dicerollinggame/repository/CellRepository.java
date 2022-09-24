package ru.poezdizm.dicerollinggame.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.poezdizm.dicerollinggame.entity.CellEntity;

@Repository
public interface CellRepository extends JpaRepository<CellEntity, Long> {

}
