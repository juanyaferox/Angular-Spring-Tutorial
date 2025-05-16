import { ClientService } from './../../client/client.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'
import { CommonModule, DatePipe } from '@angular/common';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Pageable } from '../../core/model/page/pageable';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Game } from '../../game/model/game.model';
import { Client } from '../../client/model/client.model';
import { GameService } from '../../game/game.service';
import { LoanService } from '../loan.service';
import { MatInputModule } from '@angular/material/input';
import { Loan } from '../model/loan.model';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation.component';
import { LoanEditComponent } from '../loan-edit/loan-edit.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-loan-list',
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule],
  providers: [DatePipe],
  standalone: true,
  templateUrl: './loan-list.component.html',
  styleUrl: './loan-list.component.scss'
})
export class LoanListComponent implements OnInit, OnDestroy {
  filterGame?: Game;
  filterClient?: Client;
  filterDate? : Date;

  clients!: Client[];
  games!: Game[];

  dataSource = new MatTableDataSource<Loan>();
  pageable: Pageable = new Pageable(0,5);
  totalElements = 0;
  displayedColumns = ['id','nameGame','nameClient','dateStart','dateEnd','action'];
  private destroying$ = new Subject<void>

  constructor(
    private gameService : GameService,
    private clientService : ClientService,
    private loanService : LoanService,
    private dialog : MatDialog,
    private datePipe : DatePipe
  ){}

  ngOnInit(): void {
    this.loadFilters()
    this.loadPage()
  }

  ngOnDestroy(): void {
    this.destroying$.next();
    this.destroying$.complete();
  }

  onCleanFilter() {
    this.filterGame = undefined
    this.filterClient = undefined
    this.filterDate = undefined
  }
  onSearch() {
    this.pageable.pageNumber = 0

    this.loanService.getLoansFiltered(
      this.pageable,
      this.filterGame?.id,
      this.filterClient?.id,
      this.filterDate ? this.datePipe.transform(this.filterDate, 'yyyy-MM-dd')! : undefined)
      .pipe(takeUntil(this.destroying$))
      .subscribe(loanPage => {
      this.dataSource.data = loanPage.content;
      this.pageable.pageNumber = loanPage.pageable.pageNumber;
      this.pageable.pageSize = loanPage.pageable.pageSize;
      this.totalElements = loanPage.totalElements;
      console.table(loanPage)
      }
    )
  }

  loadFilters() : void {
    this.clientService.getClients().pipe(takeUntil(this.destroying$)).subscribe( clients =>
      this.clients = clients
    )
    this.gameService.getGames().pipe(takeUntil(this.destroying$)).subscribe( games =>
      this.games = games
    )
  }

  deleteLoan(loan : Loan) {
    this.dialog.open(DialogConfirmationComponent, {data : {
      title: 'Confirmación de borrado',
      description: 'Se va a borrar',}
    }).afterClosed().subscribe( r => r
      ? this.loanService.deleteLoan(loan?.id!).pipe(takeUntil(this.destroying$)).subscribe(v => this.loadPage())
      : null
    )
  }

  createLoan() {
    this.dialog.open(LoanEditComponent, {data : {
      games : this.games, clients: this.clients, loan: new Loan()
    }})
      .afterClosed().pipe(takeUntil(this.destroying$)).subscribe(v => this.loadPage())
  }

  loadPage($event?: PageEvent) {
    if ($event != null) {
      this.pageable.pageSize = $event.pageSize;
      this.pageable.pageNumber = $event.pageIndex;
    }
    this.loanService.getLoans(this.pageable)
    .pipe(takeUntil(this.destroying$))
      .subscribe(loanPage => {
      this.dataSource.data = loanPage.content;
      this.pageable.pageNumber = loanPage.pageable.pageNumber;
      this.pageable.pageSize = loanPage.pageable.pageSize;
      this.totalElements = loanPage.totalElements;
      }
    )
  }



}
