package com.juanimar.ludotecta.demo.client.repository;

import com.juanimar.ludotecta.demo.client.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {
    boolean existsByNameIgnoreCase(String name);
}