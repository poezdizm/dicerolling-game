package ru.poezdizm.dicerollinggame.entity.game;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.poezdizm.dicerollinggame.entity.UserEntity;

import javax.persistence.*;

@Entity
@Table(name="game_to_player")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class GameToPlayerEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "position_num")
    private Integer position;
    @Column(name = "landed")
    private Boolean isLanded;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private GameEntity game;

    @ManyToOne
    @JoinColumn(name = "player_id")
    private UserEntity player;

    @OneToOne(mappedBy = "playerAndGame", cascade=CascadeType.ALL)
    private RollHistory lastRoll;
}
