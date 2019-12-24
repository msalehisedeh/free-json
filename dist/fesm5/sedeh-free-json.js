import { __decorate, __spread } from 'tslib';
import { Injectable, EventEmitter, Input, Output, Component, Renderer, ViewChild, Pipe, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@sedeh/drag-enabled';

var NodeType;
(function (NodeType) {
    NodeType[NodeType["literal"] = 1] = "literal";
    NodeType[NodeType["pair"] = 2] = "pair";
    NodeType[NodeType["json"] = 3] = "json";
    NodeType[NodeType["array"] = 4] = "array";
})(NodeType || (NodeType = {}));
var ActionType;
(function (ActionType) {
    ActionType[ActionType["add"] = 1] = "add";
    ActionType[ActionType["remove"] = 2] = "remove";
    ActionType[ActionType["move"] = 3] = "move";
    ActionType[ActionType["modified"] = 4] = "modified";
})(ActionType || (ActionType = {}));

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
    NodeManager = __decorate([
        Injectable()
    ], NodeManager);
    return NodeManager;
}());

//import { FreeJsonDialog } from './json-dialog.component';
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
                var parent_1 = {
                    id: this.manager.generateNodeId(),
                    name: "Root",
                    value: "Object",
                    parent: NodeType.array,
                    type: NodeType.array,
                    expanded: true,
                    children: undefined,
                    isRoot: true
                };
                parent_1.children = this.transformNodeToInternalStruction(this.children, parent_1);
                this.transformedData = [parent_1];
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
            node.children = __spread(node.children, [this.manager.getNewNode(node)]);
            node.expanded = true;
            this.changePerformed({});
        }
    };
    FreeJsonComponent.prototype.moveNode = function (event, node, moveUp) {
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
        // this.manager.setSelectedNode(event.medium);
    };
    FreeJsonComponent.prototype.onDragEnd = function (event) {
        if (event.destination && event.source.medium !== event.destination.medium) {
            var sourceIndex = this.transformedData.indexOf(event.source.medium);
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
    FreeJsonComponent.ctorParameters = function () { return [
        { type: NodeManager }
    ]; };
    __decorate([
        Input("transformedData")
    ], FreeJsonComponent.prototype, "transformedData", void 0);
    __decorate([
        Input("reasoning")
    ], FreeJsonComponent.prototype, "reasoning", void 0);
    __decorate([
        Input("reasoningCodes")
    ], FreeJsonComponent.prototype, "reasoningCodes", void 0);
    __decorate([
        Input()
    ], FreeJsonComponent.prototype, "root", null);
    __decorate([
        Input()
    ], FreeJsonComponent.prototype, "save", null);
    __decorate([
        Output("onpublish")
    ], FreeJsonComponent.prototype, "onpublish", void 0);
    __decorate([
        Output("onchange")
    ], FreeJsonComponent.prototype, "onchange", void 0);
    FreeJsonComponent = __decorate([
        Component({
            selector: 'free-json',
            template: "<ul>\r\n  <li  *ngFor=\"let child of transformedData | nodeSearch\"\r\n        [dragEnabled]=\"dragEnabled.bind(this)\"\r\n        [medium]=\"child\"\r\n        (onDragEnd)='onDragEnd($event)'\r\n        (onDragStart)='onDragStart($event)'>\r\n    <div [dropEnabled]=\"dropEnabled.bind(this)\" \r\n        class='tree-node'\r\n        [id] = \"child.id\"\r\n        [medium]=\"child\"\r\n        [class.move]=\"!child.isRoot && (child.name.length || child.value.length)\"\r\n        (click)=\"toggle($event, child)\"\r\n        (onDrop)='onDrop($event)'>\r\n      <i  class='clickable fa fa-chevron-down' \r\n          tabindex=\"0\"\r\n          title=\"Collapse {{child.name}}\"\r\n          *ngIf='hasChevronDown(child)' \r\n          (keydown)='keydown($event, child)'\r\n          (click)='toggle($event, child)'></i>\r\n      <i  class='clickable fa fa-chevron-right' \r\n          tabindex=\"0\"\r\n          title=\"Expand {{child.name}}\"\r\n          *ngIf='hasChevronRight(child)' \r\n          (keydown)='keydown($event, child)'\r\n          (click)='toggle($event, child)'></i>\r\n      <i  class='fa fa-quote-right' \r\n          arria-hidden=\"true\"\r\n          *ngIf='child.type === 1'></i>\r\n          <i  class='fa fa-random' \r\n          arria-hidden=\"true\"\r\n          *ngIf='child.type === 2'></i>\r\n      <i  class='fa no-action fa-chevron-right' \r\n          arria-hidden=\"true\"\r\n          *ngIf='child.type === 4 && child.children.length == 0'></i>\r\n      <json-label \r\n            (onchange)=\"changePerformed($event)\"\r\n            [node]=\"child\"></json-label>\r\n      <span class=\"edit-actions\">\r\n      <i *ngIf=\"!child.isRoot\"\r\n          class=\"clickable fa pull-right fa-times\" \r\n          tabindex=\"0\"\r\n          title=\"Delete {{child.name}}\"\r\n          (click)='deleteNode($event, child)' \r\n          (keydown)='keydelete($event, child)'></i>\r\n      <i *ngIf=\"transformedData.length > 1 && !child.isRoot\"\r\n          class=\"clickable fa pull-right fa-angle-double-up\" \r\n          tabindex=\"0\"\r\n          title=\"Move up {{child.name}}\"\r\n          (click)='moveNode($event, child, true)' \r\n          (keydown)='keymove($event, child, true)'></i>\r\n      <i *ngIf=\"transformedData.length > 1 && !child.isRoot\"\r\n          class=\"clickable fa pull-right fa-angle-double-down\" \r\n          tabindex=\"0\"\r\n          title=\"Move down {{child.name}}\"\r\n          (click)='moveNode($event, child, false)' \r\n          (keydown)='keymove($event, child, false)'></i>\r\n      <i *ngIf=\"canAddNode(child)\"\r\n          class=\"clickable fa pull-right fa-plus\" \r\n          tabindex=\"0\"\r\n          title=\"Add New Child\"\r\n          (keydown)='keyadd($event, child)'\r\n          (click)='addNewNode($event, child)'></i>\r\n      <i *ngIf=\"!child.isRoot && child.parentNode.parentNode && (child.name.length || child.value.length)\"\r\n          class=\"clickable fa pull-right fa-angle-double-left\" \r\n          tabindex=\"0\"\r\n          title=\"Move to {{child.parentNode.parentNode.name}}\"\r\n          (click)='toGrandParent($event, child)' \r\n          (keydown)='keytoGrandParent($event, child)'></i>\r\n      </span>\r\n    </div>\r\n    <div *ngIf=\"child.expanded\">\r\n      <free-json \r\n            (onchange)=\"changePerformed($event)\"\r\n            [reasoning]=\"reasoning\"\r\n            [reasoningCodes]=\"reasoningCodes\"\r\n            [transformedData]='child.children'></free-json>\r\n    </div>\r\n  </li>\r\n</ul>\r\n\r\n",
            styles: ["ul{list-style:none;min-width:400px}.tree-node{padding:0;border:1px solid #eef1f4;background:#f7f9ff;color:#7c9eb2;margin:3px 0;text-transform:capitalize;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.tree-node i{width:15px;height:15px;margin:10px 3px}.tree-node.move{cursor:move}.clickable{cursor:pointer}.no-action{color:transparent}.edit-actions{border-left:1px solid #eef1f4;float:right}.drag-over{background-color:#7c9eb2;color:#fff}.fa{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.fa-plus-square{color:green}.fa-minus-circle{color:red}"]
        })
    ], FreeJsonComponent);
    return FreeJsonComponent;
}());

