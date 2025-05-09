package com.juanimar.ludotecta.demo.client.service;

import com.juanimar.ludotecta.demo.client.model.Client;
import com.juanimar.ludotecta.demo.client.model.ClientDTO;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

public interface ClientService {
    void save(Long idClient, ClientDTO clientDTO) throws ResponseStatusException;

    List<Client> getClientList();

    void delete(long id);
}
