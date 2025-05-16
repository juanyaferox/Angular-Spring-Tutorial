package com.juanimar.ludotecta.demo.client.model;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientDTO {
    Long id;
    @NotBlank(message = "El nombre no puede estar en blanco o  ser nulo.")
    String name;
}
