import { ClientService } from './../../client/client.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Pageable } from '../../core/model/page/pageable';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormsModule } from '@angular/forms';
import { MatDatepicker, MatDatepickerControl, MatDatepickerModule, MatDatepickerPanel } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Game } from '../../game/model/game.model';
import { Client } from '../../client/model/client.model';
import { GameService } from '../../game/game.service';
import { LoanService } from '../loan.service';
import { MatInputModule } from '@angular/material/input';
import { Loan } from '../model/loan.model';

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
  templateUrl: './loan-list.component.html',
  styleUrl: './loan-list.component.scss'
})
export class LoanListComponent implements OnInit {
  filterGame?: Game;
  filterClient?: Client;
  filterDate? : Date;

  clients!: Client[];
  games!: Game[];

  dataSource = new MatTableDataSource<Loan>();
  pageable: Pageable = new Pageable(0,5);
  totalElements = 0;
  displayedColumns = ['id','nameGame','nameClient','dateStart','dateEnd','action'];

  constructor(
    private gameService : GameService,
    private clientService : ClientService,
    private loanService : LoanService
  ){}

  ngOnInit(): void {
    this.loadFilters()
    this.loadPage()
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  onCleanFilter() {
  }
  onSearch() {
  throw new Error('Method not implemented.');
  }

  loadFilters() : void {
    this.clientService.getClients().subscribe( clients =>
      this.clients = clients
    )
    this.gameService.getGames().subscribe( games =>
      this.games = games
    )
  }

  deleteLoan(_t68: any) {
  throw new Error('Method not implemented.');
  }

  createLoan() {
  throw new Error('Method not implemented.');
  }

  loadPage($event?: PageEvent) {
    if ($event != null) {
      this.pageable.pageSize = $event.pageSize;
      this.pageable.pageNumber = $event.pageIndex;
    }
    this.loanService.getLoans(
      this.pageable,
      this.filterGame?.id,
      this.filterClient?.id,
      this.filterDate)
      .subscribe(loanPage => {
      this.dataSource.data = loanPage.content;
      this.pageable.pageNumber = loanPage.pageable.pageNumber;
      this.pageable.pageSize = loanPage.pageable.pageSize;
      this.totalElements = loanPage.totalElements;
      console.table(loanPage)
      }
    )
    console.table(this.pageable);
  }

}
