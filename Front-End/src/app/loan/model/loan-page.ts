import { Pageable } from "../../core/model/page/pageable";
import { Loan } from "./loan.model";

export class LoanPage {
  content: Loan[];
  pageable: Pageable;
  totalElements: number;

  constructor(content: Loan[], pageable: Pageable, totalElements: number) {
      this.content = content;
      this.pageable = pageable;
      this.totalElements = totalElements;
    }
}
