package ru.poezdizm.dicerollinggame.model.game;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class PlayerModel {

    private Long id;
    private String username;
    private Integer position;
    private Integer lastRollValue;
    private Boolean landed;
}
