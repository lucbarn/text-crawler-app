import { Component, Output, EventEmitter } from '@angular/core';
import { RenderService } from './services/render.service';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class NavbarComponent {
  @Output() modalVisibilityEmitter: EventEmitter<string> = new EventEmitter<string>();
  mobilePileActive: boolean = false;

  constructor(private renderservice: RenderService) {}

  changeModalVisibility(content) {
    this.modalVisibilityEmitter.emit(content);
  }

  renderWordsSignal() {
    this.renderservice.renderWords();
  }

  changePileStatus() {
    this.mobilePileActive = !this.mobilePileActive;
  }
}
