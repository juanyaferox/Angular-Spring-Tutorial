package com.juanimar.ludotecta.demo.author.service;

import com.juanimar.ludotecta.demo.author.model.Author;
import com.juanimar.ludotecta.demo.author.model.AuthorDTO;
import com.juanimar.ludotecta.demo.author.model.AuthorSearchDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface AuthorService {
    Page<Author> getAuthorsPage(AuthorSearchDTO authorSearchDTO);

    Author getAuthorById(long id);

    void saveAuthor(Long id, AuthorDTO authorDTO);

    void deleteAuthor(long idAuthor) throws Exception;

    List<Author> getAllAuthors();
}
