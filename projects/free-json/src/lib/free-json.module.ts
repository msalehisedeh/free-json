import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { DragDropModule } from '@sedeh/drag-enabled';

import { NodeManager } from './injectables/node-manager';
import { FreeJsonSearchField } from './components/json-search-field.component';
import { FreeJsonComponent } from './components/json.component';
import { FreeJsonLabel } from './components/json-label.component';
import { FreeJsonSearch } from './pipes/json-search';

@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
    FormsModule
  ],
  declarations: [
    FreeJsonComponent,
    FreeJsonLabel,
    FreeJsonSearch,
    FreeJsonSearchField
  ],
  exports: [
    FreeJsonComponent
  ],
  entryComponents: [
  ],
  providers: [
    FreeJsonSearch,
    NodeManager
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class FreeJsonModule {}
