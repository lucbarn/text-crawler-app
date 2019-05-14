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
      height: '70vh',
      maxWidth: '600px',
      maxHeight: '1050px',
      data: {
        word: word,
        title: title,
        phrase: phrase
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getEbooksNames(): Observable<string[]> {
    return this.http.get('/ebooks')
      .pipe(
        tap(res => console.log(res)),
        map(res => res['ebooks_names']),
        catchError((error: any): Observable<string[]> => {
          console.log('An error occurred!');
          console.error(error);
          return of([]);
        })
      );
  }

  getPhrases(words: string[], firstCall: boolean): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const content = {wordsList: words, newAnalysis: firstCall};
    return this.http.post('/phrases', content, httpOptions)
      .pipe(
        catchError((error: any): Observable<any> => {
          console.log('An error occurred!');
          console.error(error);
          return of({
            'phrases': [],
            'completed': true
          });
        })
      );
  }

}
