import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Author } from './model/author.model';
import { AUTHOR_DATA } from './mock-author';
import { AuthorPage } from './model/author-page';
import { Pageable } from '../core/model/page/pageable';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor() { }

  getAuthors() : Observable<AuthorPage> {
    return of(AUTHOR_DATA)
  }

  saveAuthor(author : Author) : Observable<any> {
    return of(null)
  }

  deleteAuthor(idAuthor : number) : Observable<any> {
    return of(null)
  }
}
