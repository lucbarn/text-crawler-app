import { Component, EventEmitter, Output, HostListener, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { RenderService } from './services/render.service';
import { NavService } from './services/nav.service';
import { DeleteService } from './services/delete.service';
import { EbooksService } from './services/ebooks.service';
import { Renderer2 } from '@angular/core';
import { lines } from './utils';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {
  @Output() wordsListEmitter: EventEmitter<string[]> = new EventEmitter<string[]>();
  modalVisible: boolean = false;
  modalContent: string = '';
  wordsList: string[] = [];
  wordsDisplayed: string[] = [];
  // index of the next word to be displayed
  index: number = 0;
  currentWord: string;
  modalDimensions: Object = {'width': 0, 'height': 0};
  spaceLeft: number;
  phrasesData: string[][] = [];
  text: string;
  noResults: boolean = false;
  morePhrases: boolean = false;
  renderServiceSubscription: Subscription;
  navServiceSubscription: Subscription;
  deleteServiceSubscription: Subscription;

  constructor(private renderService: RenderService,
              private navService: NavService,
              private deleteService: DeleteService,
              private ebooksService: EbooksService,
              private renderer: Renderer2) {
    this.renderServiceSubscription = this.renderService.getObservable().subscribe((signal: boolean) => {
      this.renderWords();
    });

    this.navServiceSubscription = this.navService.getObservable().subscribe((func: string) => {
      if (func === 'next') {
        this.next();
      } else if (func === 'previous') {
        this.previous();
      }
    });

    this.deleteServiceSubscription = this.deleteService.getObservable().subscribe((words: string[]) => {
      this.deleteWords(words);
    });
  }

  changeModalVisibility(event): void {
    this.modalContent = event;
    if (event === 'words') {
      this.renderService.renderWords();
    }
    this.modalVisible = event ? true : false;
    if (this.modalVisible) {
      this.renderer.addClass(document.body, 'modal-open');
    } else {
      this.renderer.removeClass(document.body, 'modal-open');
    }
  }

  addWord(): void {
    const trimmedWord = this.currentWord.trim();
    const n = trimmedWord.length;
    if ((n > 0) && (n < 40) && (!this.wordsList.includes(trimmedWord))) {
      this.wordsList.push(trimmedWord);
    }
    this.currentWord = '';
    this.wordsListEmitter.emit(this.wordsList);
  }

  clear(): void {
    this.noResults = false;
    this.morePhrases = false;
    this.phrasesData = [];
  }


  trackByPhrases(index: number, dataElement: any[]): number {
    return dataElement[1];
  }

  analyzeText(firstCall: boolean): void {
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

  next(): void {
    const temp = [];
    this.spaceLeft = this.modalDimensions['height'] * 0.8 * 0.8;
    while (this.index < this.wordsList.length) {
      const estimatedWordHeight = lines(this.wordsList[this.index], 25, this.modalDimensions['width']) * 30 + 20;
      if (estimatedWordHeight > this.spaceLeft) {
        break;
      } else {
        temp.push(this.wordsList[this.index]);
        this.spaceLeft -= estimatedWordHeight;
        this.index++;
      }
    }
    if (temp.length > 0) {
      this.wordsDisplayed = temp;
    }
  }

  previous(): void {
    if (this.index - this.wordsDisplayed.length > 0) {
      this.index -= this.wordsDisplayed.length;
      let j = this.index - 1;
      const temp = [];
      this.spaceLeft = this.modalDimensions['height'] * 0.8 * 0.8;
      while (j >= 0) {
        const estimatedWordHeight = lines(this.wordsList[j], 25, this.modalDimensions['width']) * 30 + 20;
        if (estimatedWordHeight > this.spaceLeft) {
          break;
        } else {
          temp.push(this.wordsList[j]);
          this.spaceLeft -= estimatedWordHeight;
          j--;
        }
      }
      if (j < 0) {
        this.index = 0;
        this.next();
      } else if (temp.length > 0) {
        this.wordsDisplayed = temp.reverse();
      }
    }
  }

  renderWords(): void {
    this.index -= this.wordsDisplayed.length;
    this.next();
  }

  deleteWord(word): void {
    const index = this.wordsList.indexOf(word);
    if (index > -1) {
      this.wordsList.splice(index, 1);
      if (this.wordsDisplayed.length > 1) {
        this.renderWords();
      } else if (this.wordsList.length > 0) {
        this.previous();
      } else {
        this.index = 0;
        this.wordsDisplayed = [];
      }
    }
  }

  deleteWords(words: string[]): void {
    this.wordsList = this.wordsList.filter(word => !words.includes(word));
  }

  assignDocument(document: string): void {
    this.text = document;
  }

  resetMaterial(): void {
    this.text = null;
    this.clear();
  }

  @HostListener('window:load')
  @HostListener('window:resize')
  getModalDimensions(): void {
    this.modalDimensions['width'] = Math.min(1000, window.innerWidth * 0.90);
    this.modalDimensions['height'] = Math.min(600, window.innerHeight * 0.90);
  }

  ngOnDestroy() {
    this.renderServiceSubscription.unsubscribe();
  }
}
