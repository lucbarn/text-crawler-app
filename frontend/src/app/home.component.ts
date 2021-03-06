import { Component, EventEmitter } from '@angular/core';
import { EbooksService } from './services/ebooks.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentWord: string;
  phrasesData: string[][] = [];
  noResults: boolean = false;
  morePhrases: boolean = false;

  constructor(private ebooksService: EbooksService,
              private storageService: StorageService) {}

  clear(): void {
    this.noResults = false;
    this.morePhrases = false;
    this.phrasesData = [];
  }

  trackByPhrases(index: number, dataElement: any[]): number {
    return dataElement[3];
  }

  getPhrases(firstCall: boolean): void {
    if (firstCall) {
      this.clear();
    }
    this.ebooksService.getPhrases(this.currentWord.trim(), firstCall).subscribe(res => {
      if (firstCall && (res.phrases.length === 0)) {
        this.noResults = true;
      }
      this.phrasesData.push(...res.phrases);
      this.morePhrases = !res.completed;
    });
  }

  modalOnClick(data: any[]): void {
    const [word, ebookTitle, rawPhrase, index, type] = data;
    if (type === 'phrase') {
      const pattern = /<strong>.*<\/strong>:\s*(?<phrase>.*)/;
      const match = rawPhrase.match(pattern);
      let phrase;
      if (match && match.groups) {
        phrase = match.groups.phrase;
      } else {
        phrase = '';
      }
      phrase = phrase.replace(/<\/?strong>/g, '');
      this.storageService.openDialog(word, ebookTitle, phrase);
    }
  }

}
