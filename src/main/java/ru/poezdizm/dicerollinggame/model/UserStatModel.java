package ru.poezdizm.dicerollinggame.model;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class UserStatModel {

    private String username;
    private Long totalRolls;
    private Integer gamesWon;
    private Long grayCells;
}
