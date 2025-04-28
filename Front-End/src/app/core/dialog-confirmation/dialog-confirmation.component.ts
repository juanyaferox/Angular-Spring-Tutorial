import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirmation',
  imports: [MatButtonModule],
  templateUrl: './dialog-confirmation.component.html',
  styleUrl: './dialog-confirmation.component.scss'
})
export class DialogConfirmationComponent implements OnInit{

title!: string;
description!: string;

constructor (
    private dialogRef: MatDialogRef<DialogConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
) {
}

onClose(value : boolean = false) {
    this.dialogRef.close(value)
}

ngOnInit(): void {
    this.title = this.data.title
    this.description = this.data.description
}

}
