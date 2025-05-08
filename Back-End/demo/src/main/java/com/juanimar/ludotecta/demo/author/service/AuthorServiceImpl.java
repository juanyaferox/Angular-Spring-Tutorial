package com.juanimar.ludotecta.demo.author.service;

import com.juanimar.ludotecta.demo.author.model.Author;
import com.juanimar.ludotecta.demo.author.model.AuthorDTO;
import com.juanimar.ludotecta.demo.author.model.AuthorSearchDTO;
import com.juanimar.ludotecta.demo.author.repository.AuthorRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
public class AuthorServiceImpl implements AuthorService {

    @Autowired
    AuthorRepository authorRepository;

    @Override
    public Page<Author> getAuthorsPage(AuthorSearchDTO authorSearchDTO) {
        return authorRepository.findAll(authorSearchDTO.getPageable().getPageable());
    }

    @Override
    public Author getAuthorById(long id) {
        return authorRepository.findById(id).orElse(null);
    }

    @Override
    public void saveAuthor(Long id, AuthorDTO authorDTO) throws NoSuchElementException {
        Author author = id == null ? new Author() : getAuthorById(id);
        BeanUtils.copyProperties(authorDTO, author, "id");
        authorRepository.save(author);
    }

    @Override
    public void deleteAuthor(long id) throws Exception {
        if (!authorRepository.existsById(id))
            throw new Exception();
        authorRepository.deleteById(id);
    }

    @Override
    public List<Author> getAllAuthors() {
        return authorRepository.findAll();
    }
}
