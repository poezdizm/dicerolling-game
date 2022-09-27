package ru.poezdizm.dicerollinggame.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name="game_settings")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class GameSettingsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private Long seed;
    @Column(name = "max_cell_number")
    private Integer maxCellNumber;
    @Column(name = "shared")
    private Boolean isShared;
    @Column(name = "gray_zone_number")
    private Integer grayZoneNumber;
    @Column(name = "shared_cell")
    private Boolean hasSharedCell;
    @Column(name = "players_number")
    private Integer playersNumber;

    @ManyToOne
    @JoinColumn(name="owner_id", nullable=false)
    private UserEntity owner;

    @Column(name = "created_at")
    private Timestamp timeOfCreation;

    @OneToMany(mappedBy = "settings", cascade=CascadeType.ALL)
    private List<SettingsToTypeEntity> typeValues;
}
