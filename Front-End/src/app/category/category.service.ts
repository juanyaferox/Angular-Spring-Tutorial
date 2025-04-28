import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from './model/category';
import { CATEGORY_DATA } from './model/mock-category'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  getCategories(): Observable<Category[]> {
    return of(CATEGORY_DATA)
  }

  saveCategory(category: Category): Observable<any> {
    return of(null);
  }

  deleteCategory(idCategory : number): Observable<any> {
    return of(null);
  }
}
