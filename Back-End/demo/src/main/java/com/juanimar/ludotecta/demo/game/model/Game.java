package com.juanimar.ludotecta.demo.game.model;

import com.juanimar.ludotecta.demo.author.model.Author;
import com.juanimar.ludotecta.demo.category.model.Category;
import com.juanimar.ludotecta.demo.loan.model.Loan;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String title;
    String age;

    @ManyToOne
    @JoinColumn(name = "AUTHOR_ID")
    Author author;

    @ManyToOne
    @JoinColumn(name = "CATEGORY_ID")
    Category category;

    @OneToMany(mappedBy = "game", cascade = CascadeType.REMOVE)
    List<Loan> loans;
}
