package ru.poezdizm.dicerollinggame.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="board")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class GameBoardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private GameEntity game;

    @OneToOne
    @JoinColumn(name = "player_id")
    private UserEntity player;

    @OneToMany(mappedBy = "board", cascade=CascadeType.ALL)
    private List<GameCellEntity> gameCells;
}
