import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DropEvent, DragEvent } from '@sedeh/drag-enabled';

import { NodeManager } from '../injectables/node-manager';
import { Node, NodeType, Reasoning, ActionType } from '../interfaces/node.interface';
import { ReasonCreatorInterface } from '../interfaces/reason-creator.interface';
import { Observable, BehaviorSubject } from 'rxjs';

class BlankReasonProvider implements ReasonCreatorInterface {
  provideReasoning(data: Reasoning): Observable<Reasoning> {
    return new BehaviorSubject<Reasoning>(data);
  }
}
@Component({
  selector: 'free-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.scss'],
})
export class FreeJsonComponent implements OnInit {

  children!: any;
  
  @Input("transformedData")
  transformedData!: any;
  
  @Input("reasonLogger")
  reasonLogger: ReasonCreatorInterface = new BlankReasonProvider();

  @Input()
  set root(node : Node ){
    if (node) {
      this.children = node;
      const parent: Node = {
        id: this.manager.generateNodeId(),
        name: "Root",
        value: "Object",
        parent: NodeType.array,
        type: NodeType.array,
        expanded: true,
        isRoot: true
      }
      parent.children = this.transformNodeToInternalStruction(this.children, parent)

      this.transformedData = [ parent ];
    }
  }
  get root(): Node{
      return this.children;
  }

  @Input()
  set save(flag : boolean ){
      if (flag) {
        const savedNode = this.transformedInternalStructureBackToNode(this.transformedData[0].children, NodeType.json);
        this.onpublish.emit(savedNode)
      }
  }
  get save(){
      return false;
  }

  @Output("onpublish")
  onpublish = new EventEmitter();
  
  @Output("onchange")
  onchange = new EventEmitter();
  
  expanded!:Boolean;
  
  constructor(
	  private manager:NodeManager
	) {
	  
  }

  private transformedInternalStructureBackToNode( root: any, parent: any ) {
    let json: any = {};
    let array: any[] = [];

    root.map( (item: Node) => {
      if (parent === NodeType.json) {        
        if (item.type === NodeType.literal) {
          array.push(item.value);
        } else if (item.type === NodeType.pair) {
          json[item.name] = item.value;
        } else if (item.type === NodeType.array) {
          json[item.name] = this.transformedInternalStructureBackToNode(item.children, item.parent);
        } else if (item.type === NodeType.json) {
          json[item.name] = this.transformedInternalStructureBackToNode(item.children, item.parent);
        }
      } else if (parent === NodeType.array){
        if (item.type === NodeType.literal) {
          array.push(item.value);
        } else if (item.type === NodeType.json) {
          array.push(this.transformedInternalStructureBackToNode(item, item.parent));
        } else if (item.type === NodeType.array) {
          array.push(this.transformedInternalStructureBackToNode(item.children, item.parent));
        }
      }
    });
    return array.length ? array : json;
  }

  private transformNodeToInternalStruction(node: any, parent: Node) {
    let result = node;
    if (node instanceof Array) {
      const children: Node[] = [];
      node.map( (item) => {
        const subNode: Node = {
          id: this.manager.generateNodeId(),
          name: "",
          value: "",
          parent: NodeType.array,
          parentNode: parent,
          type: NodeType.array,
          children: []
        }
        const jsonValue: any = this.transformNodeToInternalStruction(item, subNode);
        if (jsonValue instanceof Array) {
          subNode.children = jsonValue;
          children.push(subNode);
        } else {
          subNode.value = jsonValue;
          subNode.type = NodeType.literal;
          children.push(subNode);
        }      
      });
      result = children;
    } else if (node instanceof Object) {
      const list = Object.keys(node);
      const children: Node[] = [];
      list.map( (item) => {
        const subNode: Node = {
          id: this.manager.generateNodeId(),
          name: item,
          value: "",
          parent: NodeType.json,
          parentNode: parent,
          type: NodeType.array,
          children: []
        }
        const jsonValue: any = this.transformNodeToInternalStruction(node[item], subNode);
        if (jsonValue instanceof Array) {
          subNode.children = jsonValue;
          children.push(subNode);
        } else {
          subNode.value = jsonValue;
          subNode.type = NodeType.pair;
          children.push(subNode);
        }
      });
      result = children;
    }
    return result;
  }

  ngOnInit() {
  }

  addNewNode(event: any, node: any) {
    event.stopPropagation();
    event.preventDefault();

    const reason: Reasoning = {
      code: '',
      description: '',
      action: ActionType.add,
      node
    }
    this.reasonLogger.provideReasoning(reason).subscribe(
      (result: Reasoning) => {
        node.children = [...node.children, this.manager.getNewNode(node)];
        node.expanded = true;
        this.changePerformed({reasoning: result});
      }
    );
  }
  moveNode(event: any, node: any, moveUp: any) {
    event.stopPropagation();
    event.preventDefault();

    this.move(node, moveUp);
  }
  deleteNode(event: any, node: any) {
    event.stopPropagation();
    event.preventDefault();

    const reason: Reasoning = {
      code: '',
      description: '',
      action: ActionType.remove,
      node
    }
    this.reasonLogger.provideReasoning(reason).subscribe(
      (result: Reasoning) => {
        this.transformedData.splice(this.transformedData.indexOf(node), 1);
        this.changePerformed({reasoning: result});
      }
    );
  }

  hasChevronDown(child: any){
    return child && child.children && child.children.length > 0 && child.expanded
  }

  hasChevronRight(child: any) {
    return child && child.children && child.children.length != 0 && !child.expanded
  }

