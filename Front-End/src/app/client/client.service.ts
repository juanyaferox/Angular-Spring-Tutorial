import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Client } from './model/client.model';
import { Handler } from '../core/utils/handler.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http : HttpClient, private handler : Handler) { }

  baseUrl = 'http://localhost:8080/client'

  getClients() : Observable<Client[]>{
    return this.http.get<Client[]>(this.baseUrl)
  }

  saveClient(client : Client) : Observable<void>{
    const url = client.id ? `${this.baseUrl}/${client.id}` : this.baseUrl
    return this.http.put<void>(url, client).pipe(
      catchError((error) => this.handler.handleError(error))
    );
  }

  deleteClient(client : Client) : Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${client.id}`)
  }
}
