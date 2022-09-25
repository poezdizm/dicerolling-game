package ru.poezdizm.dicerollinggame.model;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class SettingsToTypeModel {

    private Integer value;
    private CellTypeModel type;
}
