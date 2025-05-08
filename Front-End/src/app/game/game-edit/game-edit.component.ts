import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { Game } from '../model/game.model';
import { Category } from '../../category/model/category';
import { Author } from '../../author/model/author.model';
import { GameService } from '../game.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-game-edit',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    MatLabel,
    MatError,
    MatSelect,
    MatOption,
    MatButtonModule
  ],
  templateUrl: './game-edit.component.html',
  styleUrl: './game-edit.component.scss'
})
export class GameEditComponent implements OnInit{
  constructor(
    private gameService:GameService,
    public dialog:MatDialogRef<GameEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {categories : Category[], authors : Author[]}
  ) {
  }

  game!: Game;
  categories!: Category[];
  authors!: Author[];

  ngOnInit(): void {
    this.game = new Game()
    this.categories = this.data.categories;
    this.authors = this.data.authors;
  }

  onClose() {
    this.dialog.close()
  }

  onSave() {
    this.gameService.saveGame(this.game)
    .subscribe(() => this.dialog.close())
  }

}
