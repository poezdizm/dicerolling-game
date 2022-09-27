package ru.poezdizm.dicerollinggame.model.game;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class GameCellModel {

    private Long id;
    private Integer position;
    private Boolean isGray;
    private Boolean isShared;
    private String color;
    private String content;
    private Boolean isAvailable;
}
