package com.juanimar.ludotecta.demo.client.service;

import com.juanimar.ludotecta.demo.client.model.Client;
import com.juanimar.ludotecta.demo.client.model.ClientDTO;
import com.juanimar.ludotecta.demo.client.repository.ClientRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientServiceImpl implements ClientService {

    @Autowired
    ClientRepository clientRepository;

    /**
     * @param idClient
     * @param clientDTO
     */
    @Override
    public void save(Long idClient, ClientDTO clientDTO) {
        Client client = idClient != null ? clientRepository.findById(idClient).orElse(null) : new Client();
        if (client == null)
            return;
        BeanUtils.copyProperties(clientDTO, client);
        clientRepository.save(client);
    }

    /**
     * @return
     */
    @Override
    public List<Client> getClientList() {
        return clientRepository.findAll();
    }

    /**
     * @param id
     */
    @Override
    public void delete(long id) {
        clientRepository.deleteById(id);
    }
}
