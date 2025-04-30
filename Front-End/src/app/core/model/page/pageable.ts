import { SortPage } from "./sort-page";

export class Pageable {
    pageNumber: number;
    pageSize: number;
    sortPage?: SortPage[];

    constructor(
        pageNumber: number,
        pageSize: number,
        sortPage?: SortPage[],
    ) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.sortPage = sortPage;
    }
}
