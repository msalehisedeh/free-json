import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule  } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { DifferentiateComponent } from '@sedeh/differentiate';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { FreeJsonModule } from '@sedeh/free-json';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    BrowserModule,
    FreeJsonModule,
    BrowserAnimationsModule,
    DifferentiateComponent
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
