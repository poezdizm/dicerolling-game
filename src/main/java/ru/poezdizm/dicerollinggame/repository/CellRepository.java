package ru.poezdizm.dicerollinggame.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.poezdizm.dicerollinggame.entity.CellEntity;

import java.util.List;
import java.util.Optional;

@Repository
public interface CellRepository extends JpaRepository<CellEntity, Long> {

    List<CellEntity> findAllByOrderByTimeOfCreationDesc();

    List<CellEntity> findAllByPack_IdOrderByTimeOfCreationDesc(Integer packId);

    Optional<CellEntity> findByContent(String content);

    List<CellEntity> findAllByType_IdAndPack_Id(Integer typeId, Integer packId);

    Long countAllByType_IdAndPack_Id(Integer typeId, Integer packId);

    Long countAllByPack_Id(Integer packId);

}
