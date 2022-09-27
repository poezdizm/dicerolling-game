package ru.poezdizm.dicerollinggame.model.game;

import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class GameModel {

    private Long id;
    private String title;
    private List<GameCellModel> cells;
    private List<PlayerModel> players;
    private Boolean isStarted;
    private Integer playersMax;
}
