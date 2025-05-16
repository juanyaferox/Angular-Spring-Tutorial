package com.juanimar.ludotecta.demo.client.service;

import com.juanimar.ludotecta.demo.client.model.Client;
import com.juanimar.ludotecta.demo.client.model.ClientDTO;
import com.juanimar.ludotecta.demo.client.repository.ClientRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ClientServiceImpl implements ClientService {

    @Autowired
    ClientRepository clientRepository;

    @Override
    public void save(Long idClient, ClientDTO clientDTO) throws ResponseStatusException {
        Client client = idClient != null ? getClientById(idClient) : new Client();

        if (clientRepository.existsByNameIgnoreCase(clientDTO.getName()))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe el nombre en la base de datos.");

        clientDTO.setName(normalizeName(clientDTO.getName()));
        BeanUtils.copyProperties(clientDTO, client);
        clientRepository.save(client);
    }

    @Override
    public Client getClientById(long id) {
        return clientRepository.findById(id).orElse(null);
    }

    @Override
    public List<Client> getClientList() {
        return clientRepository.findAll();
    }

    @Override
    public void delete(long id) {
        if (clientRepository.existsById(id)) {
            clientRepository.deleteById(id);
        }

    }

    private String normalizeName(String name) {
        return Arrays.stream(name.toLowerCase().trim().split("\\s+"))
                .map(w -> Character.toUpperCase(w.charAt(0)) + w.substring(1))
                .collect(Collectors.joining(" "));
    }

}
