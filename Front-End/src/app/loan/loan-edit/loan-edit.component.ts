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
    if (!this.isValid(loan))
      return;
    console.log(loan)
    this.loanService
      .saveLoan(loan, this.dateStart, this.dateEnd)
      .subscribe((v) => this.dialogRef.close());
  }

  private isValid(loan: Loan): boolean {
    if (!loan.game || !loan.client || !this.dateStart || !this.dateEnd) {
      alert('Por favor, completa todos los campos obligatorios.');
      return false;
    }

    if (this.dateStart > this.dateEnd) {
      alert('La fecha de fin de no debe ser mayor a la inicial.');
      return false;
    }

    if (this.is1MoreThan4DaysApart(this.dateStart!, this.dateEnd!)) {
      alert('El período no puede superar los 14 días.');
      return false;
    }

    // Al pasar las validaciones en el front se convierte la fecha a un string
    loan.dateStart =
      this.datePipe.transform(this.dateStart, 'dd/MM/yyyy') ?? undefined;
    loan.dateEnd =
      this.datePipe.transform(this.dateEnd, 'dd/MM/yyyy') ?? undefined;
    return true;
  }

  private is1MoreThan4DaysApart(date1: Date, date2: Date): boolean {
    console.log(date1, date2)
    const diff = Math.abs(date1.getTime() - date2.getTime());
    console.log(diff)
    console.log(1000 * 60 * 60 * 24)
    return diff / (1000 * 60 * 60 * 24) >= 14;
  }
}
