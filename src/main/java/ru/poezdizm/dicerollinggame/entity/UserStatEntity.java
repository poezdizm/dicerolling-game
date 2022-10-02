package ru.poezdizm.dicerollinggame.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="user_stat")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserStatEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "total_rolls")
    private Long totalRolls;
    @Column(name = "games_won")
    private Integer gamesWon;
    @Column(name = "gray_cells")
    private Long grayCells;

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;
}
