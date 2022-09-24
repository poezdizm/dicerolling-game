package ru.poezdizm.dicerollinggame.entity;

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

    private String username;
    @Column(name = "roll_value")
    private int rollValue;
}