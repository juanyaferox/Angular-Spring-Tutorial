import { CategoryService } from './../category.service';
import { Category } from './../model/category';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-category-edit',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
    ],
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.scss',
  standalone: true
})
export class CategoryEditComponent implements OnInit{
  category!: Category;

  constructor (
    private categoryService : CategoryService,
    private dialogRef : MatDialogRef<CategoryEditComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {category : Category},
  ) {}

  ngOnInit(): void {
    this.category = this.data != null ? this.data.category : new Category()
  }

  onSave() : void {
    this.categoryService
      .saveCategory(this.category)
      .subscribe(() => this.dialogRef.close())
  }

  onClose() : void {
    this.dialogRef.close()
  }
}
