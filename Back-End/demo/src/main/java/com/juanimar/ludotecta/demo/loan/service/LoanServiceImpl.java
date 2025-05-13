package com.juanimar.ludotecta.demo.loan.service;

import com.juanimar.ludotecta.demo.common.criteria.SearchCriteria;
import com.juanimar.ludotecta.demo.loan.LoanSpecification;
import com.juanimar.ludotecta.demo.loan.model.Loan;
import com.juanimar.ludotecta.demo.loan.model.LoanDTO;
import com.juanimar.ludotecta.demo.loan.repository.LoanRepository;
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
public class LoanServiceImpl implements LoanService {

    @Autowired
    LoanRepository loanRepository;

    @Override
    public void save(Long id, LoanDTO loanDTO) {
        Loan loan = id != null ? loanRepository.findById(id).orElse(new Loan()) : new Loan();

        if (loan.getDateStart().plusDays(14).isBefore(loan.getDateEnd()))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);

        BeanUtils.copyProperties(loanDTO, loan, "id");
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