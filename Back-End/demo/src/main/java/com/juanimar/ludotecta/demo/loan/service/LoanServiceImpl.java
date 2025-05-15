package com.juanimar.ludotecta.demo.loan.service;

import com.juanimar.ludotecta.demo.client.service.ClientService;
import com.juanimar.ludotecta.demo.common.criteria.SearchCriteria;
import com.juanimar.ludotecta.demo.game.service.GameService;
import com.juanimar.ludotecta.demo.loan.LoanSpecification;
import com.juanimar.ludotecta.demo.loan.model.Loan;
import com.juanimar.ludotecta.demo.loan.model.LoanDTO;
import com.juanimar.ludotecta.demo.loan.repository.LoanRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;

@Service
@Transactional
public class LoanServiceImpl implements LoanService {

    @Autowired
    LoanRepository loanRepository;

    @Autowired
    GameService gameService;

    @Autowired
    ClientService clientService;

    @Override
    public void save(Long id, LoanDTO loanDTO) {
        Loan loan = id != null ? loanRepository.findById(id).orElse(null) : new Loan();

        if (loanDTO.getDateEnd().isBefore(loanDTO.getDateStart()))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La fecha de fin no puede ser menor a la de inicio.");

        if (loanDTO.getDateStart().plusDays(14).isBefore(loanDTO.getDateEnd()))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El período no puede superar los 14 días.");

        // TODO: Insertar verificación que el juego no esté ya prestado durantes esas fechas
        // findAll -> coincidencias de fechaStart >= y fechaEnd <= y observar si anyMatch del juego

        // TODO: Insertar verificación de que el cliente ya no tenga un juego prestado durante esos dias (max 1)
        //getClientById(loandto.client.id) -> client.getLoans ->  if coincidencias de fechaStart >= y fechaEnd > 0

        BeanUtils.copyProperties(loanDTO, loan, "id", "category", "game");
        loan.setClient(clientService.getClientById(loanDTO.getClient().getId()));
        loan.setGame(gameService.getGameById(loanDTO.getGame().getId()));

        loanRepository.save(loan);
    }

    @Override
    public void delete(long id) {
        if (loanRepository.existsById(id))
            loanRepository.deleteById(id);
    }

    @Override
    public Page<Loan> getPage(Pageable pageable, Long idGame, Long idClient, LocalDate date) {
        Specification<Loan> spec = Specification
                .where(new LoanSpecification(
                        new SearchCriteria("client.id", ":", idClient))
                )
                .and(new LoanSpecification(
                        new SearchCriteria("game.id", ":", idGame))
                )
                .and(new LoanSpecification( // Parametro key 'dateStart'
                        new SearchCriteria("dateStart", "~", date))
                );
        return loanRepository.findAll(spec, pageable);
    }
}