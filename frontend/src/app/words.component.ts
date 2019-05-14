import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WordsService } from './services/words.service';

@Component({
  selector: 'words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit, OnDestroy {
  wordsServiceUpdateSubscription: Subscription;
  wordsList: string[] = [];

  constructor(private wordsService: WordsService) {}

  ngOnInit(): void {
    this.wordsList = this.wordsService.getWordsList();
    this.wordsServiceUpdateSubscription = this.wordsService.getUpdateObservable().subscribe((words: string[]) => {
      this.wordsList = words;
    });
  }

  ngOnDestroy(): void {
    this.wordsServiceUpdateSubscription.unsubscribe();
  }

  deleteWords(selectedWords: any[]): void {
    const values = selectedWords.map(el => el.value);
    this.wordsService.deleteWords(values);
  }
}
