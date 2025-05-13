package com.juanimar.ludotecta.demo.loan;

import com.juanimar.ludotecta.demo.common.criteria.SearchCriteria;
import com.juanimar.ludotecta.demo.loan.model.Loan;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public class LoanSpecification implements Specification<Loan> {

    private final SearchCriteria searchCriteria;

    public LoanSpecification(SearchCriteria searchCriteria) {
        this.searchCriteria = searchCriteria;
    }

    private static final String DATE_START = "dateStart";
    private static final String DATE_END = "dateEnd";

    @Override
    public Predicate toPredicate(Root<Loan> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        if (searchCriteria.getValue() == null)
            return null;

        var path = getPath(root); // Obtengo el path con tipo genérico
        Object value = searchCriteria.getValue();
        String operation = searchCriteria.getOperation();
        System.out.println("PATH: " + path.toString());

        // Verifico en cada el tipo de Path para asegurarse de que sea el mismo tipo de dato
        if (path.getJavaType() == Long.class && operation.equalsIgnoreCase(":")) {
            return criteriaBuilder.equal(path.as(Long.class), value);
        }

        if (path.getJavaType() == LocalDate.class && operation.equalsIgnoreCase("~")) {
            LocalDate date = LocalDate.parse(value.toString());
            return criteriaBuilder.between(criteriaBuilder.literal(date), root.get(DATE_START), root.get(DATE_END));

        } else
            return criteriaBuilder.equal(path, searchCriteria.getValue());
    }

    // Modificado para que el path sea génerico y así ser validado con JavaType
    private <T> Path<T> getPath(Root<Loan> root) {
        String key = searchCriteria.getKey();
        String[] split = key.split("[.]", 0);

        Path<T> expression = root.get(split[0]);
        for (int i = 1; i < split.length; i++) {
            expression = expression.get(split[i]);
        }

        return expression;
    }
}