	dragEnabled(medium: any) {
		return !medium.isRoot && (medium.name.length || medium.value.length);
	}
	dropEnabled(medium: any) {
		return !medium.isRoot;
	}
  onDragStart(event: any) {
    // this.manager.setSelectedNode(event.medium);
  }

  onDragEnd(event: DropEvent) {
    if (event.destination && event.source.medium !== event.destination.medium) {
      const sourceIndex = this.transformedData.indexOf(event.source.medium);
      const reason: Reasoning = {
        code: '',
        description: '',
        action: ActionType.remove,
        node: event.source.medium
      }
      this.reasonLogger.provideReasoning(reason).subscribe(
        (result: Reasoning) => {
          this.transformedData.splice(sourceIndex, 1);
          this.changePerformed({reasoning: result});
        }
      );
    }
  }

  onDrop(event: any){
    if (event.destination && event.source && event.source.medium !== event.destination.medium) {
      const sourceNode = event.source.medium;
      const destinationNode = event.destination.medium;
  
      destinationNode.children = [...destinationNode.children, sourceNode];
      if (destinationNode.children.length) {
        destinationNode.expanded = true;
      }    
      if (destinationNode.type === NodeType.literal) {
        destinationNode.type = NodeType.json;
        destinationNode.value= "";
      } else if (destinationNode.type === NodeType.pair) {
        destinationNode.type = NodeType.json;
      } else if (destinationNode.type === NodeType.array) {
        if (destinationNode.parent === NodeType.array && sourceNode.type === NodeType.pair) {
          sourceNode.type = NodeType.json;
        }
      }
      sourceNode.parent = destinationNode.type;

      const i = sourceNode.parentNode.children.indexOf(sourceNode);
      sourceNode.parentNode.children.splice(i, 1);
      sourceNode.parentNode = destinationNode;
      this.move(sourceNode, false);
    }
  }

  toGrandParent(event: any, child: any) {
    event.stopPropagation();
    event.preventDefault();

    const parent =  child.parentNode;
    const grandParent =  child.parentNode.parentNode;
    const i = parent.children.indexOf(child);
    const p = grandParent.children.indexOf(parent);

    parent.children.splice(i, 1);

    if (parent.children.length === 0) {
      if (!parent.name.length && !parent.value.length) {
        grandParent.children.splice(p, 1);
        grandParent.children.splice(p, 0, child);
      } else {
        parent.type = NodeType.pair;
        grandParent.children.splice(p + 1, 0, child);
      }
    } else {
      grandParent.children.splice(p + 1, 0, child);
    }
    child.parentNode = grandParent;
    this.move(child, true);
  }

  getFilteredText(){
    this.manager.getFilteredText();
  }

  toggle(event: any, child: any) {
    event.stopPropagation();
    event.preventDefault();
    child.expanded = !child.expanded;
  }

  keydown(event: any, item: any) {
    const code = event.which;
    if ((code === 13) || (code === 32)) {
			this.toggle(event, item);
		}
  }
  keymove(event: any, item: any, moveUp: any) {
    const code = event.which;
    if ((code === 13) || (code === 32)) {
      this.moveNode(event, item, moveUp);
    }
  }
  keydelete(event: any, item: any) {
    const code = event.which;
    if ((code === 13) || (code === 32)) {
			this.deleteNode(event, item);
		}
  }
  keytoGrandParent(event: any, item: any) {
    const code = event.which;
    if ((code === 13) || (code === 32)) {
			this.toGrandParent(event, item);
		}
  }
  keyadd(event: any, item: any) {
    const code = event.which;
    if ((code === 13) || (code === 32)) {
			this.addNewNode(event, item);
		}
  }
  canAddNode(node: any) {
    return (node.type === NodeType.json) || (node.type === NodeType.array);
  }
  labelValueChanged(event: any) {
    if (event.edited) {
      const reason: Reasoning = {
        code: '',
        description: '',
        action: ActionType.modified,
        node: event.node
      }
      this.reasonLogger.provideReasoning(reason).subscribe(
        (result: Reasoning) => {
          this.changePerformed({reasoning: result});
        }
      );
    } else if (event.destination && event.source.medium !== event.destination.medium) {
      const sourceIndex = this.transformedData.indexOf(event.source.medium);
      const reason: Reasoning = {
        code: '',
        description: '',
        action: ActionType.modified,
        node: event.source.medium
      }
      this.reasonLogger.provideReasoning(reason).subscribe(
        (result: Reasoning) => {
          this.transformedData.splice(sourceIndex, 1);
          this.changePerformed({reasoning: result});
        }
      );
    }
  }
  changePerformed(event: any) {
    if (this.children) {
      const savedNode = this.transformedInternalStructureBackToNode(this.transformedData[0].children, NodeType.json);
      this.onchange.emit({data: savedNode, reasoning: event.reasoning});
    } else {
      this.onchange.emit({data: event.node, reasoning: event.reasoning});
    }
  }
  private move(node: any, moveUp: any) {
    const reason: Reasoning = {
      code: '',
      description: '',
      action: ActionType.move,
      node
    }
    this.reasonLogger.provideReasoning(reason).subscribe(
      (result: Reasoning) => {
        let from = this.transformedData.indexOf(node);
        let to = moveUp ? 
                  (from > 0 ? from - 1 : from) : 
                  (from < (this.transformedData.length - 1) ? from + 1 : from);
        
        this.transformedData.splice(to, 0, this.transformedData.splice(from, 1)[0]);
        this.changePerformed({reasoning: result});
      }
    );
  }
}
