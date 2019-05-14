import { Component, Input, HostListener, OnDestroy, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'storage-dialog',
  templateUrl: './storage-dialog.component.html',
  styleUrls: ['./storage-dialog.component.css']
})
export class StorageDialogComponent {

  // form: FormField;

  constructor(
    public dialogRef: MatDialogRef<StorageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    this.dialogRef.close();
  }

}
