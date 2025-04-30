import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from './model/category';
import { CATEGORY_DATA } from './mock-category'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  private baseUrl = 'http://localhost:8080/category'

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl)
  }

  saveCategory(category: Category): Observable<Category[]> {
    return this.http.put<Category[]>(this.baseUrl,category)
  }

  deleteCategory(id : number): Observable<Category[]> {
    return this.http.delete<Category[]>(`${this.baseUrl}/${id}`)
  }
}
