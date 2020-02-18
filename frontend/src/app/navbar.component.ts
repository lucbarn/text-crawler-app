import { Component, Output, EventEmitter } from '@angular/core';
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

  constructor(private storageService: StorageService) {}

  changeModalVisibility() {
    this.storageService.openDialog();
  }

  changeMainContent(content) {
    this.mainContentEmitter.emit(content);
  }

  changePileStatus() {
    this.mobilePileActive = !this.mobilePileActive;
  }
}
