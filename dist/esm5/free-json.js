import { __spread } from 'tslib';
import { Injectable, Component, Input, Output, EventEmitter, ViewChild, Renderer, Pipe, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DragDropModule } from 'drag-enabled';

var NodeType = {
    literal: 1,
    pair: 2,
    json: 3,
    array: 4,
};
NodeType[NodeType.literal] = "literal";
NodeType[NodeType.pair] = "pair";
NodeType[NodeType.json] = "json";
NodeType[NodeType.array] = "array";
var ActionType = {
    add: 1,
    remove: 2,
    move: 3,
    modified: 4,
};
ActionType[ActionType.add] = "add";
ActionType[ActionType.remove] = "remove";
ActionType[ActionType.move] = "move";
ActionType[ActionType.modified] = "modified";
var NodeManager = /** @class */ (function () {
    function NodeManager() {
    }
    NodeManager.prototype.generateNodeId = function () {
        var min = 1;
        var max = 10000;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    NodeManager.prototype.getFilteredText = function () {
        return this.filteredText;
    };
    NodeManager.prototype.getNewNode = function (node) {
        var id = this.generateNodeId();
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
    };
    NodeManager.prototype.setFilteredText = function (text) {
        this.filteredText = text;
    };
    return NodeManager;
}());
NodeManager.decorators = [
    { type: Injectable },
];
NodeManager.ctorParameters = function () { return []; };
var FreeJsonComponent = /** @class */ (function () {
    function FreeJsonComponent(manager) {
        this.manager = manager;
        this.reasoningCodes = [];
        this.onpublish = new EventEmitter();
        this.onchange = new EventEmitter();
    }
    Object.defineProperty(FreeJsonComponent.prototype, "root", {
        get: function () {
            return this.children;
        },
        set: function (node) {
            if (node) {
                this.children = node;
                if (this.reasoning) {
                    this.reasoning = [];
                }
                var parent = {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FreeJsonComponent.prototype, "save", {
        get: function () {
            return false;
        },
        set: function (flag) {
            if (flag) {
                var savedNode = this.transformedInternalStructureBackToNode(this.transformedData[0].children, NodeType.json);
                this.onpublish.emit(savedNode);
            }
        },
        enumerable: true,
        configurable: true
    });
    FreeJsonComponent.prototype.transformedInternalStructureBackToNode = function (root, parent) {
        var _this = this;
        var json = {};
        var array = [];
        root.map(function (item) {
            if (parent === NodeType.json) {
                if (item.type === NodeType.literal) {
                    array.push(item.value);
                }
                else if (item.type === NodeType.pair) {
                    json[item.name] = item.value;
                }
                else if (item.type === NodeType.array) {
                    json[item.name] = _this.transformedInternalStructureBackToNode(item.children, item.parent);
                }
                else if (item.type === NodeType.json) {
                    json[item.name] = _this.transformedInternalStructureBackToNode(item.children, item.parent);
                }
            }
            else if (parent === NodeType.array) {
                if (item.type === NodeType.literal) {
                    array.push(item.value);
                }
                else if (item.type === NodeType.json) {
                    array.push(_this.transformedInternalStructureBackToNode(item, item.parent));
                }
                else if (item.type === NodeType.array) {
                    array.push(_this.transformedInternalStructureBackToNode(item.children, item.parent));
                }
            }
        });
        return array.length ? array : json;
    };
    FreeJsonComponent.prototype.transformNodeToInternalStruction = function (node, parent) {
        var _this = this;
        var result = node;
        if (node instanceof Array) {
            var children_1 = [];
            node.map(function (item) {
                var subNode = {
                    id: _this.manager.generateNodeId(),
                    name: "",
                    value: "",
                    parent: NodeType.array,
                    parentNode: parent,
                    type: NodeType.array,
                    children: []
                };
                var jsonValue = _this.transformNodeToInternalStruction(item, subNode);
                if (jsonValue instanceof Array) {
                    subNode.children = jsonValue;
                    children_1.push(subNode);
                }
                else {
                    subNode.value = jsonValue;
                    subNode.type = NodeType.literal;
                    children_1.push(subNode);
                }
            });
            result = children_1;
        }
        else if (node instanceof Object) {
            var list = Object.keys(node);
            var children_2 = [];
            list.map(function (item) {
                var subNode = {
                    id: _this.manager.generateNodeId(),
                    name: item,
                    value: "",
                    parent: NodeType.json,
                    parentNode: parent,
                    type: NodeType.array,
                    children: []
                };
                var jsonValue = _this.transformNodeToInternalStruction(node[item], subNode);
                if (jsonValue instanceof Array) {
                    subNode.children = jsonValue;
                    children_2.push(subNode);
                }
                else {
                    subNode.value = jsonValue;
                    subNode.type = NodeType.pair;
                    children_2.push(subNode);
                }
            });
            result = children_2;
        }
        return result;
    };
    FreeJsonComponent.prototype.ngOnInit = function () {
    };
    FreeJsonComponent.prototype.addNewNode = function (event, node) {
        event.stopPropagation();
        event.preventDefault();
        if (this.reasoning) {
        }
        else {
            node.children = __spread(node.children, [this.manager.getNewNode(node)]);
            node.expanded = true;
            this.changePerformed({});
        }
    };
    FreeJsonComponent.prototype.moveNode = function (event, node, moveUp) {
        event.stopPropagation();
        event.preventDefault();
        if (this.reasoning) {
        }
        else {
            var from = this.transformedData.indexOf(node);
            var to = moveUp ?
                (from > 0 ? from - 1 : from) :
                (from < (this.transformedData.length - 1) ? from + 1 : from);
            this.transformedData.splice(to, 0, this.transformedData.splice(from, 1)[0]);
            this.changePerformed({});
        }
    };
    FreeJsonComponent.prototype.deleteNode = function (event, node) {
        event.stopPropagation();
        event.preventDefault();
        if (this.reasoning) {
        }
        else {
            this.transformedData.splice(this.transformedData.indexOf(node), 1);
            this.changePerformed({});
        }
    };
    FreeJsonComponent.prototype.hasChevronDown = function (child) {
        return child && child.children && child.children.length > 0 && child.expanded;
    };
    FreeJsonComponent.prototype.hasChevronRight = function (child) {
        return child && child.children && child.children.length != 0 && !child.expanded;
    };
    FreeJsonComponent.prototype.dragEnabled = function (event) {
        return !event.medium.isRoot && (event.medium.name.length || event.medium.value.length);
    };
    FreeJsonComponent.prototype.dropEnabled = function (event) {
        return !event.destination.medium.isRoot;
    };
    FreeJsonComponent.prototype.onDragStart = function (event) {
    };
    FreeJsonComponent.prototype.onDragEnd = function (event) {
        if (event.destination && event.source.medium !== event.destination.medium) {
            var sourceIndex = this.transformedData.indexOf(event.source.medium);
            if (this.reasoning) {
                console.log("adsadas");
            }
            else {
                this.transformedData.splice(sourceIndex, 1);
                this.changePerformed({});
            }
        }
    };
    FreeJsonComponent.prototype.onDrop = function (event) {
        if (event.destination && event.source && event.source.medium !== event.destination.medium) {
            var sourceNode = event.source.medium;
            var destinationNode = event.destination.medium;
            destinationNode.children = __spread(destinationNode.children, [sourceNode]);
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
            var i = sourceNode.parentNode.children.indexOf(sourceNode);
            sourceNode.parentNode.children.splice(i, 1);
            sourceNode.parentNode = destinationNode;
            this.changePerformed({});
        }
    };
    FreeJsonComponent.prototype.toGrandParent = function (event, child) {
        event.stopPropagation();
        event.preventDefault();
        var parent = child.parentNode;
        var grandParent = child.parentNode.parentNode;
        var i = parent.children.indexOf(child);
        var p = grandParent.children.indexOf(parent);
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
    };
    FreeJsonComponent.prototype.getFilteredText = function () {
        this.manager.getFilteredText();
    };
    FreeJsonComponent.prototype.toggle = function (event, child) {
        event.stopPropagation();
        event.preventDefault();
        child.expanded = !child.expanded;
    };
    FreeJsonComponent.prototype.keydown = function (event, item) {
        var code = event.which;
        if ((code === 13) || (code === 32)) {
            this.toggle(event, item);
        }
    };
    FreeJsonComponent.prototype.keymove = function (event, item, moveUp) {
        var code = event.which;
        if ((code === 13) || (code === 32)) {
            this.moveNode(event, item, moveUp);
        }
    };
    FreeJsonComponent.prototype.keydelete = function (event, item) {
        var code = event.which;
        if ((code === 13) || (code === 32)) {
            this.deleteNode(event, item);
        }
    };
    FreeJsonComponent.prototype.keytoGrandParent = function (event, item) {
        var code = event.which;
        if ((code === 13) || (code === 32)) {
            this.toGrandParent(event, item);
        }
    };
    FreeJsonComponent.prototype.keyadd = function (event, item) {
        var code = event.which;
        if ((code === 13) || (code === 32)) {
            this.addNewNode(event, item);
        }
    };
    FreeJsonComponent.prototype.canAddNode = function (node) {
        return (node.type === NodeType.json) || (node.type === NodeType.array);
    };
    FreeJsonComponent.prototype.changePerformed = function (event) {
        if (this.children) {
            var savedNode = this.transformedInternalStructureBackToNode(this.transformedData[0].children, NodeType.json);
            this.onchange.emit({
                data: savedNode,
                reasoning: this.reasoning
            });
        }
        else {
            this.onchange.emit({});
        }
    };
    return FreeJsonComponent;
}());
FreeJsonComponent.decorators = [
    { type: Component, args: [{
                selector: 'free-json',
                template: "<ul>\n  <li  *ngFor=\"let child of transformedData | nodeSearch\"\n        [dragEnabled]=\"dragEnabled.bind(this)\"\n        [medium]=\"child\"\n        (onDragEnd)='onDragEnd($event)'\n        (onDragStart)='onDragStart($event)'>\n    <div [dropEnabled]=\"dropEnabled.bind(this)\"\n        class='tree-node'\n        [id] = \"child.id\"\n        [medium]=\"child\"\n        [class.move]=\"!child.isRoot && (child.name.length || child.value.length)\"\n        (click)=\"toggle($event, child)\"\n        (onDrop)='onDrop($event)'>\n      <i  class='clickable fa fa-chevron-down'\n          tabindex=\"0\"\n          title=\"Collapse {{child.name}}\"\n          *ngIf='hasChevronDown(child)'\n          (keydown)='keydown($event, child)'\n          (click)='toggle($event, child)'></i>\n      <i  class='clickable fa fa-chevron-right'\n          tabindex=\"0\"\n          title=\"Expand {{child.name}}\"\n          *ngIf='hasChevronRight(child)'\n          (keydown)='keydown($event, child)'\n          (click)='toggle($event, child)'></i>\n      <i  class='fa fa-quote-right'\n          arria-hidden=\"true\"\n          *ngIf='child.type === 1'></i>\n          <i  class='fa fa-random'\n          arria-hidden=\"true\"\n          *ngIf='child.type === 2'></i>\n      <i  class='fa no-action fa-chevron-right'\n          arria-hidden=\"true\"\n          *ngIf='child.type === 4 && child.children.length == 0'></i>\n      <json-label\n            (onchange)=\"changePerformed($event)\"\n            [node]=\"child\"></json-label>\n      <span class=\"edit-actions\">\n      <i *ngIf=\"!child.isRoot\"\n          class=\"clickable fa pull-right fa-times\"\n          tabindex=\"0\"\n          title=\"Delete {{child.name}}\"\n          (click)='deleteNode($event, child)'\n          (keydown)='keydelete($event, child)'></i>\n      <i *ngIf=\"transformedData.length > 1 && !child.isRoot\"\n          class=\"clickable fa pull-right fa-angle-double-up\"\n          tabindex=\"0\"\n          title=\"Move up {{child.name}}\"\n          (click)='moveNode($event, child, true)'\n          (keydown)='keymove($event, child, true)'></i>\n      <i *ngIf=\"transformedData.length > 1 && !child.isRoot\"\n          class=\"clickable fa pull-right fa-angle-double-down\"\n          tabindex=\"0\"\n          title=\"Move down {{child.name}}\"\n          (click)='moveNode($event, child, false)'\n          (keydown)='keymove($event, child, false)'></i>\n      <i *ngIf=\"canAddNode(child)\"\n          class=\"clickable fa pull-right fa-plus\"\n          tabindex=\"0\"\n          title=\"Add New Child\"\n          (keydown)='keyadd($event, child)'\n          (click)='addNewNode($event, child)'></i>\n      <i *ngIf=\"!child.isRoot && child.parentNode.parentNode && (child.name.length || child.value.length)\"\n          class=\"clickable fa pull-right fa-angle-double-left\"\n          tabindex=\"0\"\n          title=\"Move to {{child.parentNode.parentNode.name}}\"\n          (click)='toGrandParent($event, child)'\n          (keydown)='keytoGrandParent($event, child)'></i>\n      </span>\n    </div>\n    <div *ngIf=\"child.expanded\">\n      <free-json\n            (onchange)=\"changePerformed($event)\"\n            [reasoning]=\"reasoning\"\n            [reasoningCodes]=\"reasoningCodes\"\n            [transformedData]='child.children'></free-json>\n    </div>\n  </li>\n</ul>\n",
                styles: ["ul{list-style:none;min-width:400px}.tree-node{padding:0;border:1px solid #eef1f4;background:#f7f9ff;color:#7c9eb2;margin:3px 0;text-transform:capitalize;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.tree-node i{width:15px;height:15px;margin:10px 3px}.tree-node.move{cursor:move}.clickable{cursor:pointer}.no-action{color:transparent}.edit-actions{border-left:1px solid #eef1f4;float:right}.drag-over{background-color:#7c9eb2;color:#fff}.fa{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.fa-plus-square{color:green}.fa-minus-circle{color:red}"],
            },] },
];
FreeJsonComponent.ctorParameters = function () { return [
    { type: NodeManager, },
]; };
FreeJsonComponent.propDecorators = {
    "transformedData": [{ type: Input, args: ["transformedData",] },],
    "reasoning": [{ type: Input, args: ["reasoning",] },],
    "reasoningCodes": [{ type: Input, args: ["reasoningCodes",] },],
    "root": [{ type: Input },],
    "save": [{ type: Input },],
    "onpublish": [{ type: Output, args: ["onpublish",] },],
    "onchange": [{ type: Output, args: ["onchange",] },],
};
var FreeJsonSearchField = /** @class */ (function () {
    function FreeJsonSearchField(manager) {
        this.manager = manager;
    }
    FreeJsonSearchField.prototype.filter = function (value) {
        this.manager.setFilteredText(value);
    };
    return FreeJsonSearchField;
}());
FreeJsonSearchField.decorators = [
    { type: Component, args: [{
                selector: 'json-search-field',
                template: "<input type='text' [(ngModel)]='val' (ngModelChange)='filter(val)'>"
            },] },
];
FreeJsonSearchField.ctorParameters = function () { return [
    { type: NodeManager, },
]; };
var FreeJsonLabel = /** @class */ (function () {
    function FreeJsonLabel(renderer) {
        this.renderer = renderer;
        this.editName = false;
        this.editValue = false;
        this.onchange = new EventEmitter();
    }
    FreeJsonLabel.prototype.nameLabelKeydown = function (event) {
        var _this = this;
        var code = event.which;
        if ((code === 13) || (code === 32)) {
            this.renderer.invokeElementMethod(event.target, "click");
            setTimeout(function () {
                if (_this.nameEditor) {
                    _this.renderer.invokeElementMethod(_this.nameEditor.nativeElement, "focus");
                }
            }, 66);
        }
        else if (code === 27) {
            this.editName = false;
        }
    };
    FreeJsonLabel.prototype.valueLabelKeydown = function (event) {
        var _this = this;
        var code = event.which;
        if ((code === 13) || (code === 32)) {
            this.renderer.invokeElementMethod(event.target, "click");
            setTimeout(function () {
                if (_this.valueEditor) {
                    _this.renderer.invokeElementMethod(_this.valueEditor.nativeElement, "focus");
                }
            }, 66);
        }
        else if (code === 27) {
            this.editValue = false;
        }
    };
    FreeJsonLabel.prototype.clickName = function (event) {
        var _this = this;
        event.stopPropagation();
        event.preventDefault();
        this.editName = this.node.name !== 'Root';
        setTimeout(function () {
            _this.renderer.invokeElementMethod(_this.nameEditor.nativeElement, "focus");
        }, 66);
    };
    FreeJsonLabel.prototype.clickValue = function (event) {
        var _this = this;
        event.stopPropagation();
        event.preventDefault();
        this.editValue = this.node.value !== 'Object';
        setTimeout(function () {
            _this.renderer.invokeElementMethod(_this.valueEditor.nativeElement, "focus");
        }, 66);
    };
    return FreeJsonLabel;
}());
FreeJsonLabel.decorators = [
    { type: Component, args: [{
                selector: 'json-label',
                template: "<span *ngIf=\"editName && node.name !=='Root' && node.value !=='Object'\">\n    <input #nameEditor\n        type='text'\n        id=\"editName\"\n        placeholder=\"Name\"\n        (blur)=\"editName = false; onchange.emit();\"\n        [(ngModel)]='node.name'>\n</span>\n<span *ngIf='!editName && node.type !== 1'\n    class='locked name'\n    tabindex='0'\n    (keydown)='nameLabelKeydown($event)'\n    (click)=\"clickName($event)\"\n    [innerHTML]=\"node.name.length ? node.name : '&nbsp;'\">\n</span>\n<span *ngIf=\"editValue && node.name !=='Root' && node.value !=='Object'\">\n    <input #valueEditor\n        type='text'\n        id=\"editValue\"\n        placeholder=\"Value\"\n        (blur)=\"editValue = false; onchange.emit();\"\n        [(ngModel)]='node.value'>\n</span>\n<span *ngIf='!editValue && (node.type === 2 || node.type === 1) && node.value!=null'\n    class='locked'\n    [class.name]=\"node.type === 4\"\n    tabindex='0'\n    (keydown)='valueLabelKeydown($event)'\n    (click)=\"clickValue($event)\"\n    [innerHTML]=\"node.value.length ? node.value : '&nbsp;'\">\n</span>\n",
                styles: [":host{margin:10px 0}span.locked{display:inline-block;cursor:pointer;min-width:30px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}span.locked.name{font-weight:700;color:#000}span input{cursor:beam}"]
            },] },
];
FreeJsonLabel.ctorParameters = function () { return [
    { type: Renderer, },
]; };
FreeJsonLabel.propDecorators = {
    "nameEditor": [{ type: ViewChild, args: ["nameEditor",] },],
    "valueEditor": [{ type: ViewChild, args: ["valueEditor",] },],
    "node": [{ type: Input },],
    "onchange": [{ type: Output, args: ["onchange",] },],
};
var FreeJsonSearch = /** @class */ (function () {
    function FreeJsonSearch(manager) {
        this.manager = manager;
    }
    FreeJsonSearch.prototype.isBlank = function (obj) {
        return obj === undefined || obj === null;
    };
    FreeJsonSearch.prototype.transform = function (value) {
        var filteredText = this.manager.getFilteredText();
        if (this.isBlank(filteredText)) {
            return value;
        }
        else {
            return value.filter(function (node) { return node.text.indexOf(filteredText) > -1; });
        }
    };
    return FreeJsonSearch;
}());
FreeJsonSearch.decorators = [
    { type: Pipe, args: [{
                name: 'nodeSearch',
                pure: false
            },] },
];
FreeJsonSearch.ctorParameters = function () { return [
    { type: NodeManager, },
]; };
var FreeJsonModule = /** @class */ (function () {
    function FreeJsonModule() {
    }
    return FreeJsonModule;
}());
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
FreeJsonModule.ctorParameters = function () { return []; };

export { FreeJsonComponent, NodeType, ActionType, FreeJsonModule, FreeJsonLabel as ɵb, FreeJsonSearchField as ɵd, NodeManager as ɵa, FreeJsonSearch as ɵc };
//# sourceMappingURL=free-json.js.map
