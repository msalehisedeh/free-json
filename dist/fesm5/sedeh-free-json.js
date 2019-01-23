import { Injectable, Component, Input, Output, EventEmitter, ViewChild, Renderer, Pipe, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { __spread } from 'tslib';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@sedeh/drag-enabled';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {number} */
var NodeType = {
    literal: 1,
    pair: 2,
    json: 3,
    array: 4,
};
NodeType[NodeType.literal] = 'literal';
NodeType[NodeType.pair] = 'pair';
NodeType[NodeType.json] = 'json';
NodeType[NodeType.array] = 'array';
/** @enum {number} */
var ActionType = {
    add: 1,
    remove: 2,
    move: 3,
    modified: 4,
};
ActionType[ActionType.add] = 'add';
ActionType[ActionType.remove] = 'remove';
ActionType[ActionType.move] = 'move';
ActionType[ActionType.modified] = 'modified';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NodeManager = /** @class */ (function () {
    function NodeManager() {
    }
    /**
     * @return {?}
     */
    NodeManager.prototype.generateNodeId = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var min = 1;
        /** @type {?} */
        var max = 10000;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    /**
     * @return {?}
     */
    NodeManager.prototype.getFilteredText = /**
     * @return {?}
     */
    function () {
        return this.filteredText;
    };
    /**
     * @param {?} node
     * @return {?}
     */
    NodeManager.prototype.getNewNode = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        /** @type {?} */
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
    /**
     * @param {?} text
     * @return {?}
     */
    NodeManager.prototype.setFilteredText = /**
     * @param {?} text
     * @return {?}
     */
    function (text) {
        this.filteredText = text;
    };
    NodeManager.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    NodeManager.ctorParameters = function () { return []; };
    return NodeManager;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var FreeJsonComponent = /** @class */ (function () {
    function FreeJsonComponent(manager) {
        this.manager = manager;
        this.reasoningCodes = [];
        this.onpublish = new EventEmitter();
        this.onchange = new EventEmitter();
    }
    Object.defineProperty(FreeJsonComponent.prototype, "root", {
        get: /**
         * @return {?}
         */
        function () {
            return this.children;
        },
        set: /**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            if (node) {
                this.children = node;
                if (this.reasoning) {
                    this.reasoning = [];
                }
                /** @type {?} */
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
        get: /**
         * @return {?}
         */
        function () {
            return false;
        },
        set: /**
         * @param {?} flag
         * @return {?}
         */
        function (flag) {
            if (flag) {
                /** @type {?} */
                var savedNode = this.transformedInternalStructureBackToNode(this.transformedData[0].children, NodeType.json);
                this.onpublish.emit(savedNode);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} root
     * @param {?} parent
     * @return {?}
     */
    FreeJsonComponent.prototype.transformedInternalStructureBackToNode = /**
     * @param {?} root
     * @param {?} parent
     * @return {?}
     */
    function (root, parent) {
        var _this = this;
        /** @type {?} */
        var json = {};
        /** @type {?} */
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
    /**
     * @param {?} node
     * @param {?} parent
     * @return {?}
     */
    FreeJsonComponent.prototype.transformNodeToInternalStruction = /**
     * @param {?} node
     * @param {?} parent
     * @return {?}
     */
    function (node, parent) {
        var _this = this;
        /** @type {?} */
        var result = node;
        if (node instanceof Array) {
            /** @type {?} */
            var children_1 = [];
            node.map(function (item) {
                /** @type {?} */
                var subNode = {
                    id: _this.manager.generateNodeId(),
                    name: "",
                    value: "",
                    parent: NodeType.array,
                    parentNode: parent,
                    type: NodeType.array,
                    children: []
                };
                /** @type {?} */
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
            /** @type {?} */
            var list = Object.keys(node);
            /** @type {?} */
            var children_2 = [];
            list.map(function (item) {
                /** @type {?} */
                var subNode = {
                    id: _this.manager.generateNodeId(),
                    name: item,
                    value: "",
                    parent: NodeType.json,
                    parentNode: parent,
                    type: NodeType.array,
                    children: []
                };
                /** @type {?} */
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
    /**
     * @return {?}
     */
    FreeJsonComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} event
     * @param {?} node
     * @return {?}
     */
    FreeJsonComponent.prototype.addNewNode = /**
     * @param {?} event
     * @param {?} node
     * @return {?}
     */
    function (event, node) {
        event.stopPropagation();
        event.preventDefault();
        if (this.reasoning) ;
        else {
            node.children = __spread(node.children, [this.manager.getNewNode(node)]);
            node.expanded = true;
            this.changePerformed({});
        }
    };
    /**
     * @param {?} event
     * @param {?} node
     * @param {?} moveUp
     * @return {?}
     */
    FreeJsonComponent.prototype.moveNode = /**
     * @param {?} event
     * @param {?} node
     * @param {?} moveUp
     * @return {?}
     */
    function (event, node, moveUp) {
        event.stopPropagation();
        event.preventDefault();
        if (this.reasoning) ;
        else {
            /** @type {?} */
            var from = this.transformedData.indexOf(node);
            /** @type {?} */
            var to = moveUp ?
                (from > 0 ? from - 1 : from) :
                (from < (this.transformedData.length - 1) ? from + 1 : from);
            this.transformedData.splice(to, 0, this.transformedData.splice(from, 1)[0]);
            this.changePerformed({});
        }
    };
    /**
     * @param {?} event
     * @param {?} node
     * @return {?}
     */
    FreeJsonComponent.prototype.deleteNode = /**
     * @param {?} event
     * @param {?} node
     * @return {?}
     */
    function (event, node) {
        event.stopPropagation();
        event.preventDefault();
        if (this.reasoning) ;
        else {
            this.transformedData.splice(this.transformedData.indexOf(node), 1);
            this.changePerformed({});
        }
    };
    /**
     * @param {?} child
     * @return {?}
     */
    FreeJsonComponent.prototype.hasChevronDown = /**
     * @param {?} child
     * @return {?}
     */
    function (child) {
        return child && child.children && child.children.length > 0 && child.expanded;
    };
    /**
     * @param {?} child
     * @return {?}
     */
    FreeJsonComponent.prototype.hasChevronRight = /**
     * @param {?} child
     * @return {?}
     */
    function (child) {
        return child && child.children && child.children.length != 0 && !child.expanded;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FreeJsonComponent.prototype.dragEnabled = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        return !event.medium.isRoot && (event.medium.name.length || event.medium.value.length);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FreeJsonComponent.prototype.dropEnabled = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        return !event.destination.medium.isRoot;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FreeJsonComponent.prototype.onDragStart = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // this.manager.setSelectedNode(event.medium);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FreeJsonComponent.prototype.onDragEnd = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.destination && event.source.medium !== event.destination.medium) {
            /** @type {?} */
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
    /**
     * @param {?} event
     * @return {?}
     */
    FreeJsonComponent.prototype.onDrop = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.destination && event.source && event.source.medium !== event.destination.medium) {
            /** @type {?} */
            var sourceNode = event.source.medium;
            /** @type {?} */
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
            /** @type {?} */
            var i = sourceNode.parentNode.children.indexOf(sourceNode);
            sourceNode.parentNode.children.splice(i, 1);
            sourceNode.parentNode = destinationNode;
            this.changePerformed({});
        }
    };
    /**
     * @param {?} event
     * @param {?} child
     * @return {?}
     */
    FreeJsonComponent.prototype.toGrandParent = /**
     * @param {?} event
     * @param {?} child
     * @return {?}
     */
    function (event, child) {
        event.stopPropagation();
        event.preventDefault();
        /** @type {?} */
        var parent = child.parentNode;
        /** @type {?} */
        var grandParent = child.parentNode.parentNode;
        /** @type {?} */
        var i = parent.children.indexOf(child);
        /** @type {?} */
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
    /**
     * @return {?}
     */
    FreeJsonComponent.prototype.getFilteredText = /**
     * @return {?}
     */
    function () {
        this.manager.getFilteredText();
    };
    /**
     * @param {?} event
     * @param {?} child
     * @return {?}
     */
    FreeJsonComponent.prototype.toggle = /**
     * @param {?} event
     * @param {?} child
     * @return {?}
     */
    function (event, child) {
        event.stopPropagation();
        event.preventDefault();
        child.expanded = !child.expanded;
    };
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    FreeJsonComponent.prototype.keydown = /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    function (event, item) {
        /** @type {?} */
        var code = event.which;
        if ((code === 13) || (code === 32)) {
            this.toggle(event, item);
        }
    };
    /**
     * @param {?} event
     * @param {?} item
     * @param {?} moveUp
     * @return {?}
     */
    FreeJsonComponent.prototype.keymove = /**
     * @param {?} event
     * @param {?} item
     * @param {?} moveUp
     * @return {?}
     */
    function (event, item, moveUp) {
        /** @type {?} */
        var code = event.which;
        if ((code === 13) || (code === 32)) {
            this.moveNode(event, item, moveUp);
        }
    };
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    FreeJsonComponent.prototype.keydelete = /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    function (event, item) {
        /** @type {?} */
        var code = event.which;
        if ((code === 13) || (code === 32)) {
            this.deleteNode(event, item);
        }
    };
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    FreeJsonComponent.prototype.keytoGrandParent = /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    function (event, item) {
        /** @type {?} */
        var code = event.which;
        if ((code === 13) || (code === 32)) {
            this.toGrandParent(event, item);
        }
    };
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    FreeJsonComponent.prototype.keyadd = /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    function (event, item) {
        /** @type {?} */
        var code = event.which;
        if ((code === 13) || (code === 32)) {
            this.addNewNode(event, item);
        }
    };
    /**
     * @param {?} node
     * @return {?}
     */
    FreeJsonComponent.prototype.canAddNode = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        return (node.type === NodeType.json) || (node.type === NodeType.array);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FreeJsonComponent.prototype.changePerformed = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.children) {
            /** @type {?} */
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
    FreeJsonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'free-json',
                    template: "<ul>\r\n  <li  *ngFor=\"let child of transformedData | nodeSearch\"\r\n        [dragEnabled]=\"dragEnabled.bind(this)\"\r\n        [medium]=\"child\"\r\n        (onDragEnd)='onDragEnd($event)'\r\n        (onDragStart)='onDragStart($event)'>\r\n    <div [dropEnabled]=\"dropEnabled.bind(this)\" \r\n        class='tree-node'\r\n        [id] = \"child.id\"\r\n        [medium]=\"child\"\r\n        [class.move]=\"!child.isRoot && (child.name.length || child.value.length)\"\r\n        (click)=\"toggle($event, child)\"\r\n        (onDrop)='onDrop($event)'>\r\n      <i  class='clickable fa fa-chevron-down' \r\n          tabindex=\"0\"\r\n          title=\"Collapse {{child.name}}\"\r\n          *ngIf='hasChevronDown(child)' \r\n          (keydown)='keydown($event, child)'\r\n          (click)='toggle($event, child)'></i>\r\n      <i  class='clickable fa fa-chevron-right' \r\n          tabindex=\"0\"\r\n          title=\"Expand {{child.name}}\"\r\n          *ngIf='hasChevronRight(child)' \r\n          (keydown)='keydown($event, child)'\r\n          (click)='toggle($event, child)'></i>\r\n      <i  class='fa fa-quote-right' \r\n          arria-hidden=\"true\"\r\n          *ngIf='child.type === 1'></i>\r\n          <i  class='fa fa-random' \r\n          arria-hidden=\"true\"\r\n          *ngIf='child.type === 2'></i>\r\n      <i  class='fa no-action fa-chevron-right' \r\n          arria-hidden=\"true\"\r\n          *ngIf='child.type === 4 && child.children.length == 0'></i>\r\n      <json-label \r\n            (onchange)=\"changePerformed($event)\"\r\n            [node]=\"child\"></json-label>\r\n      <span class=\"edit-actions\">\r\n      <i *ngIf=\"!child.isRoot\"\r\n          class=\"clickable fa pull-right fa-times\" \r\n          tabindex=\"0\"\r\n          title=\"Delete {{child.name}}\"\r\n          (click)='deleteNode($event, child)' \r\n          (keydown)='keydelete($event, child)'></i>\r\n      <i *ngIf=\"transformedData.length > 1 && !child.isRoot\"\r\n          class=\"clickable fa pull-right fa-angle-double-up\" \r\n          tabindex=\"0\"\r\n          title=\"Move up {{child.name}}\"\r\n          (click)='moveNode($event, child, true)' \r\n          (keydown)='keymove($event, child, true)'></i>\r\n      <i *ngIf=\"transformedData.length > 1 && !child.isRoot\"\r\n          class=\"clickable fa pull-right fa-angle-double-down\" \r\n          tabindex=\"0\"\r\n          title=\"Move down {{child.name}}\"\r\n          (click)='moveNode($event, child, false)' \r\n          (keydown)='keymove($event, child, false)'></i>\r\n      <i *ngIf=\"canAddNode(child)\"\r\n          class=\"clickable fa pull-right fa-plus\" \r\n          tabindex=\"0\"\r\n          title=\"Add New Child\"\r\n          (keydown)='keyadd($event, child)'\r\n          (click)='addNewNode($event, child)'></i>\r\n      <i *ngIf=\"!child.isRoot && child.parentNode.parentNode && (child.name.length || child.value.length)\"\r\n          class=\"clickable fa pull-right fa-angle-double-left\" \r\n          tabindex=\"0\"\r\n          title=\"Move to {{child.parentNode.parentNode.name}}\"\r\n          (click)='toGrandParent($event, child)' \r\n          (keydown)='keytoGrandParent($event, child)'></i>\r\n      </span>\r\n    </div>\r\n    <div *ngIf=\"child.expanded\">\r\n      <free-json \r\n            (onchange)=\"changePerformed($event)\"\r\n            [reasoning]=\"reasoning\"\r\n            [reasoningCodes]=\"reasoningCodes\"\r\n            [transformedData]='child.children'></free-json>\r\n    </div>\r\n  </li>\r\n</ul>\r\n\r\n",
                    styles: ["ul{list-style:none;min-width:400px}.tree-node{padding:0;border:1px solid #eef1f4;background:#f7f9ff;color:#7c9eb2;margin:3px 0;text-transform:capitalize;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.tree-node i{width:15px;height:15px;margin:10px 3px}.tree-node.move{cursor:move}.clickable{cursor:pointer}.no-action{color:transparent}.edit-actions{border-left:1px solid #eef1f4;float:right}.drag-over{background-color:#7c9eb2;color:#fff}.fa{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.fa-plus-square{color:green}.fa-minus-circle{color:red}"]
                }] }
    ];
    /** @nocollapse */
    FreeJsonComponent.ctorParameters = function () { return [
        { type: NodeManager }
    ]; };
    FreeJsonComponent.propDecorators = {
        transformedData: [{ type: Input, args: ["transformedData",] }],
        reasoning: [{ type: Input, args: ["reasoning",] }],
        reasoningCodes: [{ type: Input, args: ["reasoningCodes",] }],
        root: [{ type: Input }],
        save: [{ type: Input }],
        onpublish: [{ type: Output, args: ["onpublish",] }],
        onchange: [{ type: Output, args: ["onchange",] }]
    };
    return FreeJsonComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var FreeJsonSearchField = /** @class */ (function () {
    function FreeJsonSearchField(manager) {
        this.manager = manager;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    FreeJsonSearchField.prototype.filter = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.manager.setFilteredText(value);
    };
    FreeJsonSearchField.decorators = [
        { type: Component, args: [{
                    selector: 'json-search-field',
                    template: "<input type='text' [(ngModel)]='val' (ngModelChange)='filter(val)'>"
                }] }
    ];
    /** @nocollapse */
    FreeJsonSearchField.ctorParameters = function () { return [
        { type: NodeManager }
    ]; };
    FreeJsonSearchField.propDecorators = {
        val: [{ type: Input, args: ["val",] }]
    };
    return FreeJsonSearchField;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var FreeJsonLabel = /** @class */ (function () {
    function FreeJsonLabel(renderer) {
        this.renderer = renderer;
        this.editName = false;
        this.editValue = false;
        this.onchange = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    FreeJsonLabel.prototype.nameLabelKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        /** @type {?} */
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
    /**
     * @param {?} event
     * @return {?}
     */
    FreeJsonLabel.prototype.valueLabelKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        /** @type {?} */
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
    /**
     * @param {?} event
     * @return {?}
     */
    FreeJsonLabel.prototype.clickName = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        event.stopPropagation();
        event.preventDefault();
        this.editName = this.node.name !== 'Root';
        setTimeout(function () {
            _this.renderer.invokeElementMethod(_this.nameEditor.nativeElement, "focus");
        }, 66);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FreeJsonLabel.prototype.clickValue = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        event.stopPropagation();
        event.preventDefault();
        this.editValue = this.node.value !== 'Object';
        setTimeout(function () {
            _this.renderer.invokeElementMethod(_this.valueEditor.nativeElement, "focus");
        }, 66);
    };
    FreeJsonLabel.decorators = [
        { type: Component, args: [{
                    selector: 'json-label',
                    template: "<span *ngIf=\"editName && node.name !=='Root' && node.value !=='Object'\">\r\n    <input #nameEditor\r\n        type='text' \r\n        id=\"editName\"\r\n        placeholder=\"Name\"\r\n        (blur)=\"editName = false; onchange.emit();\" \r\n        [(ngModel)]='node.name'>\r\n</span>\r\n<span *ngIf='!editName && node.type !== 1'\r\n    class='locked name' \r\n    tabindex='0' \r\n    (keydown)='nameLabelKeydown($event)'\r\n    (click)=\"clickName($event)\"\r\n    [innerHTML]=\"node.name.length ? node.name : '&nbsp;'\">\r\n</span>\r\n<span *ngIf=\"editValue && node.name !=='Root' && node.value !=='Object'\">\r\n    <input #valueEditor\r\n        type='text' \r\n        id=\"editValue\"\r\n        placeholder=\"Value\"\r\n        (blur)=\"editValue = false; onchange.emit();\" \r\n        [(ngModel)]='node.value'>\r\n</span>\r\n<span *ngIf='!editValue && (node.type === 2 || node.type === 1) && node.value!=null'\r\n    class='locked' \r\n    [class.name]=\"node.type === 4\"\r\n    tabindex='0' \r\n    (keydown)='valueLabelKeydown($event)'\r\n    (click)=\"clickValue($event)\"\r\n    [innerHTML]=\"node.value.length ? node.value : '&nbsp;'\">\r\n</span>\r\n",
                    styles: [":host{margin:10px 0}span.locked{display:inline-block;cursor:pointer;min-width:30px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}span.locked.name{font-weight:700;color:#000}span input{cursor:beam}"]
                }] }
    ];
    /** @nocollapse */
    FreeJsonLabel.ctorParameters = function () { return [
        { type: Renderer }
    ]; };
    FreeJsonLabel.propDecorators = {
        nameEditor: [{ type: ViewChild, args: ["nameEditor",] }],
        valueEditor: [{ type: ViewChild, args: ["valueEditor",] }],
        node: [{ type: Input }],
        onchange: [{ type: Output, args: ["onchange",] }]
    };
    return FreeJsonLabel;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var FreeJsonSearch = /** @class */ (function () {
    function FreeJsonSearch(manager) {
        this.manager = manager;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    FreeJsonSearch.prototype.isBlank = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return obj === undefined || obj === null;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    FreeJsonSearch.prototype.transform = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var filteredText = this.manager.getFilteredText();
        if (this.isBlank(filteredText)) {
            return value;
        }
        else {
            return value.filter(function (node) { return node.text.indexOf(filteredText) > -1; });
        }
    };
    FreeJsonSearch.decorators = [
        { type: Pipe, args: [{
                    name: 'nodeSearch',
                    pure: false
                },] }
    ];
    /** @nocollapse */
    FreeJsonSearch.ctorParameters = function () { return [
        { type: NodeManager }
    ]; };
    return FreeJsonSearch;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var FreeJsonModule = /** @class */ (function () {
    function FreeJsonModule() {
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
                },] }
    ];
    return FreeJsonModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { FreeJsonComponent, NodeType, ActionType, FreeJsonModule, FreeJsonLabel as ɵb, FreeJsonSearchField as ɵd, NodeManager as ɵa, FreeJsonSearch as ɵc };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VkZWgtZnJlZS1qc29uLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9Ac2VkZWgvZnJlZS1qc29uL3NyYy9hcHAvZnJlZS1qc29uL2ludGVyZmFjZXMvbm9kZS5pbnRlcmZhY2UudHMiLCJuZzovL0BzZWRlaC9mcmVlLWpzb24vc3JjL2FwcC9mcmVlLWpzb24vaW5qZWN0YWJsZXMvbm9kZS1tYW5hZ2VyLnRzIiwibmc6Ly9Ac2VkZWgvZnJlZS1qc29uL3NyYy9hcHAvZnJlZS1qc29uL2NvbXBvbmVudHMvanNvbi5jb21wb25lbnQudHMiLCJuZzovL0BzZWRlaC9mcmVlLWpzb24vc3JjL2FwcC9mcmVlLWpzb24vY29tcG9uZW50cy9qc29uLXNlYXJjaC1maWVsZC5jb21wb25lbnQudHMiLCJuZzovL0BzZWRlaC9mcmVlLWpzb24vc3JjL2FwcC9mcmVlLWpzb24vY29tcG9uZW50cy9qc29uLWxhYmVsLmNvbXBvbmVudC50cyIsIm5nOi8vQHNlZGVoL2ZyZWUtanNvbi9zcmMvYXBwL2ZyZWUtanNvbi9waXBlcy9qc29uLXNlYXJjaC50cyIsIm5nOi8vQHNlZGVoL2ZyZWUtanNvbi9zcmMvYXBwL2ZyZWUtanNvbi9mcmVlLWpzb24ubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlxyXG5leHBvcnQgZW51bSBOb2RlVHlwZSB7XHJcbiAgbGl0ZXJhbCA9IDEsXHJcbiAgcGFpciA9IDIsXHJcbiAganNvbiA9IDMsXHJcbiAgYXJyYXkgPSA0XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBOb2RlIHtcclxuICBpZDogbnVtYmVyLFxyXG4gIG5hbWU6IHN0cmluZyxcclxuICB2YWx1ZTogc3RyaW5nLFxyXG4gIHBhcmVudDogTm9kZVR5cGUsXHJcbiAgcGFyZW50Tm9kZT86IE5vZGUsXHJcbiAgdHlwZTogTm9kZVR5cGUsXHJcbiAgY2hpbGRyZW46IE5vZGVbXSxcclxuICBleHBhbmRlZD86IGJvb2xlYW4sXHJcbiAgaXNSb290PzogYm9vbGVhblxyXG59XHJcbmV4cG9ydCBlbnVtIEFjdGlvblR5cGUge1xyXG4gIGFkZCA9IDEsXHJcbiAgcmVtb3ZlID0gMixcclxuICBtb3ZlID0gMyxcclxuICBtb2RpZmllZCA9IDRcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIFJlYXNvbmluZyB7XHJcbiAgY29kZTogc3RyaW5nLFxyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmcsXHJcbiAgYWN0aW9uOiBBY3Rpb25UeXBlLFxyXG4gIG5vZGU6IHN0cmluZ1xyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBOb2RlLCBOb2RlVHlwZSB9IGZyb20gJy4vLi4vaW50ZXJmYWNlcy9ub2RlLmludGVyZmFjZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOb2RlTWFuYWdlciB7XHJcbiAgZmlsdGVyZWRUZXh0OiBTdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gIH1cclxuXHJcbiAgZ2VuZXJhdGVOb2RlSWQoKSB7XHJcbiAgICBjb25zdCBtaW4gPSAxO1xyXG4gICAgY29uc3QgbWF4ID0gMTAwMDBcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xyXG4gIH1cclxuXHJcbiAgZ2V0RmlsdGVyZWRUZXh0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyZWRUZXh0O1xyXG4gIH1cclxuXHJcbiAgZ2V0TmV3Tm9kZShub2RlOiBOb2RlKTogTm9kZSB7XHJcbiAgICBjb25zdCBpZCA9IHRoaXMuZ2VuZXJhdGVOb2RlSWQoKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGlkOiBpZCxcclxuICAgICAgbmFtZTogJ25hbWUnLCBcclxuICAgICAgdmFsdWU6ICd2YWx1ZScsXHJcbiAgICAgIHBhcmVudDogbm9kZS50eXBlLFxyXG4gICAgICBwYXJlbnROb2RlOiBub2RlLFxyXG4gICAgICB0eXBlOiBOb2RlVHlwZS5saXRlcmFsLFxyXG4gICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgIGV4cGFuZGVkOiBmYWxzZVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHNldEZpbHRlcmVkVGV4dCh0ZXh0KSB7XHJcbiAgICB0aGlzLmZpbHRlcmVkVGV4dCA9IHRleHQ7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRHJvcEV2ZW50LCBEcmFnRXZlbnQgfSBmcm9tICdAc2VkZWgvZHJhZy1lbmFibGVkJztcclxuXHJcbmltcG9ydCB7IE5vZGVNYW5hZ2VyIH0gZnJvbSAnLi4vaW5qZWN0YWJsZXMvbm9kZS1tYW5hZ2VyJztcclxuaW1wb3J0IHsgRnJlZUpzb25TZWFyY2ggfSBmcm9tICcuLi9waXBlcy9qc29uLXNlYXJjaCc7XHJcbmltcG9ydCB7IEZyZWVKc29uTGFiZWwgfSBmcm9tICcuL2pzb24tbGFiZWwuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTm9kZSwgTm9kZVR5cGUsIFJlYXNvbmluZywgQWN0aW9uVHlwZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvbm9kZS5pbnRlcmZhY2UnO1xyXG4vL2ltcG9ydCB7IEZyZWVKc29uRGlhbG9nIH0gZnJvbSAnLi9qc29uLWRpYWxvZy5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdmcmVlLWpzb24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9qc29uLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9qc29uLmNvbXBvbmVudC5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGcmVlSnNvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIGNoaWxkcmVuO1xyXG4gIFxyXG4gIEBJbnB1dChcInRyYW5zZm9ybWVkRGF0YVwiKVxyXG4gIHRyYW5zZm9ybWVkRGF0YTtcclxuICBcclxuICBASW5wdXQoXCJyZWFzb25pbmdcIilcclxuICByZWFzb25pbmc6IFJlYXNvbmluZ1tdO1xyXG5cclxuICBASW5wdXQoXCJyZWFzb25pbmdDb2Rlc1wiKVxyXG4gIHJlYXNvbmluZ0NvZGVzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCByb290KG5vZGUgOiBOb2RlICl7XHJcbiAgICBpZiAobm9kZSkge1xyXG4gICAgICB0aGlzLmNoaWxkcmVuID0gbm9kZTtcclxuICAgICAgaWYgKHRoaXMucmVhc29uaW5nKSB7XHJcbiAgICAgICAgdGhpcy5yZWFzb25pbmcgPSBbXTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBwYXJlbnQ6IE5vZGUgPSB7XHJcbiAgICAgICAgaWQ6IHRoaXMubWFuYWdlci5nZW5lcmF0ZU5vZGVJZCgpLFxyXG4gICAgICAgIG5hbWU6IFwiUm9vdFwiLFxyXG4gICAgICAgIHZhbHVlOiBcIk9iamVjdFwiLFxyXG4gICAgICAgIHBhcmVudDogTm9kZVR5cGUuYXJyYXksXHJcbiAgICAgICAgdHlwZTogTm9kZVR5cGUuYXJyYXksXHJcbiAgICAgICAgZXhwYW5kZWQ6IHRydWUsXHJcbiAgICAgICAgY2hpbGRyZW46IHVuZGVmaW5lZCxcclxuICAgICAgICBpc1Jvb3Q6IHRydWVcclxuICAgICAgfVxyXG4gICAgICBwYXJlbnQuY2hpbGRyZW4gPSB0aGlzLnRyYW5zZm9ybU5vZGVUb0ludGVybmFsU3RydWN0aW9uKHRoaXMuY2hpbGRyZW4sIHBhcmVudClcclxuXHJcbiAgICAgIHRoaXMudHJhbnNmb3JtZWREYXRhID0gWyBwYXJlbnQgXTtcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0IHJvb3QoKTogTm9kZXtcclxuICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW47XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBzYXZlKGZsYWcgOiBib29sZWFuICl7XHJcbiAgICAgIGlmIChmbGFnKSB7XHJcbiAgICAgICAgY29uc3Qgc2F2ZWROb2RlID0gdGhpcy50cmFuc2Zvcm1lZEludGVybmFsU3RydWN0dXJlQmFja1RvTm9kZSh0aGlzLnRyYW5zZm9ybWVkRGF0YVswXS5jaGlsZHJlbiwgTm9kZVR5cGUuanNvbik7XHJcbiAgICAgICAgdGhpcy5vbnB1Ymxpc2guZW1pdChzYXZlZE5vZGUpXHJcbiAgICAgIH1cclxuICB9XHJcbiAgZ2V0IHNhdmUoKXtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgQE91dHB1dChcIm9ucHVibGlzaFwiKVxyXG4gIG9ucHVibGlzaCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBcclxuICBAT3V0cHV0KFwib25jaGFuZ2VcIilcclxuICBvbmNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBcclxuICBleHBhbmRlZDpCb29sZWFuO1xyXG4gIFxyXG4gIGNvbnN0cnVjdG9yKFxyXG5cdCAgcHJpdmF0ZSBtYW5hZ2VyOk5vZGVNYW5hZ2VyXHJcblx0KSB7XHJcblx0ICBcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdHJhbnNmb3JtZWRJbnRlcm5hbFN0cnVjdHVyZUJhY2tUb05vZGUoIHJvb3QsIHBhcmVudCApIHtcclxuICAgIGxldCBqc29uID0ge307XHJcbiAgICBsZXQgYXJyYXkgPSBbXTtcclxuXHJcbiAgICByb290Lm1hcCggKGl0ZW06IE5vZGUpID0+IHtcclxuICAgICAgaWYgKHBhcmVudCA9PT0gTm9kZVR5cGUuanNvbikgeyAgICAgICAgXHJcbiAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gTm9kZVR5cGUubGl0ZXJhbCkge1xyXG4gICAgICAgICAgYXJyYXkucHVzaChpdGVtLnZhbHVlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gTm9kZVR5cGUucGFpcikge1xyXG4gICAgICAgICAganNvbltpdGVtLm5hbWVdID0gaXRlbS52YWx1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gTm9kZVR5cGUuYXJyYXkpIHtcclxuICAgICAgICAgIGpzb25baXRlbS5uYW1lXSA9IHRoaXMudHJhbnNmb3JtZWRJbnRlcm5hbFN0cnVjdHVyZUJhY2tUb05vZGUoaXRlbS5jaGlsZHJlbiwgaXRlbS5wYXJlbnQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSBOb2RlVHlwZS5qc29uKSB7XHJcbiAgICAgICAgICBqc29uW2l0ZW0ubmFtZV0gPSB0aGlzLnRyYW5zZm9ybWVkSW50ZXJuYWxTdHJ1Y3R1cmVCYWNrVG9Ob2RlKGl0ZW0uY2hpbGRyZW4sIGl0ZW0ucGFyZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAocGFyZW50ID09PSBOb2RlVHlwZS5hcnJheSl7XHJcbiAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gTm9kZVR5cGUubGl0ZXJhbCkge1xyXG4gICAgICAgICAgYXJyYXkucHVzaChpdGVtLnZhbHVlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gTm9kZVR5cGUuanNvbikge1xyXG4gICAgICAgICAgYXJyYXkucHVzaCh0aGlzLnRyYW5zZm9ybWVkSW50ZXJuYWxTdHJ1Y3R1cmVCYWNrVG9Ob2RlKGl0ZW0sIGl0ZW0ucGFyZW50KSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09IE5vZGVUeXBlLmFycmF5KSB7XHJcbiAgICAgICAgICBhcnJheS5wdXNoKHRoaXMudHJhbnNmb3JtZWRJbnRlcm5hbFN0cnVjdHVyZUJhY2tUb05vZGUoaXRlbS5jaGlsZHJlbiwgaXRlbS5wYXJlbnQpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGFycmF5Lmxlbmd0aCA/IGFycmF5IDoganNvbjtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdHJhbnNmb3JtTm9kZVRvSW50ZXJuYWxTdHJ1Y3Rpb24obm9kZSwgcGFyZW50OiBOb2RlKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gbm9kZTtcclxuICAgIGlmIChub2RlIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgY29uc3QgY2hpbGRyZW46IE5vZGVbXSA9IFtdO1xyXG4gICAgICBub2RlLm1hcCggKGl0ZW0pID0+IHtcclxuICAgICAgICBjb25zdCBzdWJOb2RlOiBOb2RlID0ge1xyXG4gICAgICAgICAgaWQ6IHRoaXMubWFuYWdlci5nZW5lcmF0ZU5vZGVJZCgpLFxyXG4gICAgICAgICAgbmFtZTogXCJcIixcclxuICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgcGFyZW50OiBOb2RlVHlwZS5hcnJheSxcclxuICAgICAgICAgIHBhcmVudE5vZGU6IHBhcmVudCxcclxuICAgICAgICAgIHR5cGU6IE5vZGVUeXBlLmFycmF5LFxyXG4gICAgICAgICAgY2hpbGRyZW46IFtdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGpzb25WYWx1ZTogYW55ID0gdGhpcy50cmFuc2Zvcm1Ob2RlVG9JbnRlcm5hbFN0cnVjdGlvbihpdGVtLCBzdWJOb2RlKTtcclxuICAgICAgICBpZiAoanNvblZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgIHN1Yk5vZGUuY2hpbGRyZW4gPSBqc29uVmFsdWU7XHJcbiAgICAgICAgICBjaGlsZHJlbi5wdXNoKHN1Yk5vZGUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzdWJOb2RlLnZhbHVlID0ganNvblZhbHVlO1xyXG4gICAgICAgICAgc3ViTm9kZS50eXBlID0gTm9kZVR5cGUubGl0ZXJhbDtcclxuICAgICAgICAgIGNoaWxkcmVuLnB1c2goc3ViTm9kZSk7XHJcbiAgICAgICAgfSAgICAgIFxyXG4gICAgICB9KTtcclxuICAgICAgcmVzdWx0ID0gY2hpbGRyZW47XHJcbiAgICB9IGVsc2UgaWYgKG5vZGUgaW5zdGFuY2VvZiBPYmplY3QpIHtcclxuICAgICAgY29uc3QgbGlzdCA9IE9iamVjdC5rZXlzKG5vZGUpO1xyXG4gICAgICBjb25zdCBjaGlsZHJlbjogTm9kZVtdID0gW107XHJcbiAgICAgIGxpc3QubWFwKCAoaXRlbSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHN1Yk5vZGU6IE5vZGUgPSB7XHJcbiAgICAgICAgICBpZDogdGhpcy5tYW5hZ2VyLmdlbmVyYXRlTm9kZUlkKCksXHJcbiAgICAgICAgICBuYW1lOiBpdGVtLFxyXG4gICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICBwYXJlbnQ6IE5vZGVUeXBlLmpzb24sXHJcbiAgICAgICAgICBwYXJlbnROb2RlOiBwYXJlbnQsXHJcbiAgICAgICAgICB0eXBlOiBOb2RlVHlwZS5hcnJheSxcclxuICAgICAgICAgIGNoaWxkcmVuOiBbXVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBqc29uVmFsdWU6IGFueSA9IHRoaXMudHJhbnNmb3JtTm9kZVRvSW50ZXJuYWxTdHJ1Y3Rpb24obm9kZVtpdGVtXSwgc3ViTm9kZSk7XHJcbiAgICAgICAgaWYgKGpzb25WYWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICBzdWJOb2RlLmNoaWxkcmVuID0ganNvblZhbHVlO1xyXG4gICAgICAgICAgY2hpbGRyZW4ucHVzaChzdWJOb2RlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3ViTm9kZS52YWx1ZSA9IGpzb25WYWx1ZTtcclxuICAgICAgICAgIHN1Yk5vZGUudHlwZSA9IE5vZGVUeXBlLnBhaXI7XHJcbiAgICAgICAgICBjaGlsZHJlbi5wdXNoKHN1Yk5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHJlc3VsdCA9IGNoaWxkcmVuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuXHJcbiAgYWRkTmV3Tm9kZShldmVudCwgbm9kZSkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIGlmKHRoaXMucmVhc29uaW5nKSB7XHJcbiAgICAgIC8vIGxldCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKEZyZWVKc29uRGlhbG9nLCB7XHJcbiAgICAgIC8vICAgZGF0YTogeyBcclxuICAgICAgLy8gICAgIGFjdGlvbjogJ2FkZCcsXHJcbiAgICAgIC8vICAgICBub2RlOiBub2RlLFxyXG4gICAgICAvLyAgICAgcmVhc29uaW5nOiB0aGlzLnJlYXNvbmluZyxcclxuICAgICAgLy8gICAgIGNvZGVzOiB0aGlzLnJlYXNvbmluZ0NvZGVzXHJcbiAgICAgIC8vICAgfSxcclxuICAgICAgLy8gfSk7XHJcbiAgICAgIC8vIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICAvLyAgIGlmIChyZXN1bHQub2spIHtcclxuICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiVE9ETzogcG9wdXAgd2lsbCBzZXQgbm9kZSB0eXBlXCIpO1xyXG4gICAgICAvLyAgICAgY29uc3QgdHlwZSA9IHJlc3VsdC5ub3RlVHlwZTtcclxuICAgICAgLy8gICAgIG5vZGUuY2hpbGRyZW4gPSBbLi4ubm9kZS5jaGlsZHJlbiwgdGhpcy5tYW5hZ2VyLmdldE5ld05vZGUobm9kZSldO1xyXG4gICAgICAvLyAgICAgbm9kZS5leHBhbmRlZCA9IHRydWU7XHJcbiAgICAgIC8vICAgICB0aGlzLmNoYW5nZVBlcmZvcm1lZCh7fSk7XHJcbiAgICAgIC8vICAgfVxyXG4gICAgICAvLyB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG5vZGUuY2hpbGRyZW4gPSBbLi4ubm9kZS5jaGlsZHJlbiwgdGhpcy5tYW5hZ2VyLmdldE5ld05vZGUobm9kZSldO1xyXG4gICAgICBub2RlLmV4cGFuZGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5jaGFuZ2VQZXJmb3JtZWQoe30pO1xyXG4gICAgfVxyXG4gIH1cclxuICBtb3ZlTm9kZShldmVudCwgbm9kZSwgbW92ZVVwKSB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgaWYodGhpcy5yZWFzb25pbmcpIHtcclxuICAgICAgLy8gbGV0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oRnJlZUpzb25EaWFsb2csIHtcclxuICAgICAgLy8gICBkYXRhOiB7IFxyXG4gICAgICAvLyAgICAgYWN0aW9uOiAnbW92ZScsXHJcbiAgICAgIC8vICAgICBmcm9tOiB0aGlzLnRyYW5zZm9ybWVkRGF0YS5pbmRleE9mKG5vZGUpLFxyXG4gICAgICAvLyAgICAgZGlyZWN0aW9uOiBtb3ZlVXAsXHJcbiAgICAgIC8vICAgICBub2RlOiBub2RlLFxyXG4gICAgICAvLyAgICAgcmVhc29uaW5nOiB0aGlzLnJlYXNvbmluZyxcclxuICAgICAgLy8gICAgIGNvZGVzOiB0aGlzLnJlYXNvbmluZ0NvZGVzXHJcbiAgICAgIC8vICAgfSxcclxuICAgICAgLy8gfSk7XHJcbiAgICAgIC8vIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICAvLyAgIGlmIChyZXN1bHQub2spIHtcclxuICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiVE9ETzogcG9wdXAgd2lsbCBnaXZlIGluZGV4IHRvIGdvIHRvXCIpO1xyXG4gICAgICAvLyAgICAgbGV0IGZyb20gPSByZXN1bHQuZnJvbTtcclxuICAgICAgLy8gICAgIGxldCB0byA9IG1vdmVVcCA/IFxyXG4gICAgICAvLyAgICAgICAgICAgICAgIChmcm9tID4gMCA/IGZyb20gLSAxIDogZnJvbSkgOiBcclxuICAgICAgLy8gICAgICAgICAgICAgICAoZnJvbSA8ICh0aGlzLnRyYW5zZm9ybWVkRGF0YS5sZW5ndGggLSAxKSA/IGZyb20gKyAxIDogZnJvbSk7XHJcbiAgICAgIFxyXG4gICAgICAvLyAgICAgdGhpcy50cmFuc2Zvcm1lZERhdGEuc3BsaWNlKHRvLCAwLCB0aGlzLnRyYW5zZm9ybWVkRGF0YS5zcGxpY2UoZnJvbSwgMSlbMF0pO1xyXG4gICAgICAvLyAgICAgdGhpcy5jaGFuZ2VQZXJmb3JtZWQoe30pO1xyXG4gICAgICAvLyAgIH1cclxuICAgICAgLy8gfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgZnJvbSA9IHRoaXMudHJhbnNmb3JtZWREYXRhLmluZGV4T2Yobm9kZSk7XHJcbiAgICAgIGxldCB0byA9IG1vdmVVcCA/IFxyXG4gICAgICAgICAgICAgICAgKGZyb20gPiAwID8gZnJvbSAtIDEgOiBmcm9tKSA6IFxyXG4gICAgICAgICAgICAgICAgKGZyb20gPCAodGhpcy50cmFuc2Zvcm1lZERhdGEubGVuZ3RoIC0gMSkgPyBmcm9tICsgMSA6IGZyb20pO1xyXG4gIFxyXG4gICAgICB0aGlzLnRyYW5zZm9ybWVkRGF0YS5zcGxpY2UodG8sIDAsIHRoaXMudHJhbnNmb3JtZWREYXRhLnNwbGljZShmcm9tLCAxKVswXSk7XHJcbiAgICAgIHRoaXMuY2hhbmdlUGVyZm9ybWVkKHt9KTtcclxuICAgIH1cclxuICB9XHJcbiAgZGVsZXRlTm9kZShldmVudCwgbm9kZSkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgaWYodGhpcy5yZWFzb25pbmcpIHtcclxuICAgICAgLy8gbGV0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oRnJlZUpzb25EaWFsb2csIHtcclxuICAgICAgLy8gICBkYXRhOiB7IFxyXG4gICAgICAvLyAgICAgYWN0aW9uOiAncmVtb3ZlJyxcclxuICAgICAgLy8gICAgIG5vZGU6IG5vZGUsXHJcbiAgICAgIC8vICAgICByZWFzb25pbmc6IHRoaXMucmVhc29uaW5nLFxyXG4gICAgICAvLyAgICAgY29kZXM6IHRoaXMucmVhc29uaW5nQ29kZXNcclxuICAgICAgLy8gICB9LFxyXG4gICAgICAvLyB9KTtcclxuICAgICAgLy8gZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgIC8vICAgaWYgKHJlc3VsdC5vaykge1xyXG4gICAgICAvLyAgICAgY29uc29sZS5sb2coXCJUT0RPOiBwcm9tcHQgcmVhc29uIGFkIHNhdmUgaXQgaW4gYSBjb25zdHJ1Y3RcIik7XHJcbiAgICAgIC8vICAgICB0aGlzLnRyYW5zZm9ybWVkRGF0YS5zcGxpY2UodGhpcy50cmFuc2Zvcm1lZERhdGEuaW5kZXhPZihub2RlKSwgMSk7XHJcbiAgICAgIC8vICAgICB0aGlzLmNoYW5nZVBlcmZvcm1lZCh7fSk7XHJcbiAgICAgIC8vICAgfVxyXG4gICAgICAvLyB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudHJhbnNmb3JtZWREYXRhLnNwbGljZSh0aGlzLnRyYW5zZm9ybWVkRGF0YS5pbmRleE9mKG5vZGUpLCAxKTtcclxuICAgICAgdGhpcy5jaGFuZ2VQZXJmb3JtZWQoe30pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGFzQ2hldnJvbkRvd24oY2hpbGQpe1xyXG4gICAgcmV0dXJuIGNoaWxkICYmIGNoaWxkLmNoaWxkcmVuICYmIGNoaWxkLmNoaWxkcmVuLmxlbmd0aCA+IDAgJiYgY2hpbGQuZXhwYW5kZWRcclxuICB9XHJcblxyXG4gIGhhc0NoZXZyb25SaWdodChjaGlsZCkge1xyXG4gICAgcmV0dXJuIGNoaWxkICYmIGNoaWxkLmNoaWxkcmVuICYmIGNoaWxkLmNoaWxkcmVuLmxlbmd0aCAhPSAwICYmICFjaGlsZC5leHBhbmRlZFxyXG4gIH1cclxuXHJcblx0ZHJhZ0VuYWJsZWQoZXZlbnQ6IERyYWdFdmVudCkge1xyXG5cdFx0cmV0dXJuICFldmVudC5tZWRpdW0uaXNSb290ICYmIChldmVudC5tZWRpdW0ubmFtZS5sZW5ndGggfHwgZXZlbnQubWVkaXVtLnZhbHVlLmxlbmd0aCk7XHJcblx0fVxyXG5cdGRyb3BFbmFibGVkKGV2ZW50OiBEcm9wRXZlbnQpIHtcclxuXHRcdHJldHVybiAhZXZlbnQuZGVzdGluYXRpb24ubWVkaXVtLmlzUm9vdDtcclxuXHR9XHJcbiAgb25EcmFnU3RhcnQoZXZlbnQpIHtcclxuICAgIC8vIHRoaXMubWFuYWdlci5zZXRTZWxlY3RlZE5vZGUoZXZlbnQubWVkaXVtKTtcclxuICB9XHJcblxyXG4gIG9uRHJhZ0VuZChldmVudDogRHJvcEV2ZW50KSB7XHJcbiAgICBpZiAoZXZlbnQuZGVzdGluYXRpb24gJiYgZXZlbnQuc291cmNlLm1lZGl1bSAhPT0gZXZlbnQuZGVzdGluYXRpb24ubWVkaXVtKSB7XHJcbiAgICAgIGNvbnN0IHNvdXJjZUluZGV4ID0gdGhpcy50cmFuc2Zvcm1lZERhdGEuaW5kZXhPZihldmVudC5zb3VyY2UubWVkaXVtKTtcclxuXHJcbiAgICAgIGlmKHRoaXMucmVhc29uaW5nKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJhZHNhZGFzXCIpXHJcbiAgICAgICAgLy8gbGV0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oRnJlZUpzb25EaWFsb2csIHtcclxuICAgICAgICAvLyAgIGRhdGE6IHsgXHJcbiAgICAgICAgLy8gICAgIGFjdGlvbjogJ2RyYWcnLFxyXG4gICAgICAgIC8vICAgICBmcm9tOiBzb3VyY2VJbmRleCxcclxuICAgICAgICAvLyAgICAgcmVhc29uaW5nOiB0aGlzLnJlYXNvbmluZyxcclxuICAgICAgICAvLyAgICAgY29kZXM6IHRoaXMucmVhc29uaW5nQ29kZXNcclxuICAgICAgICAvLyAgIH0sXHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgLy8gZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgLy8gICBpZiAocmVzdWx0Lm9rKSB7XHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiVE9ETzogcHJvbXB0IHJlYXNvbiBhZCBzYXZlIGl0IGluIGEgY29uc3RydWN0XCIpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLnRyYW5zZm9ybWVkRGF0YS5zcGxpY2Uoc291cmNlSW5kZXgsIDEpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLmNoYW5nZVBlcmZvcm1lZCh7fSk7XHJcbiAgICAgICAgLy8gICB9XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm1lZERhdGEuc3BsaWNlKHNvdXJjZUluZGV4LCAxKTtcclxuICAgICAgICB0aGlzLmNoYW5nZVBlcmZvcm1lZCh7fSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uRHJvcChldmVudCl7XHJcbiAgICBpZiAoZXZlbnQuZGVzdGluYXRpb24gJiYgZXZlbnQuc291cmNlICYmIGV2ZW50LnNvdXJjZS5tZWRpdW0gIT09IGV2ZW50LmRlc3RpbmF0aW9uLm1lZGl1bSkge1xyXG4gICAgICBjb25zdCBzb3VyY2VOb2RlID0gZXZlbnQuc291cmNlLm1lZGl1bTtcclxuICAgICAgY29uc3QgZGVzdGluYXRpb25Ob2RlID0gZXZlbnQuZGVzdGluYXRpb24ubWVkaXVtO1xyXG4gIFxyXG4gICAgICBkZXN0aW5hdGlvbk5vZGUuY2hpbGRyZW4gPSBbLi4uZGVzdGluYXRpb25Ob2RlLmNoaWxkcmVuLCBzb3VyY2VOb2RlXTtcclxuICAgICAgaWYgKGRlc3RpbmF0aW9uTm9kZS5jaGlsZHJlbi5sZW5ndGgpIHtcclxuICAgICAgICBkZXN0aW5hdGlvbk5vZGUuZXhwYW5kZWQgPSB0cnVlO1xyXG4gICAgICB9ICAgIFxyXG4gICAgICBpZiAoZGVzdGluYXRpb25Ob2RlLnR5cGUgPT09IE5vZGVUeXBlLmxpdGVyYWwpIHtcclxuICAgICAgICBkZXN0aW5hdGlvbk5vZGUudHlwZSA9IE5vZGVUeXBlLmpzb247XHJcbiAgICAgICAgZGVzdGluYXRpb25Ob2RlLnZhbHVlPSBcIlwiO1xyXG4gICAgICB9IGVsc2UgaWYgKGRlc3RpbmF0aW9uTm9kZS50eXBlID09PSBOb2RlVHlwZS5wYWlyKSB7XHJcbiAgICAgICAgZGVzdGluYXRpb25Ob2RlLnR5cGUgPSBOb2RlVHlwZS5qc29uO1xyXG4gICAgICB9IGVsc2UgaWYgKGRlc3RpbmF0aW9uTm9kZS50eXBlID09PSBOb2RlVHlwZS5hcnJheSkge1xyXG4gICAgICAgIGlmIChkZXN0aW5hdGlvbk5vZGUucGFyZW50ID09PSBOb2RlVHlwZS5hcnJheSAmJiBzb3VyY2VOb2RlLnR5cGUgPT09IE5vZGVUeXBlLnBhaXIpIHtcclxuICAgICAgICAgIHNvdXJjZU5vZGUudHlwZSA9IE5vZGVUeXBlLmpzb247XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHNvdXJjZU5vZGUucGFyZW50ID0gZGVzdGluYXRpb25Ob2RlLnR5cGU7XHJcblxyXG4gICAgICBjb25zdCBpID0gc291cmNlTm9kZS5wYXJlbnROb2RlLmNoaWxkcmVuLmluZGV4T2Yoc291cmNlTm9kZSk7XHJcbiAgICAgIHNvdXJjZU5vZGUucGFyZW50Tm9kZS5jaGlsZHJlbi5zcGxpY2UoaSwgMSk7XHJcbiAgICAgIHNvdXJjZU5vZGUucGFyZW50Tm9kZSA9IGRlc3RpbmF0aW9uTm9kZTtcclxuICAgICAgdGhpcy5jaGFuZ2VQZXJmb3JtZWQoe30pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdG9HcmFuZFBhcmVudChldmVudCwgY2hpbGQpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBjb25zdCBwYXJlbnQgPSAgY2hpbGQucGFyZW50Tm9kZTtcclxuICAgIGNvbnN0IGdyYW5kUGFyZW50ID0gIGNoaWxkLnBhcmVudE5vZGUucGFyZW50Tm9kZTtcclxuICAgIGNvbnN0IGkgPSBwYXJlbnQuY2hpbGRyZW4uaW5kZXhPZihjaGlsZCk7XHJcbiAgICBjb25zdCBwID0gZ3JhbmRQYXJlbnQuY2hpbGRyZW4uaW5kZXhPZihwYXJlbnQpO1xyXG5cclxuICAgIHBhcmVudC5jaGlsZHJlbi5zcGxpY2UoaSwgMSk7XHJcblxyXG4gICAgaWYgKHBhcmVudC5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcclxuICAgICAgaWYgKCFwYXJlbnQubmFtZS5sZW5ndGggJiYgIXBhcmVudC52YWx1ZS5sZW5ndGgpIHtcclxuICAgICAgICBncmFuZFBhcmVudC5jaGlsZHJlbi5zcGxpY2UocCwgMSk7XHJcbiAgICAgICAgZ3JhbmRQYXJlbnQuY2hpbGRyZW4uc3BsaWNlKHAsIDAsIGNoaWxkKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBwYXJlbnQudHlwZSA9IE5vZGVUeXBlLnBhaXI7XHJcbiAgICAgICAgZ3JhbmRQYXJlbnQuY2hpbGRyZW4uc3BsaWNlKHAgKyAxLCAwLCBjaGlsZCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGdyYW5kUGFyZW50LmNoaWxkcmVuLnNwbGljZShwICsgMSwgMCwgY2hpbGQpO1xyXG4gICAgfVxyXG4gICAgY2hpbGQucGFyZW50Tm9kZSA9IGdyYW5kUGFyZW50O1xyXG4gICAgdGhpcy5jaGFuZ2VQZXJmb3JtZWQoe30pO1xyXG4gIH1cclxuXHJcbiAgZ2V0RmlsdGVyZWRUZXh0KCl7XHJcbiAgICB0aGlzLm1hbmFnZXIuZ2V0RmlsdGVyZWRUZXh0KCk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGUoZXZlbnQsIGNoaWxkKSB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjaGlsZC5leHBhbmRlZCA9ICFjaGlsZC5leHBhbmRlZDtcclxuICB9XHJcblxyXG4gIGtleWRvd24oZXZlbnQsIGl0ZW0pIHtcclxuICAgIGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcclxuICAgIGlmICgoY29kZSA9PT0gMTMpIHx8IChjb2RlID09PSAzMikpIHtcclxuXHRcdFx0dGhpcy50b2dnbGUoZXZlbnQsIGl0ZW0pO1xyXG5cdFx0fVxyXG4gIH1cclxuICBrZXltb3ZlKGV2ZW50LCBpdGVtLCBtb3ZlVXApIHtcclxuICAgIGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcclxuICAgIGlmICgoY29kZSA9PT0gMTMpIHx8IChjb2RlID09PSAzMikpIHtcclxuICAgICAgdGhpcy5tb3ZlTm9kZShldmVudCwgaXRlbSwgbW92ZVVwKTtcclxuICAgIH1cclxuICB9XHJcbiAga2V5ZGVsZXRlKGV2ZW50LCBpdGVtKSB7XHJcbiAgICBjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcbiAgICBpZiAoKGNvZGUgPT09IDEzKSB8fCAoY29kZSA9PT0gMzIpKSB7XHJcblx0XHRcdHRoaXMuZGVsZXRlTm9kZShldmVudCwgaXRlbSk7XHJcblx0XHR9XHJcbiAgfVxyXG4gIGtleXRvR3JhbmRQYXJlbnQoZXZlbnQsIGl0ZW0pIHtcclxuICAgIGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcclxuICAgIGlmICgoY29kZSA9PT0gMTMpIHx8IChjb2RlID09PSAzMikpIHtcclxuXHRcdFx0dGhpcy50b0dyYW5kUGFyZW50KGV2ZW50LCBpdGVtKTtcclxuXHRcdH1cclxuICB9XHJcbiAga2V5YWRkKGV2ZW50LCBpdGVtKSB7XHJcbiAgICBjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcbiAgICBpZiAoKGNvZGUgPT09IDEzKSB8fCAoY29kZSA9PT0gMzIpKSB7XHJcblx0XHRcdHRoaXMuYWRkTmV3Tm9kZShldmVudCwgaXRlbSk7XHJcblx0XHR9XHJcbiAgfVxyXG4gIGNhbkFkZE5vZGUobm9kZSkge1xyXG4gICAgcmV0dXJuIChub2RlLnR5cGUgPT09IE5vZGVUeXBlLmpzb24pIHx8IChub2RlLnR5cGUgPT09IE5vZGVUeXBlLmFycmF5KTtcclxuICB9XHJcbiAgY2hhbmdlUGVyZm9ybWVkKGV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5jaGlsZHJlbikge1xyXG4gICAgICBjb25zdCBzYXZlZE5vZGUgPSB0aGlzLnRyYW5zZm9ybWVkSW50ZXJuYWxTdHJ1Y3R1cmVCYWNrVG9Ob2RlKHRoaXMudHJhbnNmb3JtZWREYXRhWzBdLmNoaWxkcmVuLCBOb2RlVHlwZS5qc29uKTtcclxuICAgICAgdGhpcy5vbmNoYW5nZS5lbWl0KHtcclxuICAgICAgICBkYXRhOiBzYXZlZE5vZGUsXHJcbiAgICAgICAgcmVhc29uaW5nOiB0aGlzLnJlYXNvbmluZ1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMub25jaGFuZ2UuZW1pdCh7fSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTm9kZU1hbmFnZXIgfSBmcm9tICcuLi9pbmplY3RhYmxlcy9ub2RlLW1hbmFnZXInO1xyXG5cclxuQENvbXBvbmVudCh7IFxyXG4gIHNlbGVjdG9yOiAnanNvbi1zZWFyY2gtZmllbGQnLCBcclxuICB0ZW1wbGF0ZTpgPGlucHV0IHR5cGU9J3RleHQnIFsobmdNb2RlbCldPSd2YWwnIChuZ01vZGVsQ2hhbmdlKT0nZmlsdGVyKHZhbCknPmBcclxufSlcclxuZXhwb3J0IGNsYXNzIEZyZWVKc29uU2VhcmNoRmllbGR7XHJcbiAgQElucHV0KFwidmFsXCIpXHJcbiAgdmFsOiBzdHJpbmc7XHJcbiAgXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG1hbmFnZXI6IE5vZGVNYW5hZ2VyXHJcbiAgKSB7fVxyXG5cclxuICBmaWx0ZXIodmFsdWUpIHtcclxuICAgIHRoaXMubWFuYWdlci5zZXRGaWx0ZXJlZFRleHQodmFsdWUpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge0NvbXBvbmVudCwgVmlld0NoaWxkLCBSZW5kZXJlciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IE5vZGUgfSBmcm9tICcuLy4uL2ludGVyZmFjZXMvbm9kZS5pbnRlcmZhY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdqc29uLWxhYmVsJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vanNvbi1sYWJlbC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vanNvbi1sYWJlbC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGcmVlSnNvbkxhYmVsIHtcclxuXHJcbiAgZWRpdE5hbWUgPSBmYWxzZTtcclxuICBlZGl0VmFsdWUgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIpIHtcclxuXHJcbiAgfVxyXG5cclxuICBAVmlld0NoaWxkKFwibmFtZUVkaXRvclwiKVxyXG4gIG5hbWVFZGl0b3I7XHJcblxyXG4gIEBWaWV3Q2hpbGQoXCJ2YWx1ZUVkaXRvclwiKVxyXG4gIHZhbHVlRWRpdG9yO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIG5vZGU6IE5vZGU7XHJcblxyXG4gIEBPdXRwdXQoXCJvbmNoYW5nZVwiKVxyXG4gIG9uY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBuYW1lTGFiZWxLZXlkb3duKGV2ZW50KSB7XHJcbiAgICBjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcbiAgICBpZiAoKGNvZGUgPT09IDEzKSB8fCAoY29kZSA9PT0gMzIpKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuaW52b2tlRWxlbWVudE1ldGhvZChldmVudC50YXJnZXQsIFwiY2xpY2tcIik7XHJcbiAgICAgIHNldFRpbWVvdXQoKCk9PntcclxuICAgICAgICBpZiAodGhpcy5uYW1lRWRpdG9yKSB7XHJcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QodGhpcy5uYW1lRWRpdG9yLm5hdGl2ZUVsZW1lbnQsIFwiZm9jdXNcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LDY2KTtcclxuXHRcdH0gZWxzZSBpZiAoY29kZSA9PT0gMjcpIHtcclxuICAgICAgdGhpcy5lZGl0TmFtZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuICB2YWx1ZUxhYmVsS2V5ZG93bihldmVudCkge1xyXG4gICAgY29uc3QgY29kZSA9IGV2ZW50LndoaWNoO1xyXG4gICAgaWYgKChjb2RlID09PSAxMykgfHwgKGNvZGUgPT09IDMyKSkge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QoZXZlbnQudGFyZ2V0LCBcImNsaWNrXCIpO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpPT57XHJcbiAgICAgICAgaWYgKHRoaXMudmFsdWVFZGl0b3IpIHtcclxuICAgICAgICAgIHRoaXMucmVuZGVyZXIuaW52b2tlRWxlbWVudE1ldGhvZCh0aGlzLnZhbHVlRWRpdG9yLm5hdGl2ZUVsZW1lbnQsIFwiZm9jdXNcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LDY2KTtcclxuXHRcdH0gZWxzZSBpZiAoY29kZSA9PT0gMjcpIHtcclxuICAgICAgdGhpcy5lZGl0VmFsdWUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNsaWNrTmFtZShldmVudCkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdGhpcy5lZGl0TmFtZSA9IHRoaXMubm9kZS5uYW1lICE9PSdSb290JztcclxuICAgIHNldFRpbWVvdXQoKCk9PntcclxuICAgICAgdGhpcy5yZW5kZXJlci5pbnZva2VFbGVtZW50TWV0aG9kKHRoaXMubmFtZUVkaXRvci5uYXRpdmVFbGVtZW50LCBcImZvY3VzXCIpO1xyXG4gICAgfSw2Nik7XHJcbiAgfVxyXG4gIGNsaWNrVmFsdWUoZXZlbnQpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIHRoaXMuZWRpdFZhbHVlID0gdGhpcy5ub2RlLnZhbHVlICE9PSdPYmplY3QnO1xyXG4gICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QodGhpcy52YWx1ZUVkaXRvci5uYXRpdmVFbGVtZW50LCBcImZvY3VzXCIpO1xyXG4gICAgfSw2Nik7XHJcbiAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5vZGVNYW5hZ2VyIH0gZnJvbSAnLi4vaW5qZWN0YWJsZXMvbm9kZS1tYW5hZ2VyJztcclxuXHJcbkBQaXBlKHtcclxuICBuYW1lOiAnbm9kZVNlYXJjaCcsXHJcbiAgcHVyZTogZmFsc2VcclxufSlcclxuZXhwb3J0IGNsYXNzIEZyZWVKc29uU2VhcmNoIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG1hbmFnZXI6IE5vZGVNYW5hZ2VyXHJcbiAgKXtcclxuICB9XHJcblxyXG4gIGlzQmxhbmsob2JqOiBhbnkpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBvYmogPT09IHVuZGVmaW5lZCB8fCBvYmogPT09IG51bGw7XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm0odmFsdWUpIHtcclxuICAgIHZhciBmaWx0ZXJlZFRleHQgPSB0aGlzLm1hbmFnZXIuZ2V0RmlsdGVyZWRUZXh0KClcclxuICAgIGlmICh0aGlzLmlzQmxhbmsoZmlsdGVyZWRUZXh0KSkgeyBcclxuICAgICAgcmV0dXJuIHZhbHVlXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdmFsdWUuZmlsdGVyKChub2RlKSA9PiBub2RlLnRleHQuaW5kZXhPZihmaWx0ZXJlZFRleHQpID4gLTEpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IERyYWdEcm9wTW9kdWxlIH0gZnJvbSAnQHNlZGVoL2RyYWctZW5hYmxlZCc7XHJcblxyXG5pbXBvcnQgeyBOb2RlTWFuYWdlciB9IGZyb20gJy4vaW5qZWN0YWJsZXMvbm9kZS1tYW5hZ2VyJztcclxuaW1wb3J0IHsgRnJlZUpzb25TZWFyY2hGaWVsZCB9IGZyb20gJy4vY29tcG9uZW50cy9qc29uLXNlYXJjaC1maWVsZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGcmVlSnNvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9qc29uLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZyZWVKc29uTGFiZWwgfSBmcm9tICcuL2NvbXBvbmVudHMvanNvbi1sYWJlbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGcmVlSnNvblNlYXJjaCB9IGZyb20gJy4vcGlwZXMvanNvbi1zZWFyY2gnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBEcmFnRHJvcE1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEZyZWVKc29uQ29tcG9uZW50LFxyXG4gICAgRnJlZUpzb25MYWJlbCxcclxuICAgIEZyZWVKc29uU2VhcmNoLFxyXG4gICAgRnJlZUpzb25TZWFyY2hGaWVsZFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgRnJlZUpzb25Db21wb25lbnRcclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1xyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBGcmVlSnNvblNlYXJjaCxcclxuICAgIE5vZGVNYW5hZ2VyXHJcbiAgXSxcclxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQV1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBG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