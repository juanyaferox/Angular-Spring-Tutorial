package com.juanimar.ludotecta.demo.category.service;

import com.juanimar.ludotecta.demo.category.model.CategoryDTO;

import java.util.List;

public interface CategoryService {
    List<CategoryDTO> findAll();

    void save(Long idCategory, CategoryDTO categoryDTO);

    void remove(long idCategory) throws Exception;
}
