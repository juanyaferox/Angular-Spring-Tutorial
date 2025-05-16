package com.juanimar.ludotecta.demo.loan.service;

import com.juanimar.ludotecta.demo.loan.model.Loan;
import com.juanimar.ludotecta.demo.loan.model.LoanDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;

public interface LoanService {
    void save(Long id, LoanDTO loanDTO);

    void delete(long id);

    Page<Loan> getPage(Pageable pageable, Long idGame, Long idClient, LocalDate date);

    Loan getLoanById(Long id);
}
