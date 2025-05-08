package com.juanimar.ludotecta.demo.client.controller;

import com.juanimar.ludotecta.demo.client.model.ClientDTO;
import com.juanimar.ludotecta.demo.client.service.ClientService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/client")
@CrossOrigin(origins = "*")
public class ClientController {

    @Autowired
    ClientService clientService;
    @Autowired
    private ModelMapper modelMapper;

    @GetMapping
    public List<ClientDTO> getAllClients() {
        return clientService.getClientList().stream().map(
                client -> modelMapper.map(client, ClientDTO.class)
        ).toList();
    }

    @PutMapping({"", "/{id}"})
    public void setClient(@PathVariable(required = false) Long id, @RequestBody ClientDTO clientDTO) {
        clientService.save(id, clientDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteClient(@PathVariable long id) {
        clientService.delete(id)
        ;
    }
}
