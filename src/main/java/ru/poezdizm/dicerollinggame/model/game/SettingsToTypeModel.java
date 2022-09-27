package ru.poezdizm.dicerollinggame.model.game;

import lombok.*;
import ru.poezdizm.dicerollinggame.model.CellTypeModel;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class SettingsToTypeModel {

    private Integer value;
    private CellTypeModel type;
}
