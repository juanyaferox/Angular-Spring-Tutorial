import { Pageable } from './../core/model/page/pageable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loan } from './model/loan.model';
import { LoanPage } from './model/loan-page';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http : HttpClient) { }

  private URL = 'http://localhost:8080/loan'

  getLoansFiltered(pageable : Pageable, idGame? : number, idClient? : number, date?:string) : Observable<LoanPage> {
    const url : string = this.composeFindUrl(idGame, idClient, date);
    return this.http.post<LoanPage>(url, {pageable})
  }

  getLoans(pageable : Pageable) : Observable<LoanPage> {
    return this.http.post<LoanPage>(this.URL, {pageable})
  }

  deleteLoan(id:number) : Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`)
  }

  saveLoan(loan : Loan, dateStart? : Date, dateEnd?: Date) : Observable<void> {
    const url = loan.id != null ? `${this.URL}/${loan.id}` : this.URL
    return this.http.put<void>(url,loan)
  }

  private composeFindUrl(idGame?: number, idClient?: number, date?:string): string {
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
