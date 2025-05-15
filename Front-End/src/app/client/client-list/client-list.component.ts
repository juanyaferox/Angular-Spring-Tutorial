import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Client } from '../model/client.model';
import { ClientService } from '../client.service';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { ClientEditComponent } from '../client-edit/client-edit.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTableModule, CommonModule], // Importar los modulos, no cada por separado
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss',
})
export class ClientListComponent implements OnInit {
  dataSource = new MatTableDataSource<Client>();
  displayedColumns: string[] = ['id', 'name', 'action'];

  constructor(private clientService: ClientService, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.getData();
    console.log(this.dataSource.data);
  }

  getData(): void {
    this.clientService
      .getClients()
      .subscribe((clients) => (this.dataSource.data = clients));
  }

  editClient(client: Client) {
    this.dialog
      .open(ClientEditComponent, { data: { client } })
      .afterClosed()
      .subscribe(() => this.getData());
  }

  deleteClient(client: Client) {
    this.dialog
      .open(DialogConfirmationComponent, {
        data: {
          title: 'Confirmación de borrado',
          description: 'Se va a borrar',
        },
      })
      .afterClosed()
      .subscribe(r => r
        ? this.clientService.deleteClient(client).subscribe(() => this.getData())
        : null
      );
  }
  createClient() {
    this.dialog
      .open(ClientEditComponent, new MatDialogConfig())
      .afterClosed()
      .subscribe(() => this.getData());
  }
}
