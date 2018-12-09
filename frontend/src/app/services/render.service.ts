import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class RenderService {
  private renderSubject: Subject<boolean> = new Subject<boolean>();

  renderSubjectObservable$ = this.renderSubject.asObservable();

  getObservable(): Observable<boolean> {
    console.log('getObservable() called');
    return this.renderSubjectObservable$;
  }

  renderWords(): void {
    this.renderSubject.next(true);
    console.log('renderWords() called');
  }
}
