import { provideRouter, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo:'/games',
    pathMatch:'full'
  },
  {
    path: 'categories',
    loadComponent:
    () => import('./category/category-list/category-list.component')
    .then(c => c.CategoryListComponent)
  },
  {
    path: 'authors',
    loadComponent:
    () => import('./author/author-list/author-list.component')
    .then(c => c.AuthorListComponent)
  },
  {
    path: 'games',
    loadComponent:
    () => import('./game/game-list/game-list.component')
    .then(c => c.GameListComponent)
  },
  {
    path: 'clients',
    loadComponent:
    () => import('./client/client-list/client-list.component')
    .then(c => c.ClientListComponent)
  },
];

