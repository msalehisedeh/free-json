import { Node } from './../interfaces/node.interface';
export declare class NodeManager {
    filteredText: String;
    constructor();
    generateNodeId(): number;
    getFilteredText(): String;
    getNewNode(node: Node): Node;
    setFilteredText(text: any): void;
}
