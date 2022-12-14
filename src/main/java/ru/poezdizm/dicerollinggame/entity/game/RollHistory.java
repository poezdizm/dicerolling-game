package ru.poezdizm.dicerollinggame.entity.game;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "roll_history")
@RequiredArgsConstructor
@Getter
@Setter
public class RollHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "roll_value")
    private int rollValue;

    @OneToOne
    @JoinColumn(name = "game_to_player_id")
    private GameToPlayerEntity playerAndGame;
}
