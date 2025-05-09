import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Client } from './model/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http : HttpClient) { }

  baseUrl = 'http://localhost:8080/client'

  getClients() : Observable<Client[]>{
    return this.http.get<Client[]>(this.baseUrl)
  }

  saveClient(client : Client) : Observable<void>{
    const url = client.id ? `${this.baseUrl}/${client.id}` : this.baseUrl
    return this.http.put<void>(url, client).pipe(
      catchError(error => {
        if (error.status === 409) {
          console.error('Error del servidor (500):', error);
          alert('El nombre no puede ser igual.');
        }
        return throwError(() => error);
      })
    );
  }

  deleteClient(client : Client) : Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${client.id}`)
  }
}
