package com.juanimar.ludotecta.demo.client.model;

import com.juanimar.ludotecta.demo.loan.model.Loan;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "client")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    String name;

    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "client")
    List<Loan> loans;
}