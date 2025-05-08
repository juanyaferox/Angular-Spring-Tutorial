package com.juanimar.ludotecta.demo.game.model;

import com.juanimar.ludotecta.demo.author.model.AuthorDTO;
import com.juanimar.ludotecta.demo.category.model.CategoryDTO;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GameDTO {
    Long id;
    String title;
    String age;
    CategoryDTO category;
    AuthorDTO author;
}
