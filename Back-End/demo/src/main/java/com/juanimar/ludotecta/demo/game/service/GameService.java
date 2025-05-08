package com.juanimar.ludotecta.demo.game.service;

import com.juanimar.ludotecta.demo.game.model.Game;
import com.juanimar.ludotecta.demo.game.model.GameDTO;

import java.util.List;

public interface GameService {
    List<Game> getGames(String title, Long idCategory);

    void saveGame(Long id, GameDTO gameDTO);
}
