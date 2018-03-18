import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DropEvent, DragEvent } from 'drag-enabled';

import { NodeManager } from '../injectables/node-manager';
import { FreeJsonSearch } from '../pipes/json-search';
import { FreeJsonLabel } from './json-label.component';
import { Node, NodeType, Reasoning, ActionType } from '../interfaces/node.interface';
//import { FreeJsonDialog } from './json-dialog.component';

@Component({
  selector: 'free-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.scss'],
})
export class FreeJsonComponent implements OnInit {

  children;
  
  @Input("transformedData")
  transformedData;
  
  @Input("reasoning")
  reasoning: Reasoning[];

  @Input("reasoningCodes")
  reasoningCodes: string[] = [];

  @Input()
  set root(node : Node ){
    if (node) {
      this.children = node;
      if (this.reasoning) {
        this.reasoning = [];
      }
      const parent: Node = {
        id: this.manager.generateNodeId(),
        name: "Root",
        value: "Object",
        parent: NodeType.array,
        type: NodeType.array,
        expanded: true,
        children: undefined,
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
  
  expanded:Boolean;
  
  constructor(
	  private manager:NodeManager
	) {
	  
  }

  private transformedInternalStructureBackToNode( root, parent ) {
    let json = {};
    let array = [];

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

  private transformNodeToInternalStruction(node, parent: Node) {
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

  addNewNode(event, node) {
    event.stopPropagation();
    event.preventDefault();

    if(this.reasoning) {
      // let dialogRef = this.dialog.open(FreeJsonDialog, {
      //   data: { 
      //     action: 'add',
      //     node: node,
      //     reasoning: this.reasoning,
      //     codes: this.reasoningCodes
      //   },
      // });
      // dialogRef.afterClosed().subscribe(result => {
      //   if (result.ok) {
      //     console.log("TODO: popup will set node type");
      //     const type = result.noteType;
      //     node.children = [...node.children, this.manager.getNewNode(node)];
      //     node.expanded = true;
      //     this.changePerformed({});
      //   }
      // });
    } else {
      node.children = [...node.children, this.manager.getNewNode(node)];
      node.expanded = true;
      this.changePerformed({});
    }
  }
  moveNode(event, node, moveUp) {
    event.stopPropagation();
    event.preventDefault();

    if(this.reasoning) {
      // let dialogRef = this.dialog.open(FreeJsonDialog, {
      //   data: { 
      //     action: 'move',
      //     from: this.transformedData.indexOf(node),
      //     direction: moveUp,
      //     node: node,
      //     reasoning: this.reasoning,
      //     codes: this.reasoningCodes
      //   },
      // });
      // dialogRef.afterClosed().subscribe(result => {
      //   if (result.ok) {
      //     console.log("TODO: popup will give index to go to");
      //     let from = result.from;
      //     let to = moveUp ? 
      //               (from > 0 ? from - 1 : from) : 
      //               (from < (this.transformedData.length - 1) ? from + 1 : from);
      
      //     this.transformedData.splice(to, 0, this.transformedData.splice(from, 1)[0]);
      //     this.changePerformed({});
      //   }
      // });
    } else {
      let from = this.transformedData.indexOf(node);
      let to = moveUp ? 
                (from > 0 ? from - 1 : from) : 
                (from < (this.transformedData.length - 1) ? from + 1 : from);
  
      this.transformedData.splice(to, 0, this.transformedData.splice(from, 1)[0]);
      this.changePerformed({});
    }
  }
  deleteNode(event, node) {
    event.stopPropagation();
    event.preventDefault();
    if(this.reasoning) {
      // let dialogRef = this.dialog.open(FreeJsonDialog, {
      //   data: { 
      //     action: 'remove',
      //     node: node,
      //     reasoning: this.reasoning,
      //     codes: this.reasoningCodes
      //   },
      // });
      // dialogRef.afterClosed().subscribe(result => {
      //   if (result.ok) {
      //     console.log("TODO: prompt reason ad save it in a construct");
      //     this.transformedData.splice(this.transformedData.indexOf(node), 1);
      //     this.changePerformed({});
      //   }
      // });
    } else {
      this.transformedData.splice(this.transformedData.indexOf(node), 1);
      this.changePerformed({});
    }
  }

  hasChevronDown(child){
    return child && child.children && child.children.length > 0 && child.expanded
  }

  hasChevronRight(child) {
    return child && child.children && child.children.length != 0 && !child.expanded
  }

	dragEnabled(event: DragEvent) {
		return !event.medium.isRoot;
	}
	dropEnabled(event: DropEvent) {
		return !event.destination.medium.isRoot;
	}
  onDragStart(event) {
    // this.manager.setSelectedNode(event.medium);
  }

  onDragEnd(event: DropEvent) {
    if (event.destination && event.source.medium !== event.destination.medium) {
      const sourceIndex = this.transformedData.indexOf(event.source.medium);

      if(this.reasoning) {
        console.log("adsadas")
        // let dialogRef = this.dialog.open(FreeJsonDialog, {
        //   data: { 
        //     action: 'drag',
        //     from: sourceIndex,
        //     reasoning: this.reasoning,
        //     codes: this.reasoningCodes
        //   },
        // });
        // dialogRef.afterClosed().subscribe(result => {
        //   if (result.ok) {
        //     console.log("TODO: prompt reason ad save it in a construct");
        //     this.transformedData.splice(sourceIndex, 1);
        //     this.changePerformed({});
        //   }
        // });
      } else {
        this.transformedData.splice(sourceIndex, 1);
        this.changePerformed({});
      }
    }
  }

  onDrop(event){
    if (event.destination && event.source && event.source.medium !== event.destination.medium) {
      const sourceNode = event.source.medium;
      const destinationNode = event.destination.medium;
  
      destinationNode.children = [...destinationNode.children, sourceNode];
      if (destinationNode.children.length) {
        destinationNode.expanded = true;
      }    
      if (destinationNode.type === NodeType.literal) {
        destinationNode.type = NodeType.json;
//        destinationNode.name= "name";
        destinationNode.value= "";
      } else if (destinationNode.type === NodeType.pair) {
        destinationNode.type = NodeType.json;
//        destinationNode.value= "";
      } else if (destinationNode.type === NodeType.array) {
        if (destinationNode.parent === NodeType.array && sourceNode.type === NodeType.pair) {
          sourceNode.type = NodeType.json;
        }
      }
      sourceNode.parent = destinationNode.type;

      const i = sourceNode.parentNode.children.indexOf(sourceNode);
      sourceNode.parentNode.children.splice(i, 1);
      sourceNode.parentNode = destinationNode;
    }
  }

  toGrandParent(event, child) {
    event.stopPropagation();
    event.preventDefault();

    const parent =  child.parentNode;
    const grandParent =  child.parentNode.parentNode;
    const i = parent.children.indexOf(child);
    const p = grandParent.children.indexOf(parent);

    parent.children.splice(i, 1);

    if (parent.children.length === 0) {
      parent.type = NodeType.pair;
    }
    grandParent.children.splice(p + 1, 0, child);
  }

  getFilteredText(){
    this.manager.getFilteredText();
  }

  toggle(event, child) {
    event.stopPropagation();
    event.preventDefault();
    child.expanded = !child.expanded;
  }

  keydown(event, item) {
    const code = event.which;
    if ((code === 13) || (code === 32)) {
			this.toggle(event, item);
		}
  }
  keymove(event, item, moveUp) {
    const code = event.which;
    if ((code === 13) || (code === 32)) {
      this.moveNode(event, item, moveUp);
    }
  }
  keydelete(event, item) {
    const code = event.which;
    if ((code === 13) || (code === 32)) {
			this.deleteNode(event, item);
		}
  }
  keytoGrandParent(event, item) {
    const code = event.which;
    if ((code === 13) || (code === 32)) {
			this.toGrandParent(event, item);
		}
  }
  keyadd(event, item) {
    const code = event.which;
    if ((code === 13) || (code === 32)) {
			this.addNewNode(event, item);
		}
  }
  canAddNode(node) {
    return (node.type === NodeType.json) || (node.type === NodeType.array);
  }
  changePerformed(event) {
    if (this.children) {
      const savedNode = this.transformedInternalStructureBackToNode(this.transformedData[0].children, NodeType.json);
      this.onchange.emit({
        data: savedNode,
        reasoning: this.reasoning
      });
    } else {
      this.onchange.emit({});
    }
  }
}
