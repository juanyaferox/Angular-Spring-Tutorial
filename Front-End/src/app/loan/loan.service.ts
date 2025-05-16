import { Handler } from '../core/utils/handler.service';
import { Pageable } from './../core/model/page/pageable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Loan } from './model/loan.model';
import { LoanPage } from './model/loan-page';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  constructor(private http: HttpClient, private handler : Handler) {}

  private URL = 'http://localhost:8080/loan';

  public getLoansFiltered(
    pageable: Pageable,
    idGame?: number,
    idClient?: number,
    date?: string
  ): Observable<LoanPage> {
    const url: string = this.composeFindUrl(idGame, idClient, date);
    return this.http.post<LoanPage>(url, { pageable });
  }

  public getLoans(pageable: Pageable): Observable<LoanPage> {
    return this.http.post<LoanPage>(this.URL, { pageable });
  }

  public deleteLoan(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }

  public saveLoan(
    loan: Loan
  ): Observable<void> {
    const url = loan.id != null ? `${this.URL}/${loan.id}` : this.URL;
    return this.http.put<void>(url, loan).pipe(
      catchError((error) => this.handler.handleError(error))
    );
  }

  private composeFindUrl(
    idGame?: number,
    idClient?: number,
    date?: string
  ): string {
    const params = new URLSearchParams();

    if (idGame) {
      params.set('idGame', idGame.toString());
    }
    if (idClient) {
      params.set('idClient', idClient.toString());
    }
    if (date) {
      params.set('date', date);
    }

    const queryString = params.toString();
    return queryString ? `${this.URL}?${queryString}` : this.URL;
  }
}
