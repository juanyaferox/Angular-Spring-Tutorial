package com.juanimar.ludotecta.demo.loan.model;

import com.juanimar.ludotecta.demo.common.pagination.PageableRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoanSearchDTO {
    private PageableRequest pageable;
}
