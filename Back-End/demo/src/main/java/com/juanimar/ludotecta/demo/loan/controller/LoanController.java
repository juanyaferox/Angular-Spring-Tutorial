package com.juanimar.ludotecta.demo.loan.controller;

import com.juanimar.ludotecta.demo.loan.model.LoanDTO;
import com.juanimar.ludotecta.demo.loan.model.LoanSearchDTO;
import com.juanimar.ludotecta.demo.loan.service.LoanService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/loan")
public class LoanController {

    @Autowired
    LoanService loanService;
    @Autowired
    private ModelMapper modelMapper;

    @PostMapping
    Page<LoanDTO> getLoans(@RequestBody LoanSearchDTO pageable,
                           @RequestParam(required = false) Long idGame,
                           @RequestParam(required = false) Long idClient,
                           @RequestParam(required = false) LocalDate date) {
        return loanService.getPage(
                        pageable.getPageable().getPageable(), idGame, idClient, date)
                .map(
                        loan -> modelMapper.map(loan, LoanDTO.class)
                );
    }

    @PutMapping({"", "/{id}"})
    void setLoan(@PathVariable(required = false) Long id, @RequestBody @Valid LoanDTO loanDTO) {
        loanService.save(id, loanDTO);
    }

    @DeleteMapping("/{id}")
    void deleteLoan(@PathVariable long id) {
        loanService.delete(id);
    }
}
