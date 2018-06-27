import { NodeManager } from '../injectables/node-manager';
export declare class FreeJsonSearchField {
    private manager;
    val: string;
    constructor(manager: NodeManager);
    filter(value: any): void;
}
