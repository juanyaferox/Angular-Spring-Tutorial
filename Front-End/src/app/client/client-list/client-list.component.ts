import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';import { Client } from '../model/client.model';
import { ClientService } from '../client.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ClientEditComponent } from '../client-edit/client-edit.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTableModule, CommonModule], // Importar los modulos, no cada por separado
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent implements OnInit{

dataSource = new MatTableDataSource<Client>();
displayedColumns : string[] = ['id','name'];

  constructor(private clientService : ClientService,
    public dialog  : MatDialog) {
  }
  ngOnInit(): void {
    this.getData()
    console.log(this.dataSource.data)
  }

  getData() : void {
    this.clientService.getClients()
    .subscribe(clients => this.dataSource.data = clients);
  }

  editClient(client:Client) {
    this.dialog .open(ClientEditComponent, {data : {client}})
    .afterClosed().subscribe(() => this.getData())
  }

  deleteClient(_t20: any) {

  }
  createClient() {
    this.dialog .open(ClientEditComponent, new MatDialogConfig())
    .afterClosed().subscribe(() => this.getData())
  }

}
