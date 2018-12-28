import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { EbooksService } from './services/ebooks.service';

@Component({
  selector: 'modal-ebooks',
  templateUrl: './modal-ebooks.component.html',
  styleUrls: ['./modal-ebooks.component.css']
})
export class ModalEbooksComponent {
  @Output() modalVisibilityEmitter: EventEmitter<string> = new EventEmitter<string>();

  ebooksList$: Observable<string[]>;

  constructor(private ebooksService: EbooksService) {}

  ngOnInit() {
    this.ebooksList$ = this.ebooksService.getEbooksNames();
  }

  changeModalVisibility(content): void {
    this.modalVisibilityEmitter.emit(content);
  }

}
