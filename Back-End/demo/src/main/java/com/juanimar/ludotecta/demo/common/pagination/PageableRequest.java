package com.juanimar.ludotecta.demo.common.pagination;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
public class PageableRequest implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private int pageNumber;

    private int pageSize;

    private List<SortRequest> sort;

    public PageableRequest() {

        sort = new ArrayList<>();
    }

    public PageableRequest(int pageNumber, int pageSize) {

        this();
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
    }

    public PageableRequest(int pageNumber, int pageSize, List<SortRequest> sort) {

        this();
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.sort = sort;
    }

    @JsonIgnore
    public Pageable getPageable() {
        return PageRequest.of(
                this.pageNumber,
                this.pageSize,
                Sort.by(sort.stream().map(e ->
                                new Sort.Order(e.getDirection(), e.getProperty()))
                        .toList()
                )
        );
    }

    @ToString
    @Getter
    @Setter
    public static class SortRequest implements Serializable {

        @Serial
        private static final long serialVersionUID = 1L;

        private String property;

        private Sort.Direction direction;
    }
}
