import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule  } from '@angular/http';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { FreeJsonModule } from './free-json/free-json.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpModule,
	CommonModule,
    FreeJsonModule
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
