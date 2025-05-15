import { Loan } from './../model/loan.model';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDatepickerModule,
  MatDateRangeInput,
  MatDateRangePicker,
} from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Client } from '../../client/model/client.model';
import { Game } from '../../game/model/game.model';
import { ClientService } from '../../client/client.service';
import { GameService } from '../../game/game.service';
import { MatInputModule } from '@angular/material/input';
import { LoanService } from '../loan.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-loan-edit',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDateRangeInput,
    MatDateRangePicker,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatDatepickerModule,
  ],
  providers: [DatePipe],
  templateUrl: './loan-edit.component.html',
  styleUrl: './loan-edit.component.scss',
})
export class LoanEditComponent implements OnInit {
  loan!: Loan;
  game!: Game;
  client!: Client;
  games!: Game[];
  clients!: Client[];
  dateStart?: Date;
  dateEnd?: Date;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { loan: Loan; clients: Client[]; games: Game[] },
    private loanService: LoanService,
    private dialogRef: DialogRef,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loan = this.data != null ? this.data.loan : new Loan();
    this.games = this.data.games;
    this.clients = this.data.clients;
  }

  onClose() {
    this.dialogRef.close();
  }
  onSave(loan: Loan) {
    this.pipeDate(loan);
    this.loanService
      .saveLoan(loan, this.dateStart, this.dateEnd)
      .subscribe((v) => this.dialogRef.close());
  }

  private pipeDate(loan: Loan) {
    // Sse convierte la fecha a un string
    loan.dateStart =
      this.datePipe.transform(this.dateStart, 'dd/MM/yyyy') ?? undefined;
    loan.dateEnd =
      this.datePipe.transform(this.dateEnd, 'dd/MM/yyyy') ?? undefined;
  }

  public isLessThan4DaysApart(): boolean {
    if (this.dateStart == null || this.dateEnd == null) {
      return true;
    }
    const diff = Math.abs(this.dateStart.getTime() - this.dateEnd.getTime());
    return diff / (1000 * 60 * 60 * 24) < 14;
  }
}
