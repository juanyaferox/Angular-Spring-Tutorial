package com.juanimar.ludotecta.demo.author.model;

import com.juanimar.ludotecta.demo.game.model.Game;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "author")
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String name;
    String nationality;

    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "author")
    List<Game> games;
}
