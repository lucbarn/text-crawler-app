import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar.component';
import { HomeComponent } from './home.component';
import { WordsComponent } from './words.component';
import { EbooksComponent } from './ebooks.component';
import { ModalAddPhraseComponent } from './modal-add-phrase.component';

import { RenderService } from './services/render.service';
import { NavService } from './services/nav.service';
import { DeleteService } from './services/delete.service';
import { EbooksService } from './services/ebooks.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    WordsComponent,
    EbooksComponent,
    ModalAddPhraseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    RenderService,
    NavService,
    DeleteService,
    EbooksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
