import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTableModule, CommonModule], // Importar los modulos, no cada por separado
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss',
})
export class ClientListComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<Client>();
  displayedColumns: string[] = ['id', 'name', 'action'];
  private destroying$ = new Subject<void>();

  constructor(private clientService: ClientService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getData();
  }

   ngOnDestroy(): void {
    this.destroying$.next();
    this.destroying$.complete();
  }

  getData(): void {
    this.clientService
      .getClients()
      .pipe(takeUntil(this.destroying$))
      .subscribe((clients) => (this.dataSource.data = clients));
  }

  editClient(client: Client) {
    this.dialog
      .open(ClientEditComponent, { data: { client } })
      .afterClosed()
      .pipe(takeUntil(this.destroying$))
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
      .pipe(takeUntil(this.destroying$))
      .subscribe(r => r
        ? this.clientService.deleteClient(client).subscribe(() => this.getData())
        : null
      );
  }
  createClient() {
    this.dialog
      .open(ClientEditComponent, new MatDialogConfig())
      .afterClosed()
      .pipe(takeUntil(this.destroying$))
      .subscribe(() => this.getData());
  }
}
