package com.juanimar.ludotecta.demo.author.controller;

import com.juanimar.ludotecta.demo.author.model.AuthorDTO;
import com.juanimar.ludotecta.demo.author.model.AuthorSearchDTO;
import com.juanimar.ludotecta.demo.author.service.AuthorService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "author", description = "API for Author")
@RestController
@RequestMapping("/author")
@CrossOrigin(origins = "*")
public class AuthorController {

    @Autowired
    AuthorService authorService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping
    public List<AuthorDTO> getAllAuthors() {
        return authorService.getAllAuthors().stream().map(author ->
                modelMapper.map(author, AuthorDTO.class)
        ).toList();
    }

    @PostMapping
    public Page<AuthorDTO> getAuthorsPage(@RequestBody AuthorSearchDTO authorSearchDTO) {
        return authorService.getAuthorsPage(authorSearchDTO).map(
                author -> modelMapper.map(author, AuthorDTO.class)
        );
    }

    @PutMapping({"", "/{id}"})
    public void saveAuthors(@PathVariable(required = false) Long id, @RequestBody AuthorDTO authorDTO) {
        authorService.saveAuthor(id, authorDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteAuthor(@PathVariable long id) throws Exception {
        authorService.deleteAuthor(id);
    }
}
