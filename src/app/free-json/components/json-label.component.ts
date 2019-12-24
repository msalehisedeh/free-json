import {Component, ViewChild, Renderer, Input, Output, EventEmitter} from '@angular/core';

import { Node } from './../interfaces/node.interface';

@Component({
  selector: 'json-label',
  templateUrl: './json-label.component.html',
  styleUrls: ['./json-label.component.scss']
})
export class FreeJsonLabel {

  editName = false;
  editValue = false;

  constructor(private renderer: Renderer) {

  }

  @ViewChild("nameEditor", {static: false})
  nameEditor;

  @ViewChild("valueEditor", {static: false})
  valueEditor;

  @Input()
  node: Node;

  @Output("onchange")
  onchange = new EventEmitter();

  nameLabelKeydown(event) {
    const code = event.which;
    if ((code === 13) || (code === 32)) {
      this.renderer.invokeElementMethod(event.target, "click");
      setTimeout(()=>{
        if (this.nameEditor) {
          this.renderer.invokeElementMethod(this.nameEditor.nativeElement, "focus");
        }
      },66);
		} else if (code === 27) {
      this.editName = false;
    }
  }
  valueLabelKeydown(event) {
    const code = event.which;
    if ((code === 13) || (code === 32)) {
      this.renderer.invokeElementMethod(event.target, "click");
      setTimeout(()=>{
        if (this.valueEditor) {
          this.renderer.invokeElementMethod(this.valueEditor.nativeElement, "focus");
        }
      },66);
		} else if (code === 27) {
      this.editValue = false;
    }
  }

  clickName(event) {
    event.stopPropagation();
    event.preventDefault();
    this.editName = this.node.name !=='Root';
    setTimeout(()=>{
      this.renderer.invokeElementMethod(this.nameEditor.nativeElement, "focus");
    },66);
  }
  clickValue(event) {
    event.stopPropagation();
    event.preventDefault();
    this.editValue = this.node.value !=='Object';
    setTimeout(()=>{
      this.renderer.invokeElementMethod(this.valueEditor.nativeElement, "focus");
    },66);
  }
}

