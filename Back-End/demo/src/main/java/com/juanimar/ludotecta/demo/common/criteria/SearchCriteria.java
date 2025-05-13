package com.juanimar.ludotecta.demo.common.criteria;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@Setter
@ToString
public class SearchCriteria {

    private String key;
    private String operation;
    private Object value;

}
