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
    @JoinColumn(name = "type_id")
    private CellTypeEntity type;

    @ManyToOne
    @JoinColumn(name = "pack_id")
    private CellPackEntity pack;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CellEntity that = (CellEntity) o;

        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }
}
