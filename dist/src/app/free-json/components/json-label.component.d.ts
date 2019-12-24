import { Renderer, EventEmitter } from '@angular/core';
import { Node } from './../interfaces/node.interface';
export declare class FreeJsonLabel {
    private renderer;
    editName: boolean;
    editValue: boolean;
    constructor(renderer: Renderer);
    nameEditor: any;
    valueEditor: any;
    node: Node;
    onchange: EventEmitter<any>;
    nameLabelKeydown(event: any): void;
    valueLabelKeydown(event: any): void;
    clickName(event: any): void;
    clickValue(event: any): void;
}
