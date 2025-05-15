package com.juanimar.ludotecta.demo.category.model;

import com.juanimar.ludotecta.demo.game.model.Game;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    Long id;

    @Column(name = "name", nullable = false)
    String name;

    @OneToMany(mappedBy = "category", cascade = CascadeType.REMOVE)
    List<Game> games;
}
