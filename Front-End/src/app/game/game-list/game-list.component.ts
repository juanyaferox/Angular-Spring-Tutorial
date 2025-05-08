import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { GameItemComponent } from './game-item/game-item.component';
import { Category } from '../../category/model/category';
import { Game } from '../model/game.model';
import { GameService } from '../game.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GameEditComponent } from '../game-edit/game-edit.component';
import { CategoryService } from '../../category/category.service';
import { AuthorService } from '../../author/author.service';
import { Author } from '../../author/model/author.model';

@Component({
  selector: 'app-game-list',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    GameItemComponent,
  ],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.scss'
})
export class GameListComponent implements OnInit{
  editGame(_t41: Game) {
  throw new Error('Method not implemented.');
  }
  filterTitle?: string;
  filterCategory?: Category;
  categories!: Category[];
  authors!: Author[];
  games!: Game[];

  constructor(
    private gameService : GameService,
    private categoryService : CategoryService,
    private authorService : AuthorService,
    private dialog : MatDialog
  ){}

    ngOnInit(): void {
      this.getData()
      this.getCategories()
      this.getAuthors()
    }

  getData() {
    this.gameService.getGames()
    .subscribe(games => this.games = games)
  }

  onSearch() {
    this.gameService.getGames(this.filterTitle, this.filterCategory?.id ?? undefined)
    .subscribe(games => this.games = games)
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(categories =>
      this.categories = categories
    )
  }

  getAuthors() {
    this.authorService.getAllAuthors().subscribe(authors =>
      this.authors = authors
    )
  }

  onCleanFilter() {
    this.filterTitle = undefined;
    this.filterCategory = undefined;
  }

  createGame() {
    this.dialog.open(GameEditComponent, {data: {categories: this.categories, authors: this.authors}})
      .afterClosed().subscribe(() => this.getData())
  }

}
