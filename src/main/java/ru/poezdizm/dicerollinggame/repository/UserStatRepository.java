package ru.poezdizm.dicerollinggame.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.poezdizm.dicerollinggame.entity.UserStatEntity;

import java.util.Optional;

@Repository
public interface UserStatRepository extends JpaRepository<UserStatEntity, Integer> {

    Optional<UserStatEntity> findByUser_Username(String username);

}
