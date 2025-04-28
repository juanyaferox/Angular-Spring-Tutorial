import {
  Component,
  signal,
  WritableSignal,
  OnInit,
  effect,
  Signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Category } from '../model/category';
import { CategoryService } from '../category.service';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTableModule, CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent implements OnInit {
  dataSource = new MatTableDataSource<Category>();
  displayedColumns: string[] = ['id', 'name', 'action'];

  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog
  ) {}

  createCategory(): void {
    this.dialog
      .open(CategoryEditComponent, new MatDialogConfig().data)
      .afterClosed()
      .subscribe((_) => this.ngOnInit);
  }

  editCategory(category: Category): void {
    this.dialog
      .open(CategoryEditComponent, { data: { category } })
      .afterClosed()
      .subscribe((_) => this.ngOnInit);
  }

  deleteCategory(category: Category): void {
    this.dialog
      .open(DialogConfirmationComponent, {
        data: {
          title: 'Confirmación de borrado',
          description: 'Se va a borrar',
        },
      })
      .afterClosed()
      .subscribe((r) =>
        r
          ? this.categoryService
              .deleteCategory(category.id!)
              .subscribe((_) => this.ngOnInit)
          : null
      );
  }

  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .subscribe((c) => (this.dataSource.data = c));
  }

  // Ejemplo haciendo uso de signals, cuya reactividad es automática y no manual
  // constructor() {
  //   effect(() => {
  //     this.dataSource.data = this.dataSignal();
  //     this.displayedColumns = this.displayedSignal();
  //   });
  // }
  // dataSignal: WritableSignal<Category[]> = signal([
  //   new Category(1, 'Categoría' + 1),
  //   new Category(2, 'Categoría' + 2),
  //   new Category(3, 'Categoría' + 3),
  //   new Category(4, 'Categoría' + 4),
  // ]);
  // displayedSignal: Signal<string[]> = signal(['id', 'name']);
  // newCategory(): void {
  //   this.dataSignal.update((c) => [
  //     ...c,
  //     new Category(c.at(-1)!.id + 1, `Categoría${c.at(-1)!.id + 1}`),
  //   ]);
  // }
}
