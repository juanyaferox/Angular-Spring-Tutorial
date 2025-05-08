package com.juanimar.ludotecta.demo.game.repository;

import com.juanimar.ludotecta.demo.game.model.Game;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

import java.util.List;

public interface GameRepository extends JpaRepositoryImplementation<Game, Long> {
    
    @Override
    @EntityGraph(attributePaths = {"category", "author"})
    List<Game> findAll(Specification<Game> spec);
}
