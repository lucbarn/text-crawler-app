import { Injectable, OnInit, OnDestroy, Component } from '@angular/core';
import { Observable, Subject, Subscription, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material';

import { StorageDialogComponent } from '../storage-dialog.component';

@Injectable()
export class StorageService {
  constructor(private http: HttpClient, public dialog: MatDialog) {}

  openDialog(word: string = '', title: string = '', phrase: string = ''): void {
    const dialogRef = this.dialog.open(StorageDialogComponent, {
      width: '40vw',
      height: '60vh',
      maxWidth: '600px',
      maxHeight: '900px',
      data: {
        word: word,
        title: title,
        phrase: phrase
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed -> ', result);
    });
  }

}
