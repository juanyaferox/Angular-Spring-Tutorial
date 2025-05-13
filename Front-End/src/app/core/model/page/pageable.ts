import { SortPage } from "./sort-page";

export class Pageable {
    pageNumber: number;
    pageSize: number;
    sort?: SortPage[];

    constructor(
        pageNumber: number,
        pageSize: number,
        sort?: SortPage[],
    ) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.sort = sort ?? [new SortPage('id', 'ASC')];
    }
}
