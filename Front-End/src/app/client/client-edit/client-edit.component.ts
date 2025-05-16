import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, NgModelGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Client } from '../model/client.model';
import { ClientService } from '../client.service';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-client-edit',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.scss',
})
export class ClientEditComponent implements OnInit, OnDestroy {

  constructor(
    public dialogRef: MatDialogRef<ClientEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { client: Client },
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.client = this.data != null ? this.data.client : new Client();
  }

  ngOnDestroy(): void {
    this.destroying$.next();
    this.destroying$.complete();
  }

  client!: Client;
  error?: string;
  private destroying$ = new Subject<void>

  onClose() {
    this.dialogRef.close();
  }

  onSave(client: Client) {
    this.clientService.saveClient(client).pipe(takeUntil(this.destroying$)).subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: (message: string) => {
        this.error = message;
      },
    });
  }

  clearError() {
    this.error = undefined;
  }
}
