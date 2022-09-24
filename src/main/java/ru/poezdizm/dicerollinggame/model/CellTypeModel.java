package ru.poezdizm.dicerollinggame.model;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class CellTypeModel {

    private Integer id;
    private String label;
    private String color;
}
