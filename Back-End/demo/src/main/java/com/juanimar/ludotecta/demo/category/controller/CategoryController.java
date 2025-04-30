package com.juanimar.ludotecta.demo.category.controller;

import com.juanimar.ludotecta.demo.category.model.CategoryDTO;
import com.juanimar.ludotecta.demo.category.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Category", description = "API for Category")
@RestController
@RequestMapping("/category")
@CrossOrigin(origins = "*")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @Operation(summary = "Find", description = "Method that return a list of Categories")
    @GetMapping("")
    public List<CategoryDTO> findAll() {
        return categoryService.findAll();
    }

    @Operation(summary = "Save or Update", description = "Method that saves or updates a Category")
    @PutMapping({"", "/{id}"})
    public void save(@PathVariable(name = "id", required = false) Long id, @RequestBody CategoryDTO dto) {
        categoryService.save(id, dto);
    }

    @Operation(summary = "Delete", description = "Method that deletes a Category")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) throws Exception {
        categoryService.remove(id);
    }
}
