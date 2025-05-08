import { Author } from '../../author/model/author.model';
import { Category } from '../../category/model/category';

export class Game {
  id?: number;
  title?: string;
  age?: number;
  category?: Category;
  author?: Author;

  constructor(id?: number, title?: string, age?: number, category?: Category, author?: Author) {
    this.id = id;
    this.title = title;
    this.age = age;
    this.category = category;
    this.author = author;
  }
}
