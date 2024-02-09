import { Injectable } from '@angular/core';

import { Node, NodeType } from './../interfaces/node.interface';

@Injectable()
export class NodeManager {
  filteredText!: String;

  constructor() {
  }

  generateNodeId() {
    const min = 1;
    const max = 10000
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getFilteredText() {
    return this.filteredText;
  }

  getNewNode(node: Node): Node {
    const id = this.generateNodeId();
    return {
      id: id,
      name: 'name', 
      value: 'value',
      parent: node.type,
      parentNode: node,
      type: NodeType.literal,
      children: [],
      expanded: false
    };
  }

  setFilteredText(text: string) {
    this.filteredText = text;
  }
}
