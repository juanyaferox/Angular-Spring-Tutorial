package com.juanimar.ludotecta.demo.author.model;

import com.juanimar.ludotecta.demo.common.pagination.PageableRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthorSearchDTO {
    private PageableRequest pageable;
}