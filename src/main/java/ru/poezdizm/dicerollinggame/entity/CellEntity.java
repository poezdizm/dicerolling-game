package ru.poezdizm.dicerollinggame.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name="cell")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CellEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    @Column(name = "created_at")
    private Timestamp timeOfCreation;

    @ManyToOne
    private CellTypeEntity type;
}
