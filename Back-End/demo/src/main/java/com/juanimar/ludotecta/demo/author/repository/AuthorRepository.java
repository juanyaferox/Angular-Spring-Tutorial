package com.juanimar.ludotecta.demo.author.repository;

import com.juanimar.ludotecta.demo.author.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorRepository extends JpaRepository<Author, Long> {
}
