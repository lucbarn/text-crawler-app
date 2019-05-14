import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class WordsService {
  wordsList: string[] = [];

  private updateSubject: Subject<string[]> = new Subject<string[]>();
  updateSubjectObservable$ = this.updateSubject.asObservable();

  getUpdateObservable(): Observable<string[]> {
    return this.updateSubjectObservable$;
  }

  getWordsList(): string[] {
    return this.wordsList;
  }

  updateWords(): void {
    this.updateSubject.next(this.wordsList);
  }

  addWord(word: string): void {
    const n = word.length;
    if ((n > 0) && (n < 40) && (!this.wordsList.includes(word))) {
      this.wordsList.push(word);
    }
  }

  deleteWords(words: string[]): void {
    this.wordsList = this.wordsList.filter(word => !words.includes(word));
    this.updateWords();
  }
}
