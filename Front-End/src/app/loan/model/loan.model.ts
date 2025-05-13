import { Client } from '../../client/model/client.model';
import { Game } from '../../game/model/game.model';

export class Loan {
  id?: number;
  dateStart?: Date;
  dateEnd?: Date;
  client?: Client;
  game?: Game;

  constructor(
    id?: number,
    dateStart?: Date,
    dateEnd?: Date,
    client?: Client,
    game?: Game
  ) {
    this.id = id;
    this.dateStart = dateStart;
    this.dateEnd = dateEnd;
    this.client = client;
    this.game = game;
  }
}
