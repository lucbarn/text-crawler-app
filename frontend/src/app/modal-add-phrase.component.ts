import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'modal-add-phrase',
  templateUrl: './modal-add-phrase.component.html',
  styleUrls: ['./modal-add-phrase.component.css']
})
export class ModalAddPhraseComponent {
  @Output() modalVisibilityEmitter: EventEmitter<string> = new EventEmitter<string>();

  // ebooksList$: Observable<string[]>;

  // constructor() {}

  changeModalVisibility(content): void {
    this.modalVisibilityEmitter.emit(content);
  }

}
