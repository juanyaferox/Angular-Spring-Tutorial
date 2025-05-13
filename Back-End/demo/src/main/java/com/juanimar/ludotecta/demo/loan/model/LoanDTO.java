package com.juanimar.ludotecta.demo.loan.model;

import com.juanimar.ludotecta.demo.client.model.ClientDTO;
import com.juanimar.ludotecta.demo.game.model.GameDTO;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@Setter
public class LoanDTO {
    Long id;

    @PastOrPresent
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    LocalDate dateStart;

    @FutureOrPresent
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    LocalDate dateEnd;

    ClientDTO client;

    GameDTO game;
}
