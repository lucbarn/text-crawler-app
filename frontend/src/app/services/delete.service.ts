import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class DeleteService {
  private deleteSubject: Subject<string> = new Subject<string>();

  deleteSubjectObservable$ = this.deleteSubject.asObservable();

  getObservable(): Observable<string> {
    console.log('getObservable() called');
    return this.deleteSubjectObservable$;
  }

  deleteWord(word): void {
    this.deleteSubject.next(word);
  }
}
