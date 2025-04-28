import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { CategoryListComponent } from './category/category-list/category-list.component';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Tutorial de Angular';
}
