package com.juanimar.ludotecta.demo.loan.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.juanimar.ludotecta.demo.client.model.ClientDTO;
import com.juanimar.ludotecta.demo.game.model.GameDTO;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@Setter
@ToString
public class LoanDTO {
    Long id;

    @NotNull(message = "Tiene que haber una fecha de inicio")
    //@PastOrPresent(message = "La fecha de inicio debe ser anterior o igual a la fecha de hoy.")
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    LocalDate dateStart;

    @NotNull(message = "Tiene que haber una fecha de fin")
    //@FutureOrPresent(message = "La fecha de fin debe ser posterior o igual a la fecha de hoy.")
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    LocalDate dateEnd;

    @NotNull(message = "Tiene que haber un cliente asignado.")
    ClientDTO client;

    @NotNull(message = "Tiene que haber un título asignado.")
    GameDTO game;
}
