import { Component, Input } from '@angular/core';
import { Game } from '../../model/game.model';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-game-item',
  imports: [MatCard],
  standalone: true,
  templateUrl: './game-item.component.html',
  styleUrl: './game-item.component.scss'
})
export class GameItemComponent {
@Input()
game!:Game;
}
