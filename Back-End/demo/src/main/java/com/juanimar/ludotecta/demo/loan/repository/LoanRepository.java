package com.juanimar.ludotecta.demo.loan.repository;

import com.juanimar.ludotecta.demo.loan.model.Loan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

import java.util.List;

public interface LoanRepository extends JpaRepositoryImplementation<Loan, Long> {

    // Para evitar multiples join
    @EntityGraph(attributePaths = {"client", "game"})
    Page<Loan> findAll(Specification<Loan> spec, Pageable pageable);

    @EntityGraph(attributePaths = {"client", "dateStart", "dateEnd"})
    List<Loan> findAll(Specification<Loan> spec);
}