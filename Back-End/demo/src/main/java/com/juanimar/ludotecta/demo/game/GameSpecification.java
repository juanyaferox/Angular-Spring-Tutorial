package com.juanimar.ludotecta.demo.game;

import com.juanimar.ludotecta.demo.common.criteria.SearchCriteria;
import com.juanimar.ludotecta.demo.game.model.Game;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.io.Serial;

public class GameSpecification implements Specification<Game> {

    @Serial
    private static final long serialVersionUID = 1L;
    private final SearchCriteria searchCriteria;

    public GameSpecification(SearchCriteria searchCriteria) {
        this.searchCriteria = searchCriteria;
    }

    @Override
    public Predicate toPredicate(Root<Game> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        if (searchCriteria.getOperation().equalsIgnoreCase(":") && searchCriteria.getValue() != null) {
            Path<String> path = getPath(root);
            if (path.getJavaType() == String.class) {
                return criteriaBuilder.like(criteriaBuilder.lower(path), "%" + searchCriteria.getValue().toString().toLowerCase() + "%");
            } else {
                return criteriaBuilder.equal(path, searchCriteria.getValue());
            }
        }
        return null;
    }

    private Path<String> getPath(Root<Game> root) {
        String key = searchCriteria.getKey();
        String[] split = key.split("[.]", 0);

        Path<String> expression = root.get(split[0]);
        for (int i = 1; i < split.length; i++) {
            expression = expression.get(split[i]);
        }

        return expression;
    }
}
