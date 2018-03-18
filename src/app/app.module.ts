import { NgModule } from '@angular/core';
import { HttpModule  } from '@angular/http';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { FreeJsonModule } from './free-json/free-json.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpModule ,
    FreeJsonModule
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
