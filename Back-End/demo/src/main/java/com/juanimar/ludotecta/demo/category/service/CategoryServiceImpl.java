package com.juanimar.ludotecta.demo.category.service;

import com.juanimar.ludotecta.demo.category.model.Category;
import com.juanimar.ludotecta.demo.category.model.CategoryDTO;
import com.juanimar.ludotecta.demo.category.repository.CategoryRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    private ModelMapper modelMapper;

    /**
     * @return
     */
    @Override
    public List<CategoryDTO> findAll() {
        return categoryRepository.findAll()
                .stream().map(
                        category -> modelMapper.map(category, CategoryDTO.class)
                ).collect(Collectors.toList());
    }

    /**
     * @param idCategory
     * @param categoryDTO
     */
    @Override
    public void save(Long idCategory, CategoryDTO categoryDTO) {
        Category category = modelMapper.map(categoryDTO, Category.class);

        if (idCategory != null)
            categoryRepository.findById(idCategory).ifPresent(c -> {
                category.setId(c.getId());
            });

        categoryRepository.save(category);
    }

    /**
     * @param idCategory
     */
    @Override
    public void remove(long idCategory) throws Exception {
        Category category = categoryRepository.findById(idCategory).orElse(null);
        if (category == null)
            throw new Exception("Category not exists");
        categoryRepository.delete(category);

    }
}
