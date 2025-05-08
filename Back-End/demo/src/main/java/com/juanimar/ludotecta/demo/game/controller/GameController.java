package com.juanimar.ludotecta.demo.game.controller;

import com.juanimar.ludotecta.demo.game.model.GameDTO;
import com.juanimar.ludotecta.demo.game.service.GameService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/game")
public class GameController {

    @Autowired
    GameService gameService;

    @Autowired
    ModelMapper modelMapper;

    @GetMapping
    public List<GameDTO> getAllGames(@RequestParam(required = false) String title,
                                     @RequestParam(required = false) Long idCategory) {
        return gameService.getGames(title, idCategory).stream().map(game ->
                modelMapper.map(game, GameDTO.class)
        ).toList();
    }

    @PutMapping({"", "/{id}"})
    public void saveGame(@PathVariable(required = false) Long id, @RequestBody GameDTO gameDTO) {
        gameService.saveGame(id, gameDTO);
    }
}
