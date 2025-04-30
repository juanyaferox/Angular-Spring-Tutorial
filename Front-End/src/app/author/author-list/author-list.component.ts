import { Author } from './../model/author.model';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { AuthorService } from "../author.service"
import { Pageable } from '../../core/model/page/pageable';
import { SortPage } from '../../core/model/page/sort-page';
import { AuthorPage } from '../model/author-page';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthorEditComponent } from '../author-edit/author-edit.component';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-author-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    CommonModule
  ],
  templateUrl: './author-list.component.html',
  styleUrl: './author-list.component.scss'
})
export class AuthorListComponent implements OnInit, AfterViewInit {

  constructor(
    private authorService : AuthorService,
    public dialog: MatDialog
  ) {}

ngOnInit(): void {
  this.loadPage()
}

ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator;
}


@ViewChild(MatPaginator)
  paginator!: MatPaginator;

pageable!: Pageable;
dataSource = new MatTableDataSource<Author>();
displayedColumns: string[] = ['id', 'name', 'nationality', 'action'];
pageNumber!: number;
pageSize!: number;
totalElements!: number;

loadPage(event?: PageEvent) {
  if (event != null) {
    this.pageable.pageSize = event.pageSize;
    this.pageable.pageNumber = event.pageIndex;
  }
  this.authorService.getAuthors().subscribe(
    authorPage => {
      this.dataSource.data = authorPage.content;
      this.pageable = authorPage.pageable;
      this.totalElements = authorPage.totalElements;
      this.pageNumber = this.pageable.pageNumber;
      this.pageSize = this.pageable.pageSize;
    }
  )
}

editAuthor(author: Author) {
  this.dialog
  .open(AuthorEditComponent, {data : {author} })
  .afterClosed().subscribe(() => this.ngOnInit)
}
deleteAuthor(author : Author) {
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
          ? this.authorService
              .deleteAuthor(author.id!)
              .subscribe(() => this.ngOnInit)
          : null
      );
}
createAuthor() {
  this.dialog
    .open(AuthorEditComponent, new MatDialogConfig())
    .afterClosed().subscribe(() => this.ngOnInit)
  }
}
