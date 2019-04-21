import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { EbooksService } from './services/ebooks.service';

@Component({
  selector: 'ebooks',
  templateUrl: './ebooks.component.html',
  styleUrls: ['./ebooks.component.css']
})
export class EbooksComponent {

  ebooksList$: Observable<string[]>;

  constructor(private ebooksService: EbooksService) {}

  ngOnInit() {
    this.ebooksList$ = this.ebooksService.getEbooksNames();
  }

}
