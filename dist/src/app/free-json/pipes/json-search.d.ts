import { PipeTransform } from '@angular/core';
import { NodeManager } from '../injectables/node-manager';
export declare class FreeJsonSearch implements PipeTransform {
    private manager;
    constructor(manager: NodeManager);
    isBlank(obj: any): boolean;
    transform(value: any): any;
}
