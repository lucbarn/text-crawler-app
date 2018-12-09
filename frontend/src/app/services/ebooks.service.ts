import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class EbooksService {
  constructor(private http: HttpClient) {}

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
          return of({});
        })
      );
  }

}
