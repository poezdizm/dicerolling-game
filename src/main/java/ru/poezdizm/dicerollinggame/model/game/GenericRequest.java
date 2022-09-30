package ru.poezdizm.dicerollinggame.model.game;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class GenericRequest {

    private Long gameId;
    private Integer value;
}
