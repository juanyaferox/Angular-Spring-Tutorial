package com.juanimar.ludotecta.demo.category;

import com.juanimar.ludotecta.demo.category.model.Category;
import com.juanimar.ludotecta.demo.category.model.CategoryDTO;
import com.juanimar.ludotecta.demo.category.repository.CategoryRepository;
import com.juanimar.ludotecta.demo.category.service.CategoryServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CategoryTest {

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private CategoryServiceImpl categoryService;

    @Test
    public void findAllShouldReturnAllCategories() {

        List<Category> list = new ArrayList<>();
        Category mockCategory = mock(Category.class);
        list.add(mockCategory);

        when(categoryRepository.findAll()).thenReturn(list);

        CategoryDTO categoryDTO = new CategoryDTO();
        // Cambios realizados para poder hacer el testing correctamente, ya que mi service devuelve un dto
        when(modelMapper.map(any(Category.class), eq(CategoryDTO.class))).thenReturn(categoryDTO);

        List<CategoryDTO> categories = categoryService.findAll();

        assertNotNull(categories);
        assertEquals(1, categories.size());
    }

    public static final String CATEGORY_NAME = "CAT1";

    @Test
    public void saveNotExistsCategoryIdShouldInsert() {

        CategoryDTO categoryDto = new CategoryDTO();
        categoryDto.setName(CATEGORY_NAME);

        ArgumentCaptor<Category> category = ArgumentCaptor.forClass(Category.class);

        categoryService.save(null, categoryDto);

        verify(categoryRepository).save(category.capture());

        assertEquals(CATEGORY_NAME, category.getValue().getName());
    }

    public static final Long EXISTS_CATEGORY_ID = 1L;

    @Test
    public void saveExistsCategoryIdShouldUpdate() {

        CategoryDTO categoryDto = new CategoryDTO();
        categoryDto.setName(CATEGORY_NAME);

        Category category = mock(Category.class);
        when(categoryRepository.findById(EXISTS_CATEGORY_ID)).thenReturn(Optional.of(category));

        categoryService.save(EXISTS_CATEGORY_ID, categoryDto);

        verify(categoryRepository).save(category);
    }

    public static final Long NOT_EXISTS_CATEGORY_ID = 0L;

    @Test
    public void getExistsCategoryIdShouldReturnCategory() {

        Category category = mock(Category.class);
        when(category.getId()).thenReturn(EXISTS_CATEGORY_ID);
        when(categoryRepository.findById(EXISTS_CATEGORY_ID)).thenReturn(Optional.of(category));

        Category categoryResponse = categoryService.getCategoryById(EXISTS_CATEGORY_ID);

        assertNotNull(categoryResponse);
        assertEquals(EXISTS_CATEGORY_ID, category.getId());
    }

    @Test
    public void getNotExistsCategoryIdShouldReturnNull() {

        when(categoryRepository.findById(NOT_EXISTS_CATEGORY_ID)).thenReturn(Optional.empty());

        Category category = categoryService.getCategoryById(NOT_EXISTS_CATEGORY_ID);

        assertNull(category);
    }
}
