import { Component, Input } from '@angular/core';
import { NodeManager } from '../injectables/node-manager';

@Component({ 
  selector: 'json-search-field', 
  template:`<input type='text' [(ngModel)]='val' (ngModelChange)='filter(val)'>`
})
export class FreeJsonSearchField{
  @Input("val")
  val: string;
  
  constructor(
    private manager: NodeManager
  ) {}

  filter(value) {
    this.manager.setFilteredText(value);
  }
}
