package ru.poezdizm.dicerollinggame.entity.game;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.poezdizm.dicerollinggame.entity.CellTypeEntity;

import javax.persistence.*;

@Entity
@Table(name="settings_to_type")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SettingsToTypeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer value;

    @ManyToOne
    @JoinColumn(name = "settings_id", nullable = false)
    private GameSettingsEntity settings;

    @OneToOne
    @JoinColumn(name = "type_id", nullable = false)
    private CellTypeEntity type;


}
