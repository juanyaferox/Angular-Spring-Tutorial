import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
