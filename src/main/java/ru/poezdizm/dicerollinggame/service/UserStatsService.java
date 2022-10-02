package ru.poezdizm.dicerollinggame.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.poezdizm.dicerollinggame.entity.UserEntity;
import ru.poezdizm.dicerollinggame.entity.UserStatEntity;
import ru.poezdizm.dicerollinggame.model.UserStatModel;
import ru.poezdizm.dicerollinggame.repository.UserStatRepository;

@Service
@RequiredArgsConstructor
public class UserStatsService {

    private final UserStatRepository statRepository;

    private UserStatEntity getStatsEntity(String username) throws IllegalArgumentException {
        return statRepository.findByUser_Username(username)
                .orElseThrow(() -> new IllegalArgumentException("User stats were not found"));
    }

    public UserStatModel getStats(String username) throws IllegalArgumentException {
        return mapStats(getStatsEntity(username));
    }

    public void createStats(UserEntity user) {
        UserStatEntity stats = new UserStatEntity();
        stats.setUser(user);
        stats.setGamesWon(0);
        stats.setTotalRolls(0L);
        stats.setGrayCells(0L);

        statRepository.save(stats);
    }

    public void addRoll(String username) throws IllegalArgumentException {
        UserStatEntity stats = getStatsEntity(username);
        stats.setTotalRolls(stats.getTotalRolls() + 1);
        statRepository.save(stats);
    }

    public void addGamesWon(String username) throws IllegalArgumentException {
        UserStatEntity stats = getStatsEntity(username);
        stats.setGamesWon(stats.getGamesWon() + 1);
        statRepository.save(stats);
    }

    public void addGrayCells(String username) throws IllegalArgumentException {
        UserStatEntity stats = getStatsEntity(username);
        stats.setGrayCells(stats.getGrayCells() + 1);
        statRepository.save(stats);
    }

    private static UserStatModel mapStats(UserStatEntity entity) {
        return UserStatModel.builder().username(entity.getUser().getUsername()).gamesWon(entity.getGamesWon())
                .totalRolls(entity.getTotalRolls()).grayCells(entity.getGrayCells()).build();
    }

}
