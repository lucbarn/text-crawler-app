import { Component, Input, HostListener, OnDestroy, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'storage-dialog',
  templateUrl: './storage-dialog.component.html',
  styleUrls: ['./storage-dialog.component.css']
})
export class StorageDialogComponent {

  word: string;
  ebookTitle: string;
  phrase: string;

  constructor(
    public dialogRef: MatDialogRef<StorageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.word = data.word;
      this.ebookTitle = data.title;
      this.phrase = data.phrase;
    }

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
