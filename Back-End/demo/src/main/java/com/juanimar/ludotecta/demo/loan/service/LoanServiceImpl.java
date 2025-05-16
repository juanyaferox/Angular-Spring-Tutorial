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

import java.text.MessageFormat;
import java.time.LocalDate;
import java.util.List;

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

        // Asignación variables
        Loan loan = id != null ? getLoanById(id) : new Loan();
        LocalDate dateStart = loanDTO.getDateStart();
        LocalDate dateEnd = loanDTO.getDateEnd();
        Long idGame = loanDTO.getGame().getId();
        Long idClient = loanDTO.getClient().getId();
        final int DIFF_DAYS = 14;

        // Validaciones
        if (dateEnd.isBefore(dateStart))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La fecha de fin no puede ser menor a la de inicio.");

        if (dateStart.plusDays(DIFF_DAYS).isBefore(dateEnd))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, MessageFormat.format("El período no puede superar los {0} días.", DIFF_DAYS));

        if (getAllLoansBetweenDates(dateStart, dateEnd).stream().anyMatch(l -> l.getGame().getId().equals(idGame)))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El juego ya está en préstamo.");

        if (!getAllLoansBetweenDatesFromClient(dateStart, dateEnd, idClient).isEmpty())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ya tiene un juego en préstamo durante esas fechas.");

        // Mapeo de la entidad
        BeanUtils.copyProperties(loanDTO, loan, "id", "category", "game");
        loan.setGame(gameService.getGameById(idGame));
        loan.setClient(clientService.getClientById(idClient));

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

    private List<Loan> getAllLoansBetweenDatesFromClient(LocalDate dateStart, LocalDate dateEnd, Long idClient) {
        Specification<Loan> spec = Specification
                .where(new LoanSpecification(
                        new SearchCriteria("dateStart", "~", dateStart))
                )
                .or(new LoanSpecification(
                        new SearchCriteria("dateEnd", "~", dateEnd))
                )
                .and(new LoanSpecification(
                        new SearchCriteria("client.id", ":", idClient)
                ));
        return loanRepository.findAll(spec);
    }

    private List<Loan> getAllLoansBetweenDates(LocalDate dateStart, LocalDate dateEnd) {
        return getAllLoansBetweenDatesFromClient(dateStart, dateEnd, null);
    }

    @Override
    public Loan getLoanById(Long id) {
        return loanRepository.findById(id).orElse(null);
    }
}