package ru.poezdizm.dicerollinggame.entity.game;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.poezdizm.dicerollinggame.entity.CellEntity;

import javax.persistence.*;

@Entity
@Table(name="game_cell")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class GameCellEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "position_num")
    private Integer position;
    @Column(name = "gray")
    private Boolean isGray;
    @Column(name = "shared")
    private Boolean isShared;

    @ManyToOne
    @JoinColumn(name = "board_id")
    private GameBoardEntity board;

    @OneToOne
    @JoinColumn(name = "cell_id")
    private CellEntity cell;
}
