package com.juanimar.ludotecta.demo.game.service;

import com.juanimar.ludotecta.demo.author.service.AuthorService;
import com.juanimar.ludotecta.demo.category.service.CategoryService;
import com.juanimar.ludotecta.demo.common.criteria.SearchCriteria;
import com.juanimar.ludotecta.demo.game.GameSpecification;
import com.juanimar.ludotecta.demo.game.model.Game;
import com.juanimar.ludotecta.demo.game.model.GameDTO;
import com.juanimar.ludotecta.demo.game.repository.GameRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameServiceImpl implements GameService {

    @Autowired
    GameRepository gameRepository;
    @Autowired
    AuthorService authorService;
    @Autowired
    CategoryService categoryService;

    @Override
    public List<Game> getGames(String title, Long idCategory) {

        Specification<Game> spec = Specification
                .where(
                        new GameSpecification(
                                new SearchCriteria("title", ":", title)
                        ))
                .and(
                        new GameSpecification(
                                new SearchCriteria("category.id", ":", idCategory)
                        ));

        return gameRepository.findAll(spec);
    }

    @Override
    public Game getGameById(long id) {
        return gameRepository.findById(id).orElse(null);
    }

    @Override
    public void saveGame(Long id, GameDTO gameDTO) {
        Game game = id == null ? new Game() : getGameById(id);
        BeanUtils.copyProperties(gameDTO, game, "id", "category", "author");
        game.setCategory(categoryService.getCategoryById(gameDTO.getCategory().getId()));
        game.setAuthor(authorService.getAuthorById(gameDTO.getAuthor().getId()));
        gameRepository.save(game);
    }
}
