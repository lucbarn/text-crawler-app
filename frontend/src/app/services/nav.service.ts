import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class NavService {
  private navSubject: Subject<string> = new Subject<string>();

  navSubjectObservable$ = this.navSubject.asObservable();

  getObservable(): Observable<string> {
    console.log('getObservable() called');
    return this.navSubjectObservable$;
  }

  next(): void {
    this.navSubject.next('next');
  }

  previous(): void {
    this.navSubject.next('previous');
  }
}
