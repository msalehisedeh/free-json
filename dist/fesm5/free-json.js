import { Injectable, Component, Input, Output, EventEmitter, ViewChild, Renderer, Pipe, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { __spread } from 'tslib';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DragDropModule } from 'drag-enabled';

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJlZS1qc29uLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9mcmVlLWpzb24vc3JjL2FwcC9mcmVlLWpzb24vaW50ZXJmYWNlcy9ub2RlLmludGVyZmFjZS50cyIsIm5nOi8vZnJlZS1qc29uL3NyYy9hcHAvZnJlZS1qc29uL2luamVjdGFibGVzL25vZGUtbWFuYWdlci50cyIsIm5nOi8vZnJlZS1qc29uL3NyYy9hcHAvZnJlZS1qc29uL2NvbXBvbmVudHMvanNvbi5jb21wb25lbnQudHMiLCJuZzovL2ZyZWUtanNvbi9zcmMvYXBwL2ZyZWUtanNvbi9jb21wb25lbnRzL2pzb24tc2VhcmNoLWZpZWxkLmNvbXBvbmVudC50cyIsIm5nOi8vZnJlZS1qc29uL3NyYy9hcHAvZnJlZS1qc29uL2NvbXBvbmVudHMvanNvbi1sYWJlbC5jb21wb25lbnQudHMiLCJuZzovL2ZyZWUtanNvbi9zcmMvYXBwL2ZyZWUtanNvbi9waXBlcy9qc29uLXNlYXJjaC50cyIsIm5nOi8vZnJlZS1qc29uL3NyYy9hcHAvZnJlZS1qc29uL2ZyZWUtanNvbi5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbmV4cG9ydCBlbnVtIE5vZGVUeXBlIHtcclxuICBsaXRlcmFsID0gMSxcclxuICBwYWlyID0gMixcclxuICBqc29uID0gMyxcclxuICBhcnJheSA9IDRcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIE5vZGUge1xyXG4gIGlkOiBudW1iZXIsXHJcbiAgbmFtZTogc3RyaW5nLFxyXG4gIHZhbHVlOiBzdHJpbmcsXHJcbiAgcGFyZW50OiBOb2RlVHlwZSxcclxuICBwYXJlbnROb2RlPzogTm9kZSxcclxuICB0eXBlOiBOb2RlVHlwZSxcclxuICBjaGlsZHJlbjogTm9kZVtdLFxyXG4gIGV4cGFuZGVkPzogYm9vbGVhbixcclxuICBpc1Jvb3Q/OiBib29sZWFuXHJcbn1cclxuZXhwb3J0IGVudW0gQWN0aW9uVHlwZSB7XHJcbiAgYWRkID0gMSxcclxuICByZW1vdmUgPSAyLFxyXG4gIG1vdmUgPSAzLFxyXG4gIG1vZGlmaWVkID0gNFxyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVhc29uaW5nIHtcclxuICBjb2RlOiBzdHJpbmcsXHJcbiAgZGVzY3JpcHRpb246IHN0cmluZyxcclxuICBhY3Rpb246IEFjdGlvblR5cGUsXHJcbiAgbm9kZTogc3RyaW5nXHJcbn1cclxuXHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IE5vZGUsIE5vZGVUeXBlIH0gZnJvbSAnLi8uLi9pbnRlcmZhY2VzL25vZGUuaW50ZXJmYWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE5vZGVNYW5hZ2VyIHtcclxuICBmaWx0ZXJlZFRleHQ6IFN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgfVxyXG5cclxuICBnZW5lcmF0ZU5vZGVJZCgpIHtcclxuICAgIGNvbnN0IG1pbiA9IDE7XHJcbiAgICBjb25zdCBtYXggPSAxMDAwMFxyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XHJcbiAgfVxyXG5cclxuICBnZXRGaWx0ZXJlZFRleHQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maWx0ZXJlZFRleHQ7XHJcbiAgfVxyXG5cclxuICBnZXROZXdOb2RlKG5vZGU6IE5vZGUpOiBOb2RlIHtcclxuICAgIGNvbnN0IGlkID0gdGhpcy5nZW5lcmF0ZU5vZGVJZCgpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaWQ6IGlkLFxyXG4gICAgICBuYW1lOiAnbmFtZScsIFxyXG4gICAgICB2YWx1ZTogJ3ZhbHVlJyxcclxuICAgICAgcGFyZW50OiBub2RlLnR5cGUsXHJcbiAgICAgIHBhcmVudE5vZGU6IG5vZGUsXHJcbiAgICAgIHR5cGU6IE5vZGVUeXBlLmxpdGVyYWwsXHJcbiAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgZXhwYW5kZWQ6IGZhbHNlXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgc2V0RmlsdGVyZWRUZXh0KHRleHQpIHtcclxuICAgIHRoaXMuZmlsdGVyZWRUZXh0ID0gdGV4dDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEcm9wRXZlbnQsIERyYWdFdmVudCB9IGZyb20gJ2RyYWctZW5hYmxlZCc7XHJcblxyXG5pbXBvcnQgeyBOb2RlTWFuYWdlciB9IGZyb20gJy4uL2luamVjdGFibGVzL25vZGUtbWFuYWdlcic7XHJcbmltcG9ydCB7IEZyZWVKc29uU2VhcmNoIH0gZnJvbSAnLi4vcGlwZXMvanNvbi1zZWFyY2gnO1xyXG5pbXBvcnQgeyBGcmVlSnNvbkxhYmVsIH0gZnJvbSAnLi9qc29uLWxhYmVsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5vZGUsIE5vZGVUeXBlLCBSZWFzb25pbmcsIEFjdGlvblR5cGUgfSBmcm9tICcuLi9pbnRlcmZhY2VzL25vZGUuaW50ZXJmYWNlJztcclxuLy9pbXBvcnQgeyBGcmVlSnNvbkRpYWxvZyB9IGZyb20gJy4vanNvbi1kaWFsb2cuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZnJlZS1qc29uJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vanNvbi5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vanNvbi5jb21wb25lbnQuc2NzcyddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRnJlZUpzb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBjaGlsZHJlbjtcclxuICBcclxuICBASW5wdXQoXCJ0cmFuc2Zvcm1lZERhdGFcIilcclxuICB0cmFuc2Zvcm1lZERhdGE7XHJcbiAgXHJcbiAgQElucHV0KFwicmVhc29uaW5nXCIpXHJcbiAgcmVhc29uaW5nOiBSZWFzb25pbmdbXTtcclxuXHJcbiAgQElucHV0KFwicmVhc29uaW5nQ29kZXNcIilcclxuICByZWFzb25pbmdDb2Rlczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgcm9vdChub2RlIDogTm9kZSApe1xyXG4gICAgaWYgKG5vZGUpIHtcclxuICAgICAgdGhpcy5jaGlsZHJlbiA9IG5vZGU7XHJcbiAgICAgIGlmICh0aGlzLnJlYXNvbmluZykge1xyXG4gICAgICAgIHRoaXMucmVhc29uaW5nID0gW107XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgcGFyZW50OiBOb2RlID0ge1xyXG4gICAgICAgIGlkOiB0aGlzLm1hbmFnZXIuZ2VuZXJhdGVOb2RlSWQoKSxcclxuICAgICAgICBuYW1lOiBcIlJvb3RcIixcclxuICAgICAgICB2YWx1ZTogXCJPYmplY3RcIixcclxuICAgICAgICBwYXJlbnQ6IE5vZGVUeXBlLmFycmF5LFxyXG4gICAgICAgIHR5cGU6IE5vZGVUeXBlLmFycmF5LFxyXG4gICAgICAgIGV4cGFuZGVkOiB0cnVlLFxyXG4gICAgICAgIGNoaWxkcmVuOiB1bmRlZmluZWQsXHJcbiAgICAgICAgaXNSb290OiB0cnVlXHJcbiAgICAgIH1cclxuICAgICAgcGFyZW50LmNoaWxkcmVuID0gdGhpcy50cmFuc2Zvcm1Ob2RlVG9JbnRlcm5hbFN0cnVjdGlvbih0aGlzLmNoaWxkcmVuLCBwYXJlbnQpXHJcblxyXG4gICAgICB0aGlzLnRyYW5zZm9ybWVkRGF0YSA9IFsgcGFyZW50IF07XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldCByb290KCk6IE5vZGV7XHJcbiAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgc2F2ZShmbGFnIDogYm9vbGVhbiApe1xyXG4gICAgICBpZiAoZmxhZykge1xyXG4gICAgICAgIGNvbnN0IHNhdmVkTm9kZSA9IHRoaXMudHJhbnNmb3JtZWRJbnRlcm5hbFN0cnVjdHVyZUJhY2tUb05vZGUodGhpcy50cmFuc2Zvcm1lZERhdGFbMF0uY2hpbGRyZW4sIE5vZGVUeXBlLmpzb24pO1xyXG4gICAgICAgIHRoaXMub25wdWJsaXNoLmVtaXQoc2F2ZWROb2RlKVxyXG4gICAgICB9XHJcbiAgfVxyXG4gIGdldCBzYXZlKCl7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIEBPdXRwdXQoXCJvbnB1Ymxpc2hcIilcclxuICBvbnB1Ymxpc2ggPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgXHJcbiAgQE91dHB1dChcIm9uY2hhbmdlXCIpXHJcbiAgb25jaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgXHJcbiAgZXhwYW5kZWQ6Qm9vbGVhbjtcclxuICBcclxuICBjb25zdHJ1Y3RvcihcclxuXHQgIHByaXZhdGUgbWFuYWdlcjpOb2RlTWFuYWdlclxyXG5cdCkge1xyXG5cdCAgXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRyYW5zZm9ybWVkSW50ZXJuYWxTdHJ1Y3R1cmVCYWNrVG9Ob2RlKCByb290LCBwYXJlbnQgKSB7XHJcbiAgICBsZXQganNvbiA9IHt9O1xyXG4gICAgbGV0IGFycmF5ID0gW107XHJcblxyXG4gICAgcm9vdC5tYXAoIChpdGVtOiBOb2RlKSA9PiB7XHJcbiAgICAgIGlmIChwYXJlbnQgPT09IE5vZGVUeXBlLmpzb24pIHsgICAgICAgIFxyXG4gICAgICAgIGlmIChpdGVtLnR5cGUgPT09IE5vZGVUeXBlLmxpdGVyYWwpIHtcclxuICAgICAgICAgIGFycmF5LnB1c2goaXRlbS52YWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09IE5vZGVUeXBlLnBhaXIpIHtcclxuICAgICAgICAgIGpzb25baXRlbS5uYW1lXSA9IGl0ZW0udmFsdWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09IE5vZGVUeXBlLmFycmF5KSB7XHJcbiAgICAgICAgICBqc29uW2l0ZW0ubmFtZV0gPSB0aGlzLnRyYW5zZm9ybWVkSW50ZXJuYWxTdHJ1Y3R1cmVCYWNrVG9Ob2RlKGl0ZW0uY2hpbGRyZW4sIGl0ZW0ucGFyZW50KTtcclxuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gTm9kZVR5cGUuanNvbikge1xyXG4gICAgICAgICAganNvbltpdGVtLm5hbWVdID0gdGhpcy50cmFuc2Zvcm1lZEludGVybmFsU3RydWN0dXJlQmFja1RvTm9kZShpdGVtLmNoaWxkcmVuLCBpdGVtLnBhcmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHBhcmVudCA9PT0gTm9kZVR5cGUuYXJyYXkpe1xyXG4gICAgICAgIGlmIChpdGVtLnR5cGUgPT09IE5vZGVUeXBlLmxpdGVyYWwpIHtcclxuICAgICAgICAgIGFycmF5LnB1c2goaXRlbS52YWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09IE5vZGVUeXBlLmpzb24pIHtcclxuICAgICAgICAgIGFycmF5LnB1c2godGhpcy50cmFuc2Zvcm1lZEludGVybmFsU3RydWN0dXJlQmFja1RvTm9kZShpdGVtLCBpdGVtLnBhcmVudCkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSBOb2RlVHlwZS5hcnJheSkge1xyXG4gICAgICAgICAgYXJyYXkucHVzaCh0aGlzLnRyYW5zZm9ybWVkSW50ZXJuYWxTdHJ1Y3R1cmVCYWNrVG9Ob2RlKGl0ZW0uY2hpbGRyZW4sIGl0ZW0ucGFyZW50KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBhcnJheS5sZW5ndGggPyBhcnJheSA6IGpzb247XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRyYW5zZm9ybU5vZGVUb0ludGVybmFsU3RydWN0aW9uKG5vZGUsIHBhcmVudDogTm9kZSkge1xyXG4gICAgbGV0IHJlc3VsdCA9IG5vZGU7XHJcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgIGNvbnN0IGNoaWxkcmVuOiBOb2RlW10gPSBbXTtcclxuICAgICAgbm9kZS5tYXAoIChpdGVtKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc3ViTm9kZTogTm9kZSA9IHtcclxuICAgICAgICAgIGlkOiB0aGlzLm1hbmFnZXIuZ2VuZXJhdGVOb2RlSWQoKSxcclxuICAgICAgICAgIG5hbWU6IFwiXCIsXHJcbiAgICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICAgIHBhcmVudDogTm9kZVR5cGUuYXJyYXksXHJcbiAgICAgICAgICBwYXJlbnROb2RlOiBwYXJlbnQsXHJcbiAgICAgICAgICB0eXBlOiBOb2RlVHlwZS5hcnJheSxcclxuICAgICAgICAgIGNoaWxkcmVuOiBbXVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBqc29uVmFsdWU6IGFueSA9IHRoaXMudHJhbnNmb3JtTm9kZVRvSW50ZXJuYWxTdHJ1Y3Rpb24oaXRlbSwgc3ViTm9kZSk7XHJcbiAgICAgICAgaWYgKGpzb25WYWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICBzdWJOb2RlLmNoaWxkcmVuID0ganNvblZhbHVlO1xyXG4gICAgICAgICAgY2hpbGRyZW4ucHVzaChzdWJOb2RlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3ViTm9kZS52YWx1ZSA9IGpzb25WYWx1ZTtcclxuICAgICAgICAgIHN1Yk5vZGUudHlwZSA9IE5vZGVUeXBlLmxpdGVyYWw7XHJcbiAgICAgICAgICBjaGlsZHJlbi5wdXNoKHN1Yk5vZGUpO1xyXG4gICAgICAgIH0gICAgICBcclxuICAgICAgfSk7XHJcbiAgICAgIHJlc3VsdCA9IGNoaWxkcmVuO1xyXG4gICAgfSBlbHNlIGlmIChub2RlIGluc3RhbmNlb2YgT2JqZWN0KSB7XHJcbiAgICAgIGNvbnN0IGxpc3QgPSBPYmplY3Qua2V5cyhub2RlKTtcclxuICAgICAgY29uc3QgY2hpbGRyZW46IE5vZGVbXSA9IFtdO1xyXG4gICAgICBsaXN0Lm1hcCggKGl0ZW0pID0+IHtcclxuICAgICAgICBjb25zdCBzdWJOb2RlOiBOb2RlID0ge1xyXG4gICAgICAgICAgaWQ6IHRoaXMubWFuYWdlci5nZW5lcmF0ZU5vZGVJZCgpLFxyXG4gICAgICAgICAgbmFtZTogaXRlbSxcclxuICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgcGFyZW50OiBOb2RlVHlwZS5qc29uLFxyXG4gICAgICAgICAgcGFyZW50Tm9kZTogcGFyZW50LFxyXG4gICAgICAgICAgdHlwZTogTm9kZVR5cGUuYXJyYXksXHJcbiAgICAgICAgICBjaGlsZHJlbjogW11cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QganNvblZhbHVlOiBhbnkgPSB0aGlzLnRyYW5zZm9ybU5vZGVUb0ludGVybmFsU3RydWN0aW9uKG5vZGVbaXRlbV0sIHN1Yk5vZGUpO1xyXG4gICAgICAgIGlmIChqc29uVmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgc3ViTm9kZS5jaGlsZHJlbiA9IGpzb25WYWx1ZTtcclxuICAgICAgICAgIGNoaWxkcmVuLnB1c2goc3ViTm9kZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN1Yk5vZGUudmFsdWUgPSBqc29uVmFsdWU7XHJcbiAgICAgICAgICBzdWJOb2RlLnR5cGUgPSBOb2RlVHlwZS5wYWlyO1xyXG4gICAgICAgICAgY2hpbGRyZW4ucHVzaChzdWJOb2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXN1bHQgPSBjaGlsZHJlbjtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICB9XHJcblxyXG4gIGFkZE5ld05vZGUoZXZlbnQsIG5vZGUpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBpZih0aGlzLnJlYXNvbmluZykge1xyXG4gICAgICAvLyBsZXQgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihGcmVlSnNvbkRpYWxvZywge1xyXG4gICAgICAvLyAgIGRhdGE6IHsgXHJcbiAgICAgIC8vICAgICBhY3Rpb246ICdhZGQnLFxyXG4gICAgICAvLyAgICAgbm9kZTogbm9kZSxcclxuICAgICAgLy8gICAgIHJlYXNvbmluZzogdGhpcy5yZWFzb25pbmcsXHJcbiAgICAgIC8vICAgICBjb2RlczogdGhpcy5yZWFzb25pbmdDb2Rlc1xyXG4gICAgICAvLyAgIH0sXHJcbiAgICAgIC8vIH0pO1xyXG4gICAgICAvLyBkaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgLy8gICBpZiAocmVzdWx0Lm9rKSB7XHJcbiAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcIlRPRE86IHBvcHVwIHdpbGwgc2V0IG5vZGUgdHlwZVwiKTtcclxuICAgICAgLy8gICAgIGNvbnN0IHR5cGUgPSByZXN1bHQubm90ZVR5cGU7XHJcbiAgICAgIC8vICAgICBub2RlLmNoaWxkcmVuID0gWy4uLm5vZGUuY2hpbGRyZW4sIHRoaXMubWFuYWdlci5nZXROZXdOb2RlKG5vZGUpXTtcclxuICAgICAgLy8gICAgIG5vZGUuZXhwYW5kZWQgPSB0cnVlO1xyXG4gICAgICAvLyAgICAgdGhpcy5jaGFuZ2VQZXJmb3JtZWQoe30pO1xyXG4gICAgICAvLyAgIH1cclxuICAgICAgLy8gfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBub2RlLmNoaWxkcmVuID0gWy4uLm5vZGUuY2hpbGRyZW4sIHRoaXMubWFuYWdlci5nZXROZXdOb2RlKG5vZGUpXTtcclxuICAgICAgbm9kZS5leHBhbmRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuY2hhbmdlUGVyZm9ybWVkKHt9KTtcclxuICAgIH1cclxuICB9XHJcbiAgbW92ZU5vZGUoZXZlbnQsIG5vZGUsIG1vdmVVcCkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIGlmKHRoaXMucmVhc29uaW5nKSB7XHJcbiAgICAgIC8vIGxldCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKEZyZWVKc29uRGlhbG9nLCB7XHJcbiAgICAgIC8vICAgZGF0YTogeyBcclxuICAgICAgLy8gICAgIGFjdGlvbjogJ21vdmUnLFxyXG4gICAgICAvLyAgICAgZnJvbTogdGhpcy50cmFuc2Zvcm1lZERhdGEuaW5kZXhPZihub2RlKSxcclxuICAgICAgLy8gICAgIGRpcmVjdGlvbjogbW92ZVVwLFxyXG4gICAgICAvLyAgICAgbm9kZTogbm9kZSxcclxuICAgICAgLy8gICAgIHJlYXNvbmluZzogdGhpcy5yZWFzb25pbmcsXHJcbiAgICAgIC8vICAgICBjb2RlczogdGhpcy5yZWFzb25pbmdDb2Rlc1xyXG4gICAgICAvLyAgIH0sXHJcbiAgICAgIC8vIH0pO1xyXG4gICAgICAvLyBkaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgLy8gICBpZiAocmVzdWx0Lm9rKSB7XHJcbiAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcIlRPRE86IHBvcHVwIHdpbGwgZ2l2ZSBpbmRleCB0byBnbyB0b1wiKTtcclxuICAgICAgLy8gICAgIGxldCBmcm9tID0gcmVzdWx0LmZyb207XHJcbiAgICAgIC8vICAgICBsZXQgdG8gPSBtb3ZlVXAgPyBcclxuICAgICAgLy8gICAgICAgICAgICAgICAoZnJvbSA+IDAgPyBmcm9tIC0gMSA6IGZyb20pIDogXHJcbiAgICAgIC8vICAgICAgICAgICAgICAgKGZyb20gPCAodGhpcy50cmFuc2Zvcm1lZERhdGEubGVuZ3RoIC0gMSkgPyBmcm9tICsgMSA6IGZyb20pO1xyXG4gICAgICBcclxuICAgICAgLy8gICAgIHRoaXMudHJhbnNmb3JtZWREYXRhLnNwbGljZSh0bywgMCwgdGhpcy50cmFuc2Zvcm1lZERhdGEuc3BsaWNlKGZyb20sIDEpWzBdKTtcclxuICAgICAgLy8gICAgIHRoaXMuY2hhbmdlUGVyZm9ybWVkKHt9KTtcclxuICAgICAgLy8gICB9XHJcbiAgICAgIC8vIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IGZyb20gPSB0aGlzLnRyYW5zZm9ybWVkRGF0YS5pbmRleE9mKG5vZGUpO1xyXG4gICAgICBsZXQgdG8gPSBtb3ZlVXAgPyBcclxuICAgICAgICAgICAgICAgIChmcm9tID4gMCA/IGZyb20gLSAxIDogZnJvbSkgOiBcclxuICAgICAgICAgICAgICAgIChmcm9tIDwgKHRoaXMudHJhbnNmb3JtZWREYXRhLmxlbmd0aCAtIDEpID8gZnJvbSArIDEgOiBmcm9tKTtcclxuICBcclxuICAgICAgdGhpcy50cmFuc2Zvcm1lZERhdGEuc3BsaWNlKHRvLCAwLCB0aGlzLnRyYW5zZm9ybWVkRGF0YS5zcGxpY2UoZnJvbSwgMSlbMF0pO1xyXG4gICAgICB0aGlzLmNoYW5nZVBlcmZvcm1lZCh7fSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGRlbGV0ZU5vZGUoZXZlbnQsIG5vZGUpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGlmKHRoaXMucmVhc29uaW5nKSB7XHJcbiAgICAgIC8vIGxldCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKEZyZWVKc29uRGlhbG9nLCB7XHJcbiAgICAgIC8vICAgZGF0YTogeyBcclxuICAgICAgLy8gICAgIGFjdGlvbjogJ3JlbW92ZScsXHJcbiAgICAgIC8vICAgICBub2RlOiBub2RlLFxyXG4gICAgICAvLyAgICAgcmVhc29uaW5nOiB0aGlzLnJlYXNvbmluZyxcclxuICAgICAgLy8gICAgIGNvZGVzOiB0aGlzLnJlYXNvbmluZ0NvZGVzXHJcbiAgICAgIC8vICAgfSxcclxuICAgICAgLy8gfSk7XHJcbiAgICAgIC8vIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICAvLyAgIGlmIChyZXN1bHQub2spIHtcclxuICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiVE9ETzogcHJvbXB0IHJlYXNvbiBhZCBzYXZlIGl0IGluIGEgY29uc3RydWN0XCIpO1xyXG4gICAgICAvLyAgICAgdGhpcy50cmFuc2Zvcm1lZERhdGEuc3BsaWNlKHRoaXMudHJhbnNmb3JtZWREYXRhLmluZGV4T2Yobm9kZSksIDEpO1xyXG4gICAgICAvLyAgICAgdGhpcy5jaGFuZ2VQZXJmb3JtZWQoe30pO1xyXG4gICAgICAvLyAgIH1cclxuICAgICAgLy8gfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnRyYW5zZm9ybWVkRGF0YS5zcGxpY2UodGhpcy50cmFuc2Zvcm1lZERhdGEuaW5kZXhPZihub2RlKSwgMSk7XHJcbiAgICAgIHRoaXMuY2hhbmdlUGVyZm9ybWVkKHt9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhhc0NoZXZyb25Eb3duKGNoaWxkKXtcclxuICAgIHJldHVybiBjaGlsZCAmJiBjaGlsZC5jaGlsZHJlbiAmJiBjaGlsZC5jaGlsZHJlbi5sZW5ndGggPiAwICYmIGNoaWxkLmV4cGFuZGVkXHJcbiAgfVxyXG5cclxuICBoYXNDaGV2cm9uUmlnaHQoY2hpbGQpIHtcclxuICAgIHJldHVybiBjaGlsZCAmJiBjaGlsZC5jaGlsZHJlbiAmJiBjaGlsZC5jaGlsZHJlbi5sZW5ndGggIT0gMCAmJiAhY2hpbGQuZXhwYW5kZWRcclxuICB9XHJcblxyXG5cdGRyYWdFbmFibGVkKGV2ZW50OiBEcmFnRXZlbnQpIHtcclxuXHRcdHJldHVybiAhZXZlbnQubWVkaXVtLmlzUm9vdCAmJiAoZXZlbnQubWVkaXVtLm5hbWUubGVuZ3RoIHx8IGV2ZW50Lm1lZGl1bS52YWx1ZS5sZW5ndGgpO1xyXG5cdH1cclxuXHRkcm9wRW5hYmxlZChldmVudDogRHJvcEV2ZW50KSB7XHJcblx0XHRyZXR1cm4gIWV2ZW50LmRlc3RpbmF0aW9uLm1lZGl1bS5pc1Jvb3Q7XHJcblx0fVxyXG4gIG9uRHJhZ1N0YXJ0KGV2ZW50KSB7XHJcbiAgICAvLyB0aGlzLm1hbmFnZXIuc2V0U2VsZWN0ZWROb2RlKGV2ZW50Lm1lZGl1bSk7XHJcbiAgfVxyXG5cclxuICBvbkRyYWdFbmQoZXZlbnQ6IERyb3BFdmVudCkge1xyXG4gICAgaWYgKGV2ZW50LmRlc3RpbmF0aW9uICYmIGV2ZW50LnNvdXJjZS5tZWRpdW0gIT09IGV2ZW50LmRlc3RpbmF0aW9uLm1lZGl1bSkge1xyXG4gICAgICBjb25zdCBzb3VyY2VJbmRleCA9IHRoaXMudHJhbnNmb3JtZWREYXRhLmluZGV4T2YoZXZlbnQuc291cmNlLm1lZGl1bSk7XHJcblxyXG4gICAgICBpZih0aGlzLnJlYXNvbmluZykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWRzYWRhc1wiKVxyXG4gICAgICAgIC8vIGxldCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKEZyZWVKc29uRGlhbG9nLCB7XHJcbiAgICAgICAgLy8gICBkYXRhOiB7IFxyXG4gICAgICAgIC8vICAgICBhY3Rpb246ICdkcmFnJyxcclxuICAgICAgICAvLyAgICAgZnJvbTogc291cmNlSW5kZXgsXHJcbiAgICAgICAgLy8gICAgIHJlYXNvbmluZzogdGhpcy5yZWFzb25pbmcsXHJcbiAgICAgICAgLy8gICAgIGNvZGVzOiB0aGlzLnJlYXNvbmluZ0NvZGVzXHJcbiAgICAgICAgLy8gICB9LFxyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIC8vIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICAgIC8vICAgaWYgKHJlc3VsdC5vaykge1xyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcIlRPRE86IHByb21wdCByZWFzb24gYWQgc2F2ZSBpdCBpbiBhIGNvbnN0cnVjdFwiKTtcclxuICAgICAgICAvLyAgICAgdGhpcy50cmFuc2Zvcm1lZERhdGEuc3BsaWNlKHNvdXJjZUluZGV4LCAxKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5jaGFuZ2VQZXJmb3JtZWQoe30pO1xyXG4gICAgICAgIC8vICAgfVxyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtZWREYXRhLnNwbGljZShzb3VyY2VJbmRleCwgMSk7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VQZXJmb3JtZWQoe30pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkRyb3AoZXZlbnQpe1xyXG4gICAgaWYgKGV2ZW50LmRlc3RpbmF0aW9uICYmIGV2ZW50LnNvdXJjZSAmJiBldmVudC5zb3VyY2UubWVkaXVtICE9PSBldmVudC5kZXN0aW5hdGlvbi5tZWRpdW0pIHtcclxuICAgICAgY29uc3Qgc291cmNlTm9kZSA9IGV2ZW50LnNvdXJjZS5tZWRpdW07XHJcbiAgICAgIGNvbnN0IGRlc3RpbmF0aW9uTm9kZSA9IGV2ZW50LmRlc3RpbmF0aW9uLm1lZGl1bTtcclxuICBcclxuICAgICAgZGVzdGluYXRpb25Ob2RlLmNoaWxkcmVuID0gWy4uLmRlc3RpbmF0aW9uTm9kZS5jaGlsZHJlbiwgc291cmNlTm9kZV07XHJcbiAgICAgIGlmIChkZXN0aW5hdGlvbk5vZGUuY2hpbGRyZW4ubGVuZ3RoKSB7XHJcbiAgICAgICAgZGVzdGluYXRpb25Ob2RlLmV4cGFuZGVkID0gdHJ1ZTtcclxuICAgICAgfSAgICBcclxuICAgICAgaWYgKGRlc3RpbmF0aW9uTm9kZS50eXBlID09PSBOb2RlVHlwZS5saXRlcmFsKSB7XHJcbiAgICAgICAgZGVzdGluYXRpb25Ob2RlLnR5cGUgPSBOb2RlVHlwZS5qc29uO1xyXG4gICAgICAgIGRlc3RpbmF0aW9uTm9kZS52YWx1ZT0gXCJcIjtcclxuICAgICAgfSBlbHNlIGlmIChkZXN0aW5hdGlvbk5vZGUudHlwZSA9PT0gTm9kZVR5cGUucGFpcikge1xyXG4gICAgICAgIGRlc3RpbmF0aW9uTm9kZS50eXBlID0gTm9kZVR5cGUuanNvbjtcclxuICAgICAgfSBlbHNlIGlmIChkZXN0aW5hdGlvbk5vZGUudHlwZSA9PT0gTm9kZVR5cGUuYXJyYXkpIHtcclxuICAgICAgICBpZiAoZGVzdGluYXRpb25Ob2RlLnBhcmVudCA9PT0gTm9kZVR5cGUuYXJyYXkgJiYgc291cmNlTm9kZS50eXBlID09PSBOb2RlVHlwZS5wYWlyKSB7XHJcbiAgICAgICAgICBzb3VyY2VOb2RlLnR5cGUgPSBOb2RlVHlwZS5qc29uO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBzb3VyY2VOb2RlLnBhcmVudCA9IGRlc3RpbmF0aW9uTm9kZS50eXBlO1xyXG5cclxuICAgICAgY29uc3QgaSA9IHNvdXJjZU5vZGUucGFyZW50Tm9kZS5jaGlsZHJlbi5pbmRleE9mKHNvdXJjZU5vZGUpO1xyXG4gICAgICBzb3VyY2VOb2RlLnBhcmVudE5vZGUuY2hpbGRyZW4uc3BsaWNlKGksIDEpO1xyXG4gICAgICBzb3VyY2VOb2RlLnBhcmVudE5vZGUgPSBkZXN0aW5hdGlvbk5vZGU7XHJcbiAgICAgIHRoaXMuY2hhbmdlUGVyZm9ybWVkKHt9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHRvR3JhbmRQYXJlbnQoZXZlbnQsIGNoaWxkKSB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgY29uc3QgcGFyZW50ID0gIGNoaWxkLnBhcmVudE5vZGU7XHJcbiAgICBjb25zdCBncmFuZFBhcmVudCA9ICBjaGlsZC5wYXJlbnROb2RlLnBhcmVudE5vZGU7XHJcbiAgICBjb25zdCBpID0gcGFyZW50LmNoaWxkcmVuLmluZGV4T2YoY2hpbGQpO1xyXG4gICAgY29uc3QgcCA9IGdyYW5kUGFyZW50LmNoaWxkcmVuLmluZGV4T2YocGFyZW50KTtcclxuXHJcbiAgICBwYXJlbnQuY2hpbGRyZW4uc3BsaWNlKGksIDEpO1xyXG5cclxuICAgIGlmIChwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIGlmICghcGFyZW50Lm5hbWUubGVuZ3RoICYmICFwYXJlbnQudmFsdWUubGVuZ3RoKSB7XHJcbiAgICAgICAgZ3JhbmRQYXJlbnQuY2hpbGRyZW4uc3BsaWNlKHAsIDEpO1xyXG4gICAgICAgIGdyYW5kUGFyZW50LmNoaWxkcmVuLnNwbGljZShwLCAwLCBjaGlsZCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcGFyZW50LnR5cGUgPSBOb2RlVHlwZS5wYWlyO1xyXG4gICAgICAgIGdyYW5kUGFyZW50LmNoaWxkcmVuLnNwbGljZShwICsgMSwgMCwgY2hpbGQpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBncmFuZFBhcmVudC5jaGlsZHJlbi5zcGxpY2UocCArIDEsIDAsIGNoaWxkKTtcclxuICAgIH1cclxuICAgIGNoaWxkLnBhcmVudE5vZGUgPSBncmFuZFBhcmVudDtcclxuICAgIHRoaXMuY2hhbmdlUGVyZm9ybWVkKHt9KTtcclxuICB9XHJcblxyXG4gIGdldEZpbHRlcmVkVGV4dCgpe1xyXG4gICAgdGhpcy5tYW5hZ2VyLmdldEZpbHRlcmVkVGV4dCgpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlKGV2ZW50LCBjaGlsZCkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY2hpbGQuZXhwYW5kZWQgPSAhY2hpbGQuZXhwYW5kZWQ7XHJcbiAgfVxyXG5cclxuICBrZXlkb3duKGV2ZW50LCBpdGVtKSB7XHJcbiAgICBjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcbiAgICBpZiAoKGNvZGUgPT09IDEzKSB8fCAoY29kZSA9PT0gMzIpKSB7XHJcblx0XHRcdHRoaXMudG9nZ2xlKGV2ZW50LCBpdGVtKTtcclxuXHRcdH1cclxuICB9XHJcbiAga2V5bW92ZShldmVudCwgaXRlbSwgbW92ZVVwKSB7XHJcbiAgICBjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcbiAgICBpZiAoKGNvZGUgPT09IDEzKSB8fCAoY29kZSA9PT0gMzIpKSB7XHJcbiAgICAgIHRoaXMubW92ZU5vZGUoZXZlbnQsIGl0ZW0sIG1vdmVVcCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGtleWRlbGV0ZShldmVudCwgaXRlbSkge1xyXG4gICAgY29uc3QgY29kZSA9IGV2ZW50LndoaWNoO1xyXG4gICAgaWYgKChjb2RlID09PSAxMykgfHwgKGNvZGUgPT09IDMyKSkge1xyXG5cdFx0XHR0aGlzLmRlbGV0ZU5vZGUoZXZlbnQsIGl0ZW0pO1xyXG5cdFx0fVxyXG4gIH1cclxuICBrZXl0b0dyYW5kUGFyZW50KGV2ZW50LCBpdGVtKSB7XHJcbiAgICBjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcbiAgICBpZiAoKGNvZGUgPT09IDEzKSB8fCAoY29kZSA9PT0gMzIpKSB7XHJcblx0XHRcdHRoaXMudG9HcmFuZFBhcmVudChldmVudCwgaXRlbSk7XHJcblx0XHR9XHJcbiAgfVxyXG4gIGtleWFkZChldmVudCwgaXRlbSkge1xyXG4gICAgY29uc3QgY29kZSA9IGV2ZW50LndoaWNoO1xyXG4gICAgaWYgKChjb2RlID09PSAxMykgfHwgKGNvZGUgPT09IDMyKSkge1xyXG5cdFx0XHR0aGlzLmFkZE5ld05vZGUoZXZlbnQsIGl0ZW0pO1xyXG5cdFx0fVxyXG4gIH1cclxuICBjYW5BZGROb2RlKG5vZGUpIHtcclxuICAgIHJldHVybiAobm9kZS50eXBlID09PSBOb2RlVHlwZS5qc29uKSB8fCAobm9kZS50eXBlID09PSBOb2RlVHlwZS5hcnJheSk7XHJcbiAgfVxyXG4gIGNoYW5nZVBlcmZvcm1lZChldmVudCkge1xyXG4gICAgaWYgKHRoaXMuY2hpbGRyZW4pIHtcclxuICAgICAgY29uc3Qgc2F2ZWROb2RlID0gdGhpcy50cmFuc2Zvcm1lZEludGVybmFsU3RydWN0dXJlQmFja1RvTm9kZSh0aGlzLnRyYW5zZm9ybWVkRGF0YVswXS5jaGlsZHJlbiwgTm9kZVR5cGUuanNvbik7XHJcbiAgICAgIHRoaXMub25jaGFuZ2UuZW1pdCh7XHJcbiAgICAgICAgZGF0YTogc2F2ZWROb2RlLFxyXG4gICAgICAgIHJlYXNvbmluZzogdGhpcy5yZWFzb25pbmdcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm9uY2hhbmdlLmVtaXQoe30pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5vZGVNYW5hZ2VyIH0gZnJvbSAnLi4vaW5qZWN0YWJsZXMvbm9kZS1tYW5hZ2VyJztcclxuXHJcbkBDb21wb25lbnQoeyBcclxuICBzZWxlY3RvcjogJ2pzb24tc2VhcmNoLWZpZWxkJywgXHJcbiAgdGVtcGxhdGU6YDxpbnB1dCB0eXBlPSd0ZXh0JyBbKG5nTW9kZWwpXT0ndmFsJyAobmdNb2RlbENoYW5nZSk9J2ZpbHRlcih2YWwpJz5gXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGcmVlSnNvblNlYXJjaEZpZWxke1xyXG4gIEBJbnB1dChcInZhbFwiKVxyXG4gIHZhbDogc3RyaW5nO1xyXG4gIFxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtYW5hZ2VyOiBOb2RlTWFuYWdlclxyXG4gICkge31cclxuXHJcbiAgZmlsdGVyKHZhbHVlKSB7XHJcbiAgICB0aGlzLm1hbmFnZXIuc2V0RmlsdGVyZWRUZXh0KHZhbHVlKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtDb21wb25lbnQsIFZpZXdDaGlsZCwgUmVuZGVyZXIsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi8uLi9pbnRlcmZhY2VzL25vZGUuaW50ZXJmYWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnanNvbi1sYWJlbCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2pzb24tbGFiZWwuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2pzb24tbGFiZWwuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRnJlZUpzb25MYWJlbCB7XHJcblxyXG4gIGVkaXROYW1lID0gZmFsc2U7XHJcbiAgZWRpdFZhbHVlID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgQFZpZXdDaGlsZChcIm5hbWVFZGl0b3JcIilcclxuICBuYW1lRWRpdG9yO1xyXG5cclxuICBAVmlld0NoaWxkKFwidmFsdWVFZGl0b3JcIilcclxuICB2YWx1ZUVkaXRvcjtcclxuXHJcbiAgQElucHV0KClcclxuICBub2RlOiBOb2RlO1xyXG5cclxuICBAT3V0cHV0KFwib25jaGFuZ2VcIilcclxuICBvbmNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgbmFtZUxhYmVsS2V5ZG93bihldmVudCkge1xyXG4gICAgY29uc3QgY29kZSA9IGV2ZW50LndoaWNoO1xyXG4gICAgaWYgKChjb2RlID09PSAxMykgfHwgKGNvZGUgPT09IDMyKSkge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QoZXZlbnQudGFyZ2V0LCBcImNsaWNrXCIpO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpPT57XHJcbiAgICAgICAgaWYgKHRoaXMubmFtZUVkaXRvcikge1xyXG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5pbnZva2VFbGVtZW50TWV0aG9kKHRoaXMubmFtZUVkaXRvci5uYXRpdmVFbGVtZW50LCBcImZvY3VzXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSw2Nik7XHJcblx0XHR9IGVsc2UgaWYgKGNvZGUgPT09IDI3KSB7XHJcbiAgICAgIHRoaXMuZWRpdE5hbWUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbiAgdmFsdWVMYWJlbEtleWRvd24oZXZlbnQpIHtcclxuICAgIGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcclxuICAgIGlmICgoY29kZSA9PT0gMTMpIHx8IChjb2RlID09PSAzMikpIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5pbnZva2VFbGVtZW50TWV0aG9kKGV2ZW50LnRhcmdldCwgXCJjbGlja1wiKTtcclxuICAgICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICAgIGlmICh0aGlzLnZhbHVlRWRpdG9yKSB7XHJcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QodGhpcy52YWx1ZUVkaXRvci5uYXRpdmVFbGVtZW50LCBcImZvY3VzXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSw2Nik7XHJcblx0XHR9IGVsc2UgaWYgKGNvZGUgPT09IDI3KSB7XHJcbiAgICAgIHRoaXMuZWRpdFZhbHVlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjbGlja05hbWUoZXZlbnQpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIHRoaXMuZWRpdE5hbWUgPSB0aGlzLm5vZGUubmFtZSAhPT0nUm9vdCc7XHJcbiAgICBzZXRUaW1lb3V0KCgpPT57XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuaW52b2tlRWxlbWVudE1ldGhvZCh0aGlzLm5hbWVFZGl0b3IubmF0aXZlRWxlbWVudCwgXCJmb2N1c1wiKTtcclxuICAgIH0sNjYpO1xyXG4gIH1cclxuICBjbGlja1ZhbHVlKGV2ZW50KSB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB0aGlzLmVkaXRWYWx1ZSA9IHRoaXMubm9kZS52YWx1ZSAhPT0nT2JqZWN0JztcclxuICAgIHNldFRpbWVvdXQoKCk9PntcclxuICAgICAgdGhpcy5yZW5kZXJlci5pbnZva2VFbGVtZW50TWV0aG9kKHRoaXMudmFsdWVFZGl0b3IubmF0aXZlRWxlbWVudCwgXCJmb2N1c1wiKTtcclxuICAgIH0sNjYpO1xyXG4gIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOb2RlTWFuYWdlciB9IGZyb20gJy4uL2luamVjdGFibGVzL25vZGUtbWFuYWdlcic7XHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ25vZGVTZWFyY2gnLFxyXG4gIHB1cmU6IGZhbHNlXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGcmVlSnNvblNlYXJjaCBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtYW5hZ2VyOiBOb2RlTWFuYWdlclxyXG4gICl7XHJcbiAgfVxyXG5cclxuICBpc0JsYW5rKG9iajogYW55KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gb2JqID09PSB1bmRlZmluZWQgfHwgb2JqID09PSBudWxsO1xyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtKHZhbHVlKSB7XHJcbiAgICB2YXIgZmlsdGVyZWRUZXh0ID0gdGhpcy5tYW5hZ2VyLmdldEZpbHRlcmVkVGV4dCgpXHJcbiAgICBpZiAodGhpcy5pc0JsYW5rKGZpbHRlcmVkVGV4dCkpIHsgXHJcbiAgICAgIHJldHVybiB2YWx1ZVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHZhbHVlLmZpbHRlcigobm9kZSkgPT4gbm9kZS50ZXh0LmluZGV4T2YoZmlsdGVyZWRUZXh0KSA+IC0xKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBEcmFnRHJvcE1vZHVsZSB9IGZyb20gJ2RyYWctZW5hYmxlZCc7XHJcbmltcG9ydCB7IE5vZGVNYW5hZ2VyIH0gZnJvbSAnLi9pbmplY3RhYmxlcy9ub2RlLW1hbmFnZXInO1xyXG5pbXBvcnQgeyBGcmVlSnNvblNlYXJjaEZpZWxkIH0gZnJvbSAnLi9jb21wb25lbnRzL2pzb24tc2VhcmNoLWZpZWxkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZyZWVKc29uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2pzb24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgRnJlZUpzb25MYWJlbCB9IGZyb20gJy4vY29tcG9uZW50cy9qc29uLWxhYmVsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZyZWVKc29uU2VhcmNoIH0gZnJvbSAnLi9waXBlcy9qc29uLXNlYXJjaCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIERyYWdEcm9wTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgRnJlZUpzb25Db21wb25lbnQsXHJcbiAgICBGcmVlSnNvbkxhYmVsLFxyXG4gICAgRnJlZUpzb25TZWFyY2gsXHJcbiAgICBGcmVlSnNvblNlYXJjaEZpZWxkXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBGcmVlSnNvbkNvbXBvbmVudFxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIEZyZWVKc29uU2VhcmNoLFxyXG4gICAgTm9kZU1hbmFnZXJcclxuICBdLFxyXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEZyZWVKc29uTW9kdWxlIHt9XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFFRSxVQUFXO0lBQ1gs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