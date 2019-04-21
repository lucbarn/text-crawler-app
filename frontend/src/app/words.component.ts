import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavService } from './services/nav.service';
import { DeleteService } from './services/delete.service';

@Component({
  selector: 'words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent {
  @Input() wordsList: string[];
  @Input() index: number;

  constructor(private navservice: NavService, private deleteservice: DeleteService) {}

  deleteWords(selectedWords: any[]): void {
    const values = selectedWords.map(el => el.value);
    this.deleteservice.deleteWords(values);
  }
}
