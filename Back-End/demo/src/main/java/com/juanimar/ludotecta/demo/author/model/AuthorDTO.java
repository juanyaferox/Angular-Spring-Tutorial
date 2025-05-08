package com.juanimar.ludotecta.demo.author.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AuthorDTO {
    Long id;
    String name;
    String nationality;
}
