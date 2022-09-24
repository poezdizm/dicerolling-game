package ru.poezdizm.dicerollinggame.model;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class CellModel {

    private Long id;
    private String content;
    private CellTypeModel type;
}
