package com.juanimar.ludotecta.demo.category.repository;

import com.juanimar.ludotecta.demo.category.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
