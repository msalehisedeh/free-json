import {Component, ViewChild, Input, Output, EventEmitter} from '@angular/core';

import { Node, NodeType } from './../interfaces/node.interface';

@Component({
  selector: 'json-label',
  templateUrl: './json-label.component.html',
  styleUrls: ['./json-label.component.scss']
})
export class FreeJsonLabel {

  editName = false;
  editValue = false;
  arrayType = NodeType.array;
  pairType = NodeType.pair;
  jsonType = NodeType.json;
  literalType = NodeType.literal;

  @ViewChild("nameEditor", {static: false})
  nameEditor!: any;

  @ViewChild("valueEditor", {static: false})
  valueEditor!: any;

  @Input()
  node!: Node;

  @Output("onchange")
  onchange = new EventEmitter();

  nameLabelKeydown(event: any) {
    const code = event.which;
    if ((code === 13) || (code === 32)) {
      event.target.click();
      setTimeout(()=>{
        if (this.nameEditor) {
          this.nameEditor.nativeElement.focus();
        }
      },66);
		} else if (code === 27) {
      this.editName = false;
    }
  }
  valueLabelKeydown(event: any) {
    const code = event.which;
    if ((code === 13) || (code === 32)) {
      event.target.click();
      setTimeout(()=>{
        if (this.valueEditor) {
          this.valueEditor.nativeElement.focus();
        }
      },66);
		} else if (code === 27) {
      this.editValue = false;
    }
  }

  clickName(event: any) {
    event.stopPropagation();
    event.preventDefault();
    this.editName = this.node.name !=='Root';
    setTimeout(()=>{
      this.nameEditor.nativeElement.focus();
    },66);
  }
  clickValue(event: any) {
    event.stopPropagation();
    event.preventDefault();
    this.editValue = this.node.value !=='Object';
    setTimeout(()=>{
      this.valueEditor.nativeElement.focus();
    },66);
  }
  blur(editItem: any) {
    if(editItem) {
      this.onchange.emit({node: this.node, edited: true});
    }
    return false;
  }
}

