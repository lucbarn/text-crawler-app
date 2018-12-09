import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavService } from './services/nav.service';
import { DeleteService } from './services/delete.service';

@Component({
  selector: 'modal-words',
  templateUrl: './modal-words.component.html',
  styleUrls: ['./modal-words.component.css']
})
export class ModalWordsComponent {
  @Input() wordsDisplayed: string[];
  @Input() wordsListLength: number;
  @Input() index: number;
  @Output() modalVisibilityEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor(private navservice: NavService, private deleteservice: DeleteService) {}

  changeModalVisibility(content): void {
    this.modalVisibilityEmitter.emit(content);
  }

  next(): void {
    this.navservice.next();
  }

  previous(): void {
    this.navservice.previous();
  }

  deleteWord(word): void {
    this.deleteservice.deleteWord(word);
  }
}
