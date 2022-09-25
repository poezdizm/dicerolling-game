package ru.poezdizm.dicerollinggame.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.poezdizm.dicerollinggame.entity.CellEntity;

import java.util.List;
import java.util.Optional;

@Repository
public interface CellRepository extends JpaRepository<CellEntity, Long> {

    List<CellEntity> findAllByOrderByTimeOfCreationDesc();
    Optional<CellEntity> findByContent(String content);

}
