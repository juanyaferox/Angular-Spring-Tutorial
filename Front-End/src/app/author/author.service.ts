import { Pageable } from './../core/model/page/pageable';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Author } from './model/author.model';
import { AUTHOR_DATA } from './mock-author';
import { AuthorPage } from './model/author-page';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(
    private http: HttpClient
  ) { }

  private baseUrl = 'http://localhost:8080/author'

  getAuthors(pageable:Pageable): Observable<AuthorPage> {
    return this.http.post<AuthorPage>(this.baseUrl, {pageable})
  }

  saveAuthor(author : Author) : Observable<Author> {
    const {id} = author
    const url = id ? `${this.baseUrl}/${id}` : this.baseUrl
    return this.http.put<Author>(url,author)
  }

  deleteAuthor(idAuthor : number) : Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idAuthor}`)
  }

  getAllAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.baseUrl);
  }
}
