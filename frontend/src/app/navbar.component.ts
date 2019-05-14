import { Component, Output, EventEmitter } from '@angular/core';
import { RenderService } from './services/render.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class NavbarComponent {
  @Output() modalVisibilityEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Output() mainContentEmitter: EventEmitter<string> = new EventEmitter<string>();
  mobilePileActive: boolean = false;

  constructor(private renderService: RenderService, private storageService: StorageService) {}

  changeModalVisibility() {
    this.storageService.openDialog();
  }

  changeMainContent(content) {
    this.mainContentEmitter.emit(content);
  }

  renderWordsSignal() {
    this.renderService.renderWords();
  }

  changePileStatus() {
    this.mobilePileActive = !this.mobilePileActive;
  }
}
