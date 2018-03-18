import { Injectable, Component, Input, Output, EventEmitter, ViewChild, Renderer, Pipe, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DragDropModule } from 'drag-enabled';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
const NodeType = {
    literal: 1,
    pair: 2,
    json: 3,
    array: 4,
};
NodeType[NodeType.literal] = "literal";
NodeType[NodeType.pair] = "pair";
NodeType[NodeType.json] = "json";
NodeType[NodeType.array] = "array";
/**
 * @record
 */

/** @enum {number} */
const ActionType = {
    add: 1,
    remove: 2,
    move: 3,
    modified: 4,
};
ActionType[ActionType.add] = "add";
ActionType[ActionType.remove] = "remove";
ActionType[ActionType.move] = "move";
ActionType[ActionType.modified] = "modified";
/**
 * @record
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NodeManager {
    constructor() {
    }
    /**
     * @return {?}
     */
    generateNodeId() {
        const /** @type {?} */ min = 1;
        const /** @type {?} */ max = 10000;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    /**
     * @return {?}
     */
    getFilteredText() {
        return this.filteredText;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    getNewNode(node) {
        const /** @type {?} */ id = this.generateNodeId();
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
    /**
     * @param {?} text
     * @return {?}
     */
    setFilteredText(text) {
        this.filteredText = text;
    }
}
NodeManager.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NodeManager.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FreeJsonComponent {
    /**
     * @param {?} manager
     */
    constructor(manager) {
        this.manager = manager;
        this.reasoningCodes = [];
        this.onpublish = new EventEmitter();
        this.onchange = new EventEmitter();
    }
    /**
     * @param {?} node
     * @return {?}
     */
    set root(node) {
        if (node) {
            this.children = node;
            if (this.reasoning) {
                this.reasoning = [];
            }
            const /** @type {?} */ parent = {
                id: this.manager.generateNodeId(),
                name: "Root",
                value: "Object",
                parent: NodeType.array,
                type: NodeType.array,
                expanded: true,
                children: undefined,
                isRoot: true
            };
            parent.children = this.transformNodeToInternalStruction(this.children, parent);
            this.transformedData = [parent];
        }
    }
    /**
     * @return {?}
     */
    get root() {
        return this.children;
    }
    /**
     * @param {?} flag
     * @return {?}
     */
    set save(flag) {
        if (flag) {
            const /** @type {?} */ savedNode = this.transformedInternalStructureBackToNode(this.transformedData[0].children, NodeType.json);
            this.onpublish.emit(savedNode);
        }
    }
    /**
     * @return {?}
     */
    get save() {
        return false;
    }
    /**
     * @param {?} root
     * @param {?} parent
     * @return {?}
     */
    transformedInternalStructureBackToNode(root, parent) {
        let /** @type {?} */ json = {};
        let /** @type {?} */ array = [];
        root.map((item) => {
            if (parent === NodeType.json) {
                if (item.type === NodeType.literal) {
                    array.push(item.value);
                }
                else if (item.type === NodeType.pair) {
                    json[item.name] = item.value;
                }
                else if (item.type === NodeType.array) {
                    json[item.name] = this.transformedInternalStructureBackToNode(item.children, item.parent);
                }
                else if (item.type === NodeType.json) {
                    json[item.name] = this.transformedInternalStructureBackToNode(item.children, item.parent);
                }
            }
            else if (parent === NodeType.array) {
                if (item.type === NodeType.literal) {
                    array.push(item.value);
                }
                else if (item.type === NodeType.json) {
                    array.push(this.transformedInternalStructureBackToNode(item, item.parent));
                }
                else if (item.type === NodeType.array) {
                    array.push(this.transformedInternalStructureBackToNode(item.children, item.parent));
                }
            }
        });
        return array.length ? array : json;
    }
    /**
     * @param {?} node
     * @param {?} parent
     * @return {?}
     */
    transformNodeToInternalStruction(node, parent) {
        let /** @type {?} */ result = node;
        if (node instanceof Array) {
            const /** @type {?} */ children = [];
            node.map((item) => {
                const /** @type {?} */ subNode = {
                    id: this.manager.generateNodeId(),
                    name: "",
                    value: "",
                    parent: NodeType.array,
                    parentNode: parent,
                    type: NodeType.array,
                    children: []
                };
                const /** @type {?} */ jsonValue = this.transformNodeToInternalStruction(item, subNode);
                if (jsonValue instanceof Array) {
                    subNode.children = jsonValue;
                    children.push(subNode);
                }
                else {
                    subNode.value = jsonValue;
                    subNode.type = NodeType.literal;
                    children.push(subNode);
                }
            });
            result = children;
        }
        else if (node instanceof Object) {
            const /** @type {?} */ list = Object.keys(node);
            const /** @type {?} */ children = [];
            list.map((item) => {
                const /** @type {?} */ subNode = {
                    id: this.manager.generateNodeId(),
                    name: item,
                    value: "",
                    parent: NodeType.json,
                    parentNode: parent,
                    type: NodeType.array,
                    children: []
                };
                const /** @type {?} */ jsonValue = this.transformNodeToInternalStruction(node[item], subNode);
                if (jsonValue instanceof Array) {
                    subNode.children = jsonValue;
                    children.push(subNode);
                }
                else {
                    subNode.value = jsonValue;
                    subNode.type = NodeType.pair;
                    children.push(subNode);
                }
            });
            result = children;
        }
        return result;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} event
     * @param {?} node
     * @return {?}
     */
    addNewNode(event, node) {
        event.stopPropagation();
        event.preventDefault();
        if (this.reasoning) {
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
        }
        else {
            node.children = [...node.children, this.manager.getNewNode(node)];
            node.expanded = true;
            this.changePerformed({});
        }
    }
    /**
     * @param {?} event
     * @param {?} node
     * @param {?} moveUp
     * @return {?}
     */
    moveNode(event, node, moveUp) {
        event.stopPropagation();
        event.preventDefault();
        if (this.reasoning) {
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
        }
        else {
            let /** @type {?} */ from = this.transformedData.indexOf(node);
            let /** @type {?} */ to = moveUp ?
                (from > 0 ? from - 1 : from) :
                (from < (this.transformedData.length - 1) ? from + 1 : from);
            this.transformedData.splice(to, 0, this.transformedData.splice(from, 1)[0]);
            this.changePerformed({});
        }
    }
    /**
     * @param {?} event
     * @param {?} node
     * @return {?}
     */
    deleteNode(event, node) {
        event.stopPropagation();
        event.preventDefault();
        if (this.reasoning) {
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
        }
        else {
            this.transformedData.splice(this.transformedData.indexOf(node), 1);
            this.changePerformed({});
        }
    }
    /**
     * @param {?} child
     * @return {?}
     */
    hasChevronDown(child) {
        return child && child.children && child.children.length > 0 && child.expanded;
    }
    /**
     * @param {?} child
     * @return {?}
     */
    hasChevronRight(child) {
        return child && child.children && child.children.length != 0 && !child.expanded;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dragEnabled(event) {
        return !event.medium.isRoot && (event.medium.name.length || event.medium.value.length);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dropEnabled(event) {
        return !event.destination.medium.isRoot;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDragStart(event) {
        // this.manager.setSelectedNode(event.medium);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDragEnd(event) {
        if (event.destination && event.source.medium !== event.destination.medium) {
            const /** @type {?} */ sourceIndex = this.transformedData.indexOf(event.source.medium);
            if (this.reasoning) {
                console.log("adsadas");
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
            }
            else {
                this.transformedData.splice(sourceIndex, 1);
                this.changePerformed({});
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDrop(event) {
        if (event.destination && event.source && event.source.medium !== event.destination.medium) {
            const /** @type {?} */ sourceNode = event.source.medium;
            const /** @type {?} */ destinationNode = event.destination.medium;
            destinationNode.children = [...destinationNode.children, sourceNode];
            if (destinationNode.children.length) {
                destinationNode.expanded = true;
            }
            if (destinationNode.type === NodeType.literal) {
                destinationNode.type = NodeType.json;
                destinationNode.value = "";
            }
            else if (destinationNode.type === NodeType.pair) {
                destinationNode.type = NodeType.json;
            }
            else if (destinationNode.type === NodeType.array) {
                if (destinationNode.parent === NodeType.array && sourceNode.type === NodeType.pair) {
                    sourceNode.type = NodeType.json;
                }
            }
            sourceNode.parent = destinationNode.type;
            const /** @type {?} */ i = sourceNode.parentNode.children.indexOf(sourceNode);
            sourceNode.parentNode.children.splice(i, 1);
            sourceNode.parentNode = destinationNode;
            this.changePerformed({});
        }
    }
    /**
     * @param {?} event
     * @param {?} child
     * @return {?}
     */
    toGrandParent(event, child) {
        event.stopPropagation();
        event.preventDefault();
        const /** @type {?} */ parent = child.parentNode;
        const /** @type {?} */ grandParent = child.parentNode.parentNode;
        const /** @type {?} */ i = parent.children.indexOf(child);
        const /** @type {?} */ p = grandParent.children.indexOf(parent);
        parent.children.splice(i, 1);
        if (parent.children.length === 0) {
            if (!parent.name.length && !parent.value.length) {
                grandParent.children.splice(p, 1);
                grandParent.children.splice(p, 0, child);
            }
            else {
                parent.type = NodeType.pair;
                grandParent.children.splice(p + 1, 0, child);
            }
        }
        else {
            grandParent.children.splice(p + 1, 0, child);
        }
        child.parentNode = grandParent;
        this.changePerformed({});
    }
    /**
     * @return {?}
     */
    getFilteredText() {
        this.manager.getFilteredText();
    }
    /**
     * @param {?} event
     * @param {?} child
     * @return {?}
     */
    toggle(event, child) {
        event.stopPropagation();
        event.preventDefault();
        child.expanded = !child.expanded;
    }
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    keydown(event, item) {
        const /** @type {?} */ code = event.which;
        if ((code === 13) || (code === 32)) {
            this.toggle(event, item);
        }
    }
    /**
     * @param {?} event
     * @param {?} item
     * @param {?} moveUp
     * @return {?}
     */
    keymove(event, item, moveUp) {
        const /** @type {?} */ code = event.which;
        if ((code === 13) || (code === 32)) {
            this.moveNode(event, item, moveUp);
        }
    }
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    keydelete(event, item) {
        const /** @type {?} */ code = event.which;
        if ((code === 13) || (code === 32)) {
            this.deleteNode(event, item);
        }
    }
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    keytoGrandParent(event, item) {
        const /** @type {?} */ code = event.which;
        if ((code === 13) || (code === 32)) {
            this.toGrandParent(event, item);
        }
    }
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    keyadd(event, item) {
        const /** @type {?} */ code = event.which;
        if ((code === 13) || (code === 32)) {
            this.addNewNode(event, item);
        }
    }
    /**
     * @param {?} node
     * @return {?}
     */
    canAddNode(node) {
        return (node.type === NodeType.json) || (node.type === NodeType.array);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    changePerformed(event) {
        if (this.children) {
            const /** @type {?} */ savedNode = this.transformedInternalStructureBackToNode(this.transformedData[0].children, NodeType.json);
            this.onchange.emit({
                data: savedNode,
                reasoning: this.reasoning
            });
        }
        else {
            this.onchange.emit({});
        }
    }
}
FreeJsonComponent.decorators = [
    { type: Component, args: [{
                selector: 'free-json',
                template: `<ul>
  <li  *ngFor="let child of transformedData | nodeSearch"
        [dragEnabled]="dragEnabled.bind(this)"
        [medium]="child"
        (onDragEnd)='onDragEnd($event)'
        (onDragStart)='onDragStart($event)'>
    <div [dropEnabled]="dropEnabled.bind(this)"
        class='tree-node'
        [id] = "child.id"
        [medium]="child"
        [class.move]="!child.isRoot && (child.name.length || child.value.length)"
        (click)="toggle($event, child)"
        (onDrop)='onDrop($event)'>
      <i  class='clickable fa fa-chevron-down'
          tabindex="0"
          title="Collapse {{child.name}}"
          *ngIf='hasChevronDown(child)'
          (keydown)='keydown($event, child)'
          (click)='toggle($event, child)'></i>
      <i  class='clickable fa fa-chevron-right'
          tabindex="0"
          title="Expand {{child.name}}"
          *ngIf='hasChevronRight(child)'
          (keydown)='keydown($event, child)'
          (click)='toggle($event, child)'></i>
      <i  class='fa fa-quote-right'
          arria-hidden="true"
          *ngIf='child.type === 1'></i>
          <i  class='fa fa-random'
          arria-hidden="true"
          *ngIf='child.type === 2'></i>
      <i  class='fa no-action fa-chevron-right'
          arria-hidden="true"
          *ngIf='child.type === 4 && child.children.length == 0'></i>
      <json-label
            (onchange)="changePerformed($event)"
            [node]="child"></json-label>
      <span class="edit-actions">
      <i *ngIf="!child.isRoot"
          class="clickable fa pull-right fa-times"
          tabindex="0"
          title="Delete {{child.name}}"
          (click)='deleteNode($event, child)'
          (keydown)='keydelete($event, child)'></i>
      <i *ngIf="transformedData.length > 1 && !child.isRoot"
          class="clickable fa pull-right fa-angle-double-up"
          tabindex="0"
          title="Move up {{child.name}}"
          (click)='moveNode($event, child, true)'
          (keydown)='keymove($event, child, true)'></i>
      <i *ngIf="transformedData.length > 1 && !child.isRoot"
          class="clickable fa pull-right fa-angle-double-down"
          tabindex="0"
          title="Move down {{child.name}}"
          (click)='moveNode($event, child, false)'
          (keydown)='keymove($event, child, false)'></i>
      <i *ngIf="canAddNode(child)"
          class="clickable fa pull-right fa-plus"
          tabindex="0"
          title="Add New Child"
          (keydown)='keyadd($event, child)'
          (click)='addNewNode($event, child)'></i>
      <i *ngIf="!child.isRoot && child.parentNode.parentNode && (child.name.length || child.value.length)"
          class="clickable fa pull-right fa-angle-double-left"
          tabindex="0"
          title="Move to {{child.parentNode.parentNode.name}}"
          (click)='toGrandParent($event, child)'
          (keydown)='keytoGrandParent($event, child)'></i>
      </span>
    </div>
    <div *ngIf="child.expanded">
      <free-json
            (onchange)="changePerformed($event)"
            [reasoning]="reasoning"
            [reasoningCodes]="reasoningCodes"
            [transformedData]='child.children'></free-json>
    </div>
  </li>
</ul>
`,
                styles: [`ul{list-style:none;min-width:400px}.tree-node{padding:0;border:1px solid #eef1f4;background:#f7f9ff;color:#7c9eb2;margin:3px 0;text-transform:capitalize;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.tree-node i{width:15px;height:15px;margin:10px 3px}.tree-node.move{cursor:move}.clickable{cursor:pointer}.no-action{color:transparent}.edit-actions{border-left:1px solid #eef1f4;float:right}.drag-over{background-color:#7c9eb2;color:#fff}.fa{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.fa-plus-square{color:green}.fa-minus-circle{color:red}`],
            },] },
];
/** @nocollapse */
FreeJsonComponent.ctorParameters = () => [
    { type: NodeManager, },
];
FreeJsonComponent.propDecorators = {
    "transformedData": [{ type: Input, args: ["transformedData",] },],
    "reasoning": [{ type: Input, args: ["reasoning",] },],
    "reasoningCodes": [{ type: Input, args: ["reasoningCodes",] },],
    "root": [{ type: Input },],
    "save": [{ type: Input },],
    "onpublish": [{ type: Output, args: ["onpublish",] },],
    "onchange": [{ type: Output, args: ["onchange",] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FreeJsonSearchField {
    /**
     * @param {?} manager
     */
    constructor(manager) {
        this.manager = manager;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    filter(value) {
        this.manager.setFilteredText(value);
    }
}
FreeJsonSearchField.decorators = [
    { type: Component, args: [{
                selector: 'json-search-field',
                template: `<input type='text' [(ngModel)]='val' (ngModelChange)='filter(val)'>`
            },] },
];
/** @nocollapse */
FreeJsonSearchField.ctorParameters = () => [
    { type: NodeManager, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FreeJsonLabel {
    /**
     * @param {?} renderer
     */
    constructor(renderer) {
        this.renderer = renderer;
        this.editName = false;
        this.editValue = false;
        this.onchange = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    nameLabelKeydown(event) {
        const /** @type {?} */ code = event.which;
        if ((code === 13) || (code === 32)) {
            this.renderer.invokeElementMethod(event.target, "click");
            setTimeout(() => {
                if (this.nameEditor) {
                    this.renderer.invokeElementMethod(this.nameEditor.nativeElement, "focus");
                }
            }, 66);
        }
        else if (code === 27) {
            this.editName = false;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    valueLabelKeydown(event) {
        const /** @type {?} */ code = event.which;
        if ((code === 13) || (code === 32)) {
            this.renderer.invokeElementMethod(event.target, "click");
            setTimeout(() => {
                if (this.valueEditor) {
                    this.renderer.invokeElementMethod(this.valueEditor.nativeElement, "focus");
                }
            }, 66);
        }
        else if (code === 27) {
            this.editValue = false;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    clickName(event) {
        event.stopPropagation();
        event.preventDefault();
        this.editName = this.node.name !== 'Root';
        setTimeout(() => {
            this.renderer.invokeElementMethod(this.nameEditor.nativeElement, "focus");
        }, 66);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    clickValue(event) {
        event.stopPropagation();
        event.preventDefault();
        this.editValue = this.node.value !== 'Object';
        setTimeout(() => {
            this.renderer.invokeElementMethod(this.valueEditor.nativeElement, "focus");
        }, 66);
    }
}
FreeJsonLabel.decorators = [
    { type: Component, args: [{
                selector: 'json-label',
                template: `<span *ngIf="editName && node.name !=='Root' && node.value !=='Object'">
    <input #nameEditor
        type='text'
        id="editName"
        placeholder="Name"
        (blur)="editName = false; onchange.emit();"
        [(ngModel)]='node.name'>
</span>
<span *ngIf='!editName && node.type !== 1'
    class='locked name'
    tabindex='0'
    (keydown)='nameLabelKeydown($event)'
    (click)="clickName($event)"
    [innerHTML]="node.name.length ? node.name : '&nbsp;'">
</span>
<span *ngIf="editValue && node.name !=='Root' && node.value !=='Object'">
    <input #valueEditor
        type='text'
        id="editValue"
        placeholder="Value"
        (blur)="editValue = false; onchange.emit();"
        [(ngModel)]='node.value'>
</span>
<span *ngIf='!editValue && (node.type === 2 || node.type === 1) && node.value!=null'
    class='locked'
    [class.name]="node.type === 4"
    tabindex='0'
    (keydown)='valueLabelKeydown($event)'
    (click)="clickValue($event)"
    [innerHTML]="node.value.length ? node.value : '&nbsp;'">
</span>
`,
                styles: [`:host{margin:10px 0}span.locked{display:inline-block;cursor:pointer;min-width:30px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}span.locked.name{font-weight:700;color:#000}span input{cursor:beam}`]
            },] },
];
/** @nocollapse */
FreeJsonLabel.ctorParameters = () => [
    { type: Renderer, },
];
FreeJsonLabel.propDecorators = {
    "nameEditor": [{ type: ViewChild, args: ["nameEditor",] },],
    "valueEditor": [{ type: ViewChild, args: ["valueEditor",] },],
    "node": [{ type: Input },],
    "onchange": [{ type: Output, args: ["onchange",] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FreeJsonSearch {
    /**
     * @param {?} manager
     */
    constructor(manager) {
        this.manager = manager;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    isBlank(obj) {
        return obj === undefined || obj === null;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    transform(value) {
        var /** @type {?} */ filteredText = this.manager.getFilteredText();
        if (this.isBlank(filteredText)) {
            return value;
        }
        else {
            return value.filter((node) => node.text.indexOf(filteredText) > -1);
        }
    }
}
FreeJsonSearch.decorators = [
    { type: Pipe, args: [{
                name: 'nodeSearch',
                pure: false
            },] },
];
/** @nocollapse */
FreeJsonSearch.ctorParameters = () => [
    { type: NodeManager, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FreeJsonModule {
}
FreeJsonModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    DragDropModule,
                    FormsModule
                ],
                declarations: [
                    FreeJsonComponent,
                    FreeJsonLabel,
                    FreeJsonSearch,
                    FreeJsonSearchField
                ],
                exports: [
                    FreeJsonComponent
                ],
                entryComponents: [],
                providers: [
                    FreeJsonSearch,
                    NodeManager
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            },] },
];
/** @nocollapse */
FreeJsonModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { FreeJsonComponent, NodeType, ActionType, FreeJsonModule, FreeJsonLabel as ɵb, FreeJsonSearchField as ɵd, NodeManager as ɵa, FreeJsonSearch as ɵc };
//# sourceMappingURL=free-json.js.map