var FreeJsonSearchField = /** @class */ (function () {
    function FreeJsonSearchField(manager) {
        this.manager = manager;
    }
    FreeJsonSearchField.prototype.filter = function (value) {
        this.manager.setFilteredText(value);
    };
    FreeJsonSearchField.ctorParameters = function () { return [
        { type: NodeManager }
    ]; };
    __decorate([
        Input("val")
    ], FreeJsonSearchField.prototype, "val", void 0);
    FreeJsonSearchField = __decorate([
        Component({
            selector: 'json-search-field',
            template: "<input type='text' [(ngModel)]='val' (ngModelChange)='filter(val)'>"
        })
    ], FreeJsonSearchField);
    return FreeJsonSearchField;
}());

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
    FreeJsonLabel.ctorParameters = function () { return [
        { type: Renderer }
    ]; };
    __decorate([
        ViewChild("nameEditor", { static: false })
    ], FreeJsonLabel.prototype, "nameEditor", void 0);
    __decorate([
        ViewChild("valueEditor", { static: false })
    ], FreeJsonLabel.prototype, "valueEditor", void 0);
    __decorate([
        Input()
    ], FreeJsonLabel.prototype, "node", void 0);
    __decorate([
        Output("onchange")
    ], FreeJsonLabel.prototype, "onchange", void 0);
    FreeJsonLabel = __decorate([
        Component({
            selector: 'json-label',
            template: "<span *ngIf=\"editName && node.name !=='Root' && node.value !=='Object'\">\r\n    <input #nameEditor\r\n        type='text' \r\n        id=\"editName\"\r\n        placeholder=\"Name\"\r\n        (blur)=\"editName = false; onchange.emit();\" \r\n        [(ngModel)]='node.name'>\r\n</span>\r\n<span *ngIf='!editName && node.type !== 1'\r\n    class='locked name' \r\n    tabindex='0' \r\n    (keydown)='nameLabelKeydown($event)'\r\n    (click)=\"clickName($event)\"\r\n    [innerHTML]=\"node.name.length ? node.name : '&nbsp;'\">\r\n</span>\r\n<span *ngIf=\"editValue && node.name !=='Root' && node.value !=='Object'\">\r\n    <input #valueEditor\r\n        type='text' \r\n        id=\"editValue\"\r\n        placeholder=\"Value\"\r\n        (blur)=\"editValue = false; onchange.emit();\" \r\n        [(ngModel)]='node.value'>\r\n</span>\r\n<span *ngIf='!editValue && (node.type === 2 || node.type === 1) && node.value!=null'\r\n    class='locked' \r\n    [class.name]=\"node.type === 4\"\r\n    tabindex='0' \r\n    (keydown)='valueLabelKeydown($event)'\r\n    (click)=\"clickValue($event)\"\r\n    [innerHTML]=\"node.value.length ? node.value : '&nbsp;'\">\r\n</span>\r\n",
            styles: [":host{margin:10px 0}span.locked{display:inline-block;cursor:pointer;min-width:30px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}span.locked.name{font-weight:700;color:#000}span input{cursor:beam}"]
        })
    ], FreeJsonLabel);
    return FreeJsonLabel;
}());

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
    FreeJsonSearch.ctorParameters = function () { return [
        { type: NodeManager }
    ]; };
    FreeJsonSearch = __decorate([
        Pipe({
            name: 'nodeSearch',
            pure: false
        })
    ], FreeJsonSearch);
    return FreeJsonSearch;
}());

var FreeJsonModule = /** @class */ (function () {
    function FreeJsonModule() {
    }
    FreeJsonModule = __decorate([
        NgModule({
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
        })
    ], FreeJsonModule);
    return FreeJsonModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { ActionType, FreeJsonComponent, FreeJsonModule, NodeType, NodeManager as ɵa, FreeJsonLabel as ɵb, FreeJsonSearch as ɵc, FreeJsonSearchField as ɵd };
//# sourceMappingURL=sedeh-free-json.js.map
