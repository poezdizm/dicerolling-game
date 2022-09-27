package ru.poezdizm.dicerollinggame.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="game")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class GameEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "settings_id")
    private GameSettingsEntity gameSettings;

    @OneToMany(mappedBy = "game", cascade=CascadeType.ALL)
    private List<GameBoardEntity> gameBoards;

    @OneToMany(mappedBy = "game", cascade=CascadeType.ALL)
    private List<GameToPlayerEntity> gamePlayers;

}
