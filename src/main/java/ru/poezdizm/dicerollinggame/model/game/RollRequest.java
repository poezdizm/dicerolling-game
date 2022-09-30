package ru.poezdizm.dicerollinggame.model.game;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class RollRequest {

    private Long gameId;
    private Integer value;
}
