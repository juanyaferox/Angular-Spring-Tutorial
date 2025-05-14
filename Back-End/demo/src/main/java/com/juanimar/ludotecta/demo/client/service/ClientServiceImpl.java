package com.juanimar.ludotecta.demo.client.service;

import com.juanimar.ludotecta.demo.client.model.Client;
import com.juanimar.ludotecta.demo.client.model.ClientDTO;
import com.juanimar.ludotecta.demo.client.repository.ClientRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ClientServiceImpl implements ClientService {

    @Autowired
    ClientRepository clientRepository;

    @Override
    public void save(Long idClient, ClientDTO clientDTO) throws ResponseStatusException {
        Client client = idClient != null ? getClientById(idClient) : new Client();

        if (clientDTO.getName() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        if (clientRepository.existsByNameIgnoreCase(clientDTO.getName()))
            throw new ResponseStatusException(HttpStatus.CONFLICT);

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
        clientRepository.deleteById(id);
    }
}
