package com.juanimar.ludotecta.demo.game.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.juanimar.ludotecta.demo.author.model.AuthorDTO;
import com.juanimar.ludotecta.demo.category.model.CategoryDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameDTO {
    Long id;
    String title;
    String age;
    @JsonIgnore
    CategoryDTO category;
    @JsonIgnore
    AuthorDTO author;
}
