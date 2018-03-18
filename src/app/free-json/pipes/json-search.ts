import { Pipe, PipeTransform } from '@angular/core';
import { NodeManager } from '../injectables/node-manager';

@Pipe({
  name: 'nodeSearch',
  pure: false
})
export class FreeJsonSearch implements PipeTransform {
  constructor(
    private manager: NodeManager
  ){
  }

  isBlank(obj: any): boolean {
    return obj === undefined || obj === null;
  }

  transform(value) {
    var filteredText = this.manager.getFilteredText()
    if (this.isBlank(filteredText)) { 
      return value
    } else {
      return value.filter((node) => node.text.indexOf(filteredText) > -1);
    }
  }
}
