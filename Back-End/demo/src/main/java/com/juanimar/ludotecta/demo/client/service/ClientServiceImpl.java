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

import java.util.List;

@Service
@Transactional
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
        if (clientRepository.existsById(id)) {
            // Posibilidad: En lugar de borrar, convertir en anónimo.
            // Permite borrarlos sin dejar perder la información relacionada
            // Sería necesario introducir un LocalDate del estilo 'deleteDate'
            // Después solo mostrar en los listados los q tienen ese dato null
            /*
            Client client = clientRepository.findById(id).orElse(null);
            client.setName("client_" + client.getId());
            client.setIsDeleted(true);
            clientRepository.save(client);*/
            clientRepository.deleteById(id);
        }

    }
}
