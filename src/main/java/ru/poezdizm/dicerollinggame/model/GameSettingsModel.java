package ru.poezdizm.dicerollinggame.model;

import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class GameSettingsModel {

    private String title;
    private Integer maxCellNumber;
    private Boolean isShared;
    private Integer grayZoneNumber;
    private Boolean hasSharedCell;
    private Integer playersNumber;
    private UserModel owner;
    private List<SettingsToTypeModel> typeValues;
}
