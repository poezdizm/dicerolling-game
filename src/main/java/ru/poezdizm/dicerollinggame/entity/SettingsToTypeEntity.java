package ru.poezdizm.dicerollinggame.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

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
