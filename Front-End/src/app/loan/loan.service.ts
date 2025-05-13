import { Pageable } from './../core/model/page/pageable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loan } from './model/loan.model';
import { LoanPage } from './model/loan-page';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http : HttpClient) { }

  private URL = 'http://localhost:8080/loan'

  getLoans(pageable : Pageable, idGame? : number, idClient? : number, date?:Date) : Observable<LoanPage> {
    console.log(pageable);
    const url : string = this.composeFindUrl(idGame, idClient, date);
    console.log(url)
    return this.http.post<LoanPage>(url, {pageable})
  }

  private composeFindUrl(idGame?: number, idClient?: number, date?:Date): string {
    const params = new URLSearchParams();

    if (idGame) {
      params.set('idGame', idGame.toString());
    }
    if (idClient) {
        params.set('idClient', idClient.toString());
    }
    if (date) {
        params.set('date', date.toString());
    }

    const queryString = params.toString();
    return queryString ? `${this.URL}?${queryString}` : this.URL;
  }
}
