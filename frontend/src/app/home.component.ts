import { Component, EventEmitter } from '@angular/core';
import { WordsService } from './services/words.service';
import { EbooksService } from './services/ebooks.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  wordsList: string[] = [];
  currentWord: string;
  phrasesData: string[][] = [];
  noResults: boolean = false;
  morePhrases: boolean = false;

  constructor(private wordsService: WordsService,
              private ebooksService: EbooksService) {}

  addWord(): void {
    const trimmedWord = this.currentWord.trim();
    this.wordsService.addWord(trimmedWord);
    this.currentWord = '';
  }

  clear(): void {
    this.noResults = false;
    this.morePhrases = false;
    this.phrasesData = [];
  }

  trackByPhrases(index: number, dataElement: any[]): number {
    return dataElement[1];
  }

  getPhrases(firstCall: boolean): void {
    if (firstCall) {
      this.clear();
    }
    this.ebooksService.getPhrases(this.wordsList, firstCall).subscribe(res => {
      if (firstCall && (res.phrases.length === 0)) {
        this.noResults = true;
      }
      this.phrasesData.push(...res.phrases);
      this.morePhrases = !res.completed;
    });
  }

}
