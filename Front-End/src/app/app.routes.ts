import { provideRouter, Routes } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { AppComponent } from './app.component';
import { bootstrapApplication } from '@angular/platform-browser';

export const routes: Routes = [
  {
    path: 'categories',
    loadComponent:
    () => import('./category/category-list/category-list.component')
    .then(c => c.CategoryListComponent)
  }
];

