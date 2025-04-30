import { Pageable } from '../../core/model/page/pageable';
import { Author } from './author.model';

export class AuthorPage {
  content: Author[];
  pageable: Pageable;
  totalElements: number;

  constructor(content: Author[], pageable: Pageable, totalElements: number) {
    this.content = content;
    this.pageable = pageable;
    this.totalElements = totalElements;
  }
}
