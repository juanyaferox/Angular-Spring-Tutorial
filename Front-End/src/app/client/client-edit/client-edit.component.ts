import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, NgModelGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Client } from '../model/client.model';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-edit',
  imports: [MatFormFieldModule, ReactiveFormsModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.scss'
})
export class ClientEditComponent implements OnInit {
  constructor(
    public dialogRef : MatDialogRef<ClientEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {client : Client},
    private clientService : ClientService
  ){}

  ngOnInit(): void {
    this.client = this.data != null ? this.data.client : new Client()
  }
  client!: Client;
  onClose() {
    this.dialogRef.close()
  }
  onSave(client : Client) {
    this.clientService.saveClient(client).subscribe(
      () => this.dialogRef.close()
    )
  }

}
