import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar.component';
import { HomeComponent } from './home.component';
import { EbooksComponent } from './ebooks.component';
import { StorageDialogComponent } from './storage-dialog.component';

import { EbooksService } from './services/ebooks.service';
import { StorageService } from './services/storage.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    EbooksComponent,
    StorageDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    EbooksService,
    StorageService
  ],
  entryComponents: [StorageDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
