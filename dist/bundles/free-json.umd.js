(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common'), require('drag-enabled')) :
    typeof define === 'function' && define.amd ? define('free-json', ['exports', '@angular/core', '@angular/forms', '@angular/common', 'drag-enabled'], factory) :
    (factory((global['free-json'] = {}),global.ng.core,global.ng.forms,global.ng.common,global.dragEnabled));
}(this, (function (exports,core,forms,common,dragEnabled) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

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
    var NodeManager = (function () {
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        NodeManager.ctorParameters = function () { return []; };
        return NodeManager;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var FreeJsonComponent = (function () {
        function FreeJsonComponent(manager) {
            this.manager = manager;
            this.reasoningCodes = [];
            this.onpublish = new core.EventEmitter();
            this.onchange = new core.EventEmitter();
        }
        Object.defineProperty(FreeJsonComponent.prototype, "root", {
            get: /**
             * @return {?}
             */ function () {
                return this.children;
            },
            set: /**
             * @param {?} node
             * @return {?}
             */ function (node) {
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
             */ function () {
                return false;
            },
            set: /**
             * @param {?} flag
             * @return {?}
             */ function (flag) {
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
            { type: core.Component, args: [{
                        selector: 'free-json',
                        template: "<ul>\r\n  <li  *ngFor=\"let child of transformedData | nodeSearch\"\r\n        [dragEnabled]=\"dragEnabled.bind(this)\"\r\n        [medium]=\"child\"\r\n        (onDragEnd)='onDragEnd($event)'\r\n        (onDragStart)='onDragStart($event)'>\r\n    <div [dropEnabled]=\"dropEnabled.bind(this)\" \r\n        class='tree-node'\r\n        [id] = \"child.id\"\r\n        [medium]=\"child\"\r\n        [class.move]=\"!child.isRoot && (child.name.length || child.value.length)\"\r\n        (click)=\"toggle($event, child)\"\r\n        (onDrop)='onDrop($event)'>\r\n      <i  class='clickable fa fa-chevron-down' \r\n          tabindex=\"0\"\r\n          title=\"Collapse {{child.name}}\"\r\n          *ngIf='hasChevronDown(child)' \r\n          (keydown)='keydown($event, child)'\r\n          (click)='toggle($event, child)'></i>\r\n      <i  class='clickable fa fa-chevron-right' \r\n          tabindex=\"0\"\r\n          title=\"Expand {{child.name}}\"\r\n          *ngIf='hasChevronRight(child)' \r\n          (keydown)='keydown($event, child)'\r\n          (click)='toggle($event, child)'></i>\r\n      <i  class='fa fa-quote-right' \r\n          arria-hidden=\"true\"\r\n          *ngIf='child.type === 1'></i>\r\n          <i  class='fa fa-random' \r\n          arria-hidden=\"true\"\r\n          *ngIf='child.type === 2'></i>\r\n      <i  class='fa no-action fa-chevron-right' \r\n          arria-hidden=\"true\"\r\n          *ngIf='child.type === 4 && child.children.length == 0'></i>\r\n      <json-label \r\n            (onchange)=\"changePerformed($event)\"\r\n            [node]=\"child\"></json-label>\r\n      <span class=\"edit-actions\">\r\n      <i *ngIf=\"!child.isRoot\"\r\n          class=\"clickable fa pull-right fa-times\" \r\n          tabindex=\"0\"\r\n          title=\"Delete {{child.name}}\"\r\n          (click)='deleteNode($event, child)' \r\n          (keydown)='keydelete($event, child)'></i>\r\n      <i *ngIf=\"transformedData.length > 1 && !child.isRoot\"\r\n          class=\"clickable fa pull-right fa-angle-double-up\" \r\n          tabindex=\"0\"\r\n          title=\"Move up {{child.name}}\"\r\n          (click)='moveNode($event, child, true)' \r\n          (keydown)='keymove($event, child, true)'></i>\r\n      <i *ngIf=\"transformedData.length > 1 && !child.isRoot\"\r\n          class=\"clickable fa pull-right fa-angle-double-down\" \r\n          tabindex=\"0\"\r\n          title=\"Move down {{child.name}}\"\r\n          (click)='moveNode($event, child, false)' \r\n          (keydown)='keymove($event, child, false)'></i>\r\n      <i *ngIf=\"canAddNode(child)\"\r\n          class=\"clickable fa pull-right fa-plus\" \r\n          tabindex=\"0\"\r\n          title=\"Add New Child\"\r\n          (keydown)='keyadd($event, child)'\r\n          (click)='addNewNode($event, child)'></i>\r\n      <i *ngIf=\"!child.isRoot && child.parentNode.parentNode && (child.name.length || child.value.length)\"\r\n          class=\"clickable fa pull-right fa-angle-double-left\" \r\n          tabindex=\"0\"\r\n          title=\"Move to {{child.parentNode.parentNode.name}}\"\r\n          (click)='toGrandParent($event, child)' \r\n          (keydown)='keytoGrandParent($event, child)'></i>\r\n      </span>\r\n    </div>\r\n    <div *ngIf=\"child.expanded\">\r\n      <free-json \r\n            (onchange)=\"changePerformed($event)\"\r\n            [reasoning]=\"reasoning\"\r\n            [reasoningCodes]=\"reasoningCodes\"\r\n            [transformedData]='child.children'></free-json>\r\n    </div>\r\n  </li>\r\n</ul>\r\n\r\n",
                        styles: ["ul{list-style:none;min-width:400px}.tree-node{padding:0;border:1px solid #eef1f4;background:#f7f9ff;color:#7c9eb2;margin:3px 0;text-transform:capitalize;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.tree-node i{width:15px;height:15px;margin:10px 3px}.tree-node.move{cursor:move}.clickable{cursor:pointer}.no-action{color:transparent}.edit-actions{border-left:1px solid #eef1f4;float:right}.drag-over{background-color:#7c9eb2;color:#fff}.fa{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.fa-plus-square{color:green}.fa-minus-circle{color:red}"]
                    }] }
        ];
        /** @nocollapse */
        FreeJsonComponent.ctorParameters = function () {
            return [
                { type: NodeManager }
            ];
        };
        FreeJsonComponent.propDecorators = {
            transformedData: [{ type: core.Input, args: ["transformedData",] }],
            reasoning: [{ type: core.Input, args: ["reasoning",] }],
            reasoningCodes: [{ type: core.Input, args: ["reasoningCodes",] }],
            root: [{ type: core.Input }],
            save: [{ type: core.Input }],
            onpublish: [{ type: core.Output, args: ["onpublish",] }],
            onchange: [{ type: core.Output, args: ["onchange",] }]
        };
        return FreeJsonComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var FreeJsonSearchField = (function () {
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
            { type: core.Component, args: [{
                        selector: 'json-search-field',
                        template: "<input type='text' [(ngModel)]='val' (ngModelChange)='filter(val)'>"
                    }] }
        ];
        /** @nocollapse */
        FreeJsonSearchField.ctorParameters = function () {
            return [
                { type: NodeManager }
            ];
        };
        FreeJsonSearchField.propDecorators = {
            val: [{ type: core.Input, args: ["val",] }]
        };
        return FreeJsonSearchField;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var FreeJsonLabel = (function () {
        function FreeJsonLabel(renderer) {
            this.renderer = renderer;
            this.editName = false;
            this.editValue = false;
            this.onchange = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'json-label',
                        template: "<span *ngIf=\"editName && node.name !=='Root' && node.value !=='Object'\">\r\n    <input #nameEditor\r\n        type='text' \r\n        id=\"editName\"\r\n        placeholder=\"Name\"\r\n        (blur)=\"editName = false; onchange.emit();\" \r\n        [(ngModel)]='node.name'>\r\n</span>\r\n<span *ngIf='!editName && node.type !== 1'\r\n    class='locked name' \r\n    tabindex='0' \r\n    (keydown)='nameLabelKeydown($event)'\r\n    (click)=\"clickName($event)\"\r\n    [innerHTML]=\"node.name.length ? node.name : '&nbsp;'\">\r\n</span>\r\n<span *ngIf=\"editValue && node.name !=='Root' && node.value !=='Object'\">\r\n    <input #valueEditor\r\n        type='text' \r\n        id=\"editValue\"\r\n        placeholder=\"Value\"\r\n        (blur)=\"editValue = false; onchange.emit();\" \r\n        [(ngModel)]='node.value'>\r\n</span>\r\n<span *ngIf='!editValue && (node.type === 2 || node.type === 1) && node.value!=null'\r\n    class='locked' \r\n    [class.name]=\"node.type === 4\"\r\n    tabindex='0' \r\n    (keydown)='valueLabelKeydown($event)'\r\n    (click)=\"clickValue($event)\"\r\n    [innerHTML]=\"node.value.length ? node.value : '&nbsp;'\">\r\n</span>\r\n",
                        styles: [":host{margin:10px 0}span.locked{display:inline-block;cursor:pointer;min-width:30px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}span.locked.name{font-weight:700;color:#000}span input{cursor:beam}"]
                    }] }
        ];
        /** @nocollapse */
        FreeJsonLabel.ctorParameters = function () {
            return [
                { type: core.Renderer }
            ];
        };
        FreeJsonLabel.propDecorators = {
            nameEditor: [{ type: core.ViewChild, args: ["nameEditor",] }],
            valueEditor: [{ type: core.ViewChild, args: ["valueEditor",] }],
            node: [{ type: core.Input }],
            onchange: [{ type: core.Output, args: ["onchange",] }]
        };
        return FreeJsonLabel;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var FreeJsonSearch = (function () {
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
            { type: core.Pipe, args: [{
                        name: 'nodeSearch',
                        pure: false
                    },] }
        ];
        /** @nocollapse */
        FreeJsonSearch.ctorParameters = function () {
            return [
                { type: NodeManager }
            ];
        };
        return FreeJsonSearch;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var FreeJsonModule = (function () {
        function FreeJsonModule() {
        }
        FreeJsonModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            dragEnabled.DragDropModule,
                            forms.FormsModule
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
                        schemas: [core.CUSTOM_ELEMENTS_SCHEMA]
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

    exports.FreeJsonComponent = FreeJsonComponent;
    exports.NodeType = NodeType;
    exports.ActionType = ActionType;
    exports.FreeJsonModule = FreeJsonModule;
    exports.ɵb = FreeJsonLabel;
    exports.ɵd = FreeJsonSearchField;
    exports.ɵa = NodeManager;
    exports.ɵc = FreeJsonSearch;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJlZS1qc29uLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJuZzovL2ZyZWUtanNvbi9zcmMvYXBwL2ZyZWUtanNvbi9pbnRlcmZhY2VzL25vZGUuaW50ZXJmYWNlLnRzIiwibmc6Ly9mcmVlLWpzb24vc3JjL2FwcC9mcmVlLWpzb24vaW5qZWN0YWJsZXMvbm9kZS1tYW5hZ2VyLnRzIiwibmc6Ly9mcmVlLWpzb24vc3JjL2FwcC9mcmVlLWpzb24vY29tcG9uZW50cy9qc29uLmNvbXBvbmVudC50cyIsIm5nOi8vZnJlZS1qc29uL3NyYy9hcHAvZnJlZS1qc29uL2NvbXBvbmVudHMvanNvbi1zZWFyY2gtZmllbGQuY29tcG9uZW50LnRzIiwibmc6Ly9mcmVlLWpzb24vc3JjL2FwcC9mcmVlLWpzb24vY29tcG9uZW50cy9qc29uLWxhYmVsLmNvbXBvbmVudC50cyIsIm5nOi8vZnJlZS1qc29uL3NyYy9hcHAvZnJlZS1qc29uL3BpcGVzL2pzb24tc2VhcmNoLnRzIiwibmc6Ly9mcmVlLWpzb24vc3JjL2FwcC9mcmVlLWpzb24vZnJlZS1qc29uLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IHlbb3BbMF0gJiAyID8gXCJyZXR1cm5cIiA6IG9wWzBdID8gXCJ0aHJvd1wiIDogXCJuZXh0XCJdKSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFswLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyAgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaWYgKG9bbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH07IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl07XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiXHJcbmV4cG9ydCBlbnVtIE5vZGVUeXBlIHtcclxuICBsaXRlcmFsID0gMSxcclxuICBwYWlyID0gMixcclxuICBqc29uID0gMyxcclxuICBhcnJheSA9IDRcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIE5vZGUge1xyXG4gIGlkOiBudW1iZXIsXHJcbiAgbmFtZTogc3RyaW5nLFxyXG4gIHZhbHVlOiBzdHJpbmcsXHJcbiAgcGFyZW50OiBOb2RlVHlwZSxcclxuICBwYXJlbnROb2RlPzogTm9kZSxcclxuICB0eXBlOiBOb2RlVHlwZSxcclxuICBjaGlsZHJlbjogTm9kZVtdLFxyXG4gIGV4cGFuZGVkPzogYm9vbGVhbixcclxuICBpc1Jvb3Q/OiBib29sZWFuXHJcbn1cclxuZXhwb3J0IGVudW0gQWN0aW9uVHlwZSB7XHJcbiAgYWRkID0gMSxcclxuICByZW1vdmUgPSAyLFxyXG4gIG1vdmUgPSAzLFxyXG4gIG1vZGlmaWVkID0gNFxyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVhc29uaW5nIHtcclxuICBjb2RlOiBzdHJpbmcsXHJcbiAgZGVzY3JpcHRpb246IHN0cmluZyxcclxuICBhY3Rpb246IEFjdGlvblR5cGUsXHJcbiAgbm9kZTogc3RyaW5nXHJcbn1cclxuXHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IE5vZGUsIE5vZGVUeXBlIH0gZnJvbSAnLi8uLi9pbnRlcmZhY2VzL25vZGUuaW50ZXJmYWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE5vZGVNYW5hZ2VyIHtcclxuICBmaWx0ZXJlZFRleHQ6IFN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgfVxyXG5cclxuICBnZW5lcmF0ZU5vZGVJZCgpIHtcclxuICAgIGNvbnN0IG1pbiA9IDE7XHJcbiAgICBjb25zdCBtYXggPSAxMDAwMFxyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XHJcbiAgfVxyXG5cclxuICBnZXRGaWx0ZXJlZFRleHQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maWx0ZXJlZFRleHQ7XHJcbiAgfVxyXG5cclxuICBnZXROZXdOb2RlKG5vZGU6IE5vZGUpOiBOb2RlIHtcclxuICAgIGNvbnN0IGlkID0gdGhpcy5nZW5lcmF0ZU5vZGVJZCgpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaWQ6IGlkLFxyXG4gICAgICBuYW1lOiAnbmFtZScsIFxyXG4gICAgICB2YWx1ZTogJ3ZhbHVlJyxcclxuICAgICAgcGFyZW50OiBub2RlLnR5cGUsXHJcbiAgICAgIHBhcmVudE5vZGU6IG5vZGUsXHJcbiAgICAgIHR5cGU6IE5vZGVUeXBlLmxpdGVyYWwsXHJcbiAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgZXhwYW5kZWQ6IGZhbHNlXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgc2V0RmlsdGVyZWRUZXh0KHRleHQpIHtcclxuICAgIHRoaXMuZmlsdGVyZWRUZXh0ID0gdGV4dDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEcm9wRXZlbnQsIERyYWdFdmVudCB9IGZyb20gJ2RyYWctZW5hYmxlZCc7XHJcblxyXG5pbXBvcnQgeyBOb2RlTWFuYWdlciB9IGZyb20gJy4uL2luamVjdGFibGVzL25vZGUtbWFuYWdlcic7XHJcbmltcG9ydCB7IEZyZWVKc29uU2VhcmNoIH0gZnJvbSAnLi4vcGlwZXMvanNvbi1zZWFyY2gnO1xyXG5pbXBvcnQgeyBGcmVlSnNvbkxhYmVsIH0gZnJvbSAnLi9qc29uLWxhYmVsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5vZGUsIE5vZGVUeXBlLCBSZWFzb25pbmcsIEFjdGlvblR5cGUgfSBmcm9tICcuLi9pbnRlcmZhY2VzL25vZGUuaW50ZXJmYWNlJztcclxuLy9pbXBvcnQgeyBGcmVlSnNvbkRpYWxvZyB9IGZyb20gJy4vanNvbi1kaWFsb2cuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZnJlZS1qc29uJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vanNvbi5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vanNvbi5jb21wb25lbnQuc2NzcyddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRnJlZUpzb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBjaGlsZHJlbjtcclxuICBcclxuICBASW5wdXQoXCJ0cmFuc2Zvcm1lZERhdGFcIilcclxuICB0cmFuc2Zvcm1lZERhdGE7XHJcbiAgXHJcbiAgQElucHV0KFwicmVhc29uaW5nXCIpXHJcbiAgcmVhc29uaW5nOiBSZWFzb25pbmdbXTtcclxuXHJcbiAgQElucHV0KFwicmVhc29uaW5nQ29kZXNcIilcclxuICByZWFzb25pbmdDb2Rlczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgcm9vdChub2RlIDogTm9kZSApe1xyXG4gICAgaWYgKG5vZGUpIHtcclxuICAgICAgdGhpcy5jaGlsZHJlbiA9IG5vZGU7XHJcbiAgICAgIGlmICh0aGlzLnJlYXNvbmluZykge1xyXG4gICAgICAgIHRoaXMucmVhc29uaW5nID0gW107XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgcGFyZW50OiBOb2RlID0ge1xyXG4gICAgICAgIGlkOiB0aGlzLm1hbmFnZXIuZ2VuZXJhdGVOb2RlSWQoKSxcclxuICAgICAgICBuYW1lOiBcIlJvb3RcIixcclxuICAgICAgICB2YWx1ZTogXCJPYmplY3RcIixcclxuICAgICAgICBwYXJlbnQ6IE5vZGVUeXBlLmFycmF5LFxyXG4gICAgICAgIHR5cGU6IE5vZGVUeXBlLmFycmF5LFxyXG4gICAgICAgIGV4cGFuZGVkOiB0cnVlLFxyXG4gICAgICAgIGNoaWxkcmVuOiB1bmRlZmluZWQsXHJcbiAgICAgICAgaXNSb290OiB0cnVlXHJcbiAgICAgIH1cclxuICAgICAgcGFyZW50LmNoaWxkcmVuID0gdGhpcy50cmFuc2Zvcm1Ob2RlVG9JbnRlcm5hbFN0cnVjdGlvbih0aGlzLmNoaWxkcmVuLCBwYXJlbnQpXHJcblxyXG4gICAgICB0aGlzLnRyYW5zZm9ybWVkRGF0YSA9IFsgcGFyZW50IF07XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldCByb290KCk6IE5vZGV7XHJcbiAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgc2F2ZShmbGFnIDogYm9vbGVhbiApe1xyXG4gICAgICBpZiAoZmxhZykge1xyXG4gICAgICAgIGNvbnN0IHNhdmVkTm9kZSA9IHRoaXMudHJhbnNmb3JtZWRJbnRlcm5hbFN0cnVjdHVyZUJhY2tUb05vZGUodGhpcy50cmFuc2Zvcm1lZERhdGFbMF0uY2hpbGRyZW4sIE5vZGVUeXBlLmpzb24pO1xyXG4gICAgICAgIHRoaXMub25wdWJsaXNoLmVtaXQoc2F2ZWROb2RlKVxyXG4gICAgICB9XHJcbiAgfVxyXG4gIGdldCBzYXZlKCl7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIEBPdXRwdXQoXCJvbnB1Ymxpc2hcIilcclxuICBvbnB1Ymxpc2ggPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgXHJcbiAgQE91dHB1dChcIm9uY2hhbmdlXCIpXHJcbiAgb25jaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgXHJcbiAgZXhwYW5kZWQ6Qm9vbGVhbjtcclxuICBcclxuICBjb25zdHJ1Y3RvcihcclxuXHQgIHByaXZhdGUgbWFuYWdlcjpOb2RlTWFuYWdlclxyXG5cdCkge1xyXG5cdCAgXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRyYW5zZm9ybWVkSW50ZXJuYWxTdHJ1Y3R1cmVCYWNrVG9Ob2RlKCByb290LCBwYXJlbnQgKSB7XHJcbiAgICBsZXQganNvbiA9IHt9O1xyXG4gICAgbGV0IGFycmF5ID0gW107XHJcblxyXG4gICAgcm9vdC5tYXAoIChpdGVtOiBOb2RlKSA9PiB7XHJcbiAgICAgIGlmIChwYXJlbnQgPT09IE5vZGVUeXBlLmpzb24pIHsgICAgICAgIFxyXG4gICAgICAgIGlmIChpdGVtLnR5cGUgPT09IE5vZGVUeXBlLmxpdGVyYWwpIHtcclxuICAgICAgICAgIGFycmF5LnB1c2goaXRlbS52YWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09IE5vZGVUeXBlLnBhaXIpIHtcclxuICAgICAgICAgIGpzb25baXRlbS5uYW1lXSA9IGl0ZW0udmFsdWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09IE5vZGVUeXBlLmFycmF5KSB7XHJcbiAgICAgICAgICBqc29uW2l0ZW0ubmFtZV0gPSB0aGlzLnRyYW5zZm9ybWVkSW50ZXJuYWxTdHJ1Y3R1cmVCYWNrVG9Ob2RlKGl0ZW0uY2hpbGRyZW4sIGl0ZW0ucGFyZW50KTtcclxuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gTm9kZVR5cGUuanNvbikge1xyXG4gICAgICAgICAganNvbltpdGVtLm5hbWVdID0gdGhpcy50cmFuc2Zvcm1lZEludGVybmFsU3RydWN0dXJlQmFja1RvTm9kZShpdGVtLmNoaWxkcmVuLCBpdGVtLnBhcmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHBhcmVudCA9PT0gTm9kZVR5cGUuYXJyYXkpe1xyXG4gICAgICAgIGlmIChpdGVtLnR5cGUgPT09IE5vZGVUeXBlLmxpdGVyYWwpIHtcclxuICAgICAgICAgIGFycmF5LnB1c2goaXRlbS52YWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09IE5vZGVUeXBlLmpzb24pIHtcclxuICAgICAgICAgIGFycmF5LnB1c2godGhpcy50cmFuc2Zvcm1lZEludGVybmFsU3RydWN0dXJlQmFja1RvTm9kZShpdGVtLCBpdGVtLnBhcmVudCkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSBOb2RlVHlwZS5hcnJheSkge1xyXG4gICAgICAgICAgYXJyYXkucHVzaCh0aGlzLnRyYW5zZm9ybWVkSW50ZXJuYWxTdHJ1Y3R1cmVCYWNrVG9Ob2RlKGl0ZW0uY2hpbGRyZW4sIGl0ZW0ucGFyZW50KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBhcnJheS5sZW5ndGggPyBhcnJheSA6IGpzb247XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRyYW5zZm9ybU5vZGVUb0ludGVybmFsU3RydWN0aW9uKG5vZGUsIHBhcmVudDogTm9kZSkge1xyXG4gICAgbGV0IHJlc3VsdCA9IG5vZGU7XHJcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgIGNvbnN0IGNoaWxkcmVuOiBOb2RlW10gPSBbXTtcclxuICAgICAgbm9kZS5tYXAoIChpdGVtKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc3ViTm9kZTogTm9kZSA9IHtcclxuICAgICAgICAgIGlkOiB0aGlzLm1hbmFnZXIuZ2VuZXJhdGVOb2RlSWQoKSxcclxuICAgICAgICAgIG5hbWU6IFwiXCIsXHJcbiAgICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICAgIHBhcmVudDogTm9kZVR5cGUuYXJyYXksXHJcbiAgICAgICAgICBwYXJlbnROb2RlOiBwYXJlbnQsXHJcbiAgICAgICAgICB0eXBlOiBOb2RlVHlwZS5hcnJheSxcclxuICAgICAgICAgIGNoaWxkcmVuOiBbXVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBqc29uVmFsdWU6IGFueSA9IHRoaXMudHJhbnNmb3JtTm9kZVRvSW50ZXJuYWxTdHJ1Y3Rpb24oaXRlbSwgc3ViTm9kZSk7XHJcbiAgICAgICAgaWYgKGpzb25WYWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICBzdWJOb2RlLmNoaWxkcmVuID0ganNvblZhbHVlO1xyXG4gICAgICAgICAgY2hpbGRyZW4ucHVzaChzdWJOb2RlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3ViTm9kZS52YWx1ZSA9IGpzb25WYWx1ZTtcclxuICAgICAgICAgIHN1Yk5vZGUudHlwZSA9IE5vZGVUeXBlLmxpdGVyYWw7XHJcbiAgICAgICAgICBjaGlsZHJlbi5wdXNoKHN1Yk5vZGUpO1xyXG4gICAgICAgIH0gICAgICBcclxuICAgICAgfSk7XHJcbiAgICAgIHJlc3VsdCA9IGNoaWxkcmVuO1xyXG4gICAgfSBlbHNlIGlmIChub2RlIGluc3RhbmNlb2YgT2JqZWN0KSB7XHJcbiAgICAgIGNvbnN0IGxpc3QgPSBPYmplY3Qua2V5cyhub2RlKTtcclxuICAgICAgY29uc3QgY2hpbGRyZW46IE5vZGVbXSA9IFtdO1xyXG4gICAgICBsaXN0Lm1hcCggKGl0ZW0pID0+IHtcclxuICAgICAgICBjb25zdCBzdWJOb2RlOiBOb2RlID0ge1xyXG4gICAgICAgICAgaWQ6IHRoaXMubWFuYWdlci5nZW5lcmF0ZU5vZGVJZCgpLFxyXG4gICAgICAgICAgbmFtZTogaXRlbSxcclxuICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgcGFyZW50OiBOb2RlVHlwZS5qc29uLFxyXG4gICAgICAgICAgcGFyZW50Tm9kZTogcGFyZW50LFxyXG4gICAgICAgICAgdHlwZTogTm9kZVR5cGUuYXJyYXksXHJcbiAgICAgICAgICBjaGlsZHJlbjogW11cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QganNvblZhbHVlOiBhbnkgPSB0aGlzLnRyYW5zZm9ybU5vZGVUb0ludGVybmFsU3RydWN0aW9uKG5vZGVbaXRlbV0sIHN1Yk5vZGUpO1xyXG4gICAgICAgIGlmIChqc29uVmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgc3ViTm9kZS5jaGlsZHJlbiA9IGpzb25WYWx1ZTtcclxuICAgICAgICAgIGNoaWxkcmVuLnB1c2goc3ViTm9kZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN1Yk5vZGUudmFsdWUgPSBqc29uVmFsdWU7XHJcbiAgICAgICAgICBzdWJOb2RlLnR5cGUgPSBOb2RlVHlwZS5wYWlyO1xyXG4gICAgICAgICAgY2hpbGRyZW4ucHVzaChzdWJOb2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXN1bHQgPSBjaGlsZHJlbjtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICB9XHJcblxyXG4gIGFkZE5ld05vZGUoZXZlbnQsIG5vZGUpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBpZih0aGlzLnJlYXNvbmluZykge1xyXG4gICAgICAvLyBsZXQgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihGcmVlSnNvbkRpYWxvZywge1xyXG4gICAgICAvLyAgIGRhdGE6IHsgXHJcbiAgICAgIC8vICAgICBhY3Rpb246ICdhZGQnLFxyXG4gICAgICAvLyAgICAgbm9kZTogbm9kZSxcclxuICAgICAgLy8gICAgIHJlYXNvbmluZzogdGhpcy5yZWFzb25pbmcsXHJcbiAgICAgIC8vICAgICBjb2RlczogdGhpcy5yZWFzb25pbmdDb2Rlc1xyXG4gICAgICAvLyAgIH0sXHJcbiAgICAgIC8vIH0pO1xyXG4gICAgICAvLyBkaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgLy8gICBpZiAocmVzdWx0Lm9rKSB7XHJcbiAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcIlRPRE86IHBvcHVwIHdpbGwgc2V0IG5vZGUgdHlwZVwiKTtcclxuICAgICAgLy8gICAgIGNvbnN0IHR5cGUgPSByZXN1bHQubm90ZVR5cGU7XHJcbiAgICAgIC8vICAgICBub2RlLmNoaWxkcmVuID0gWy4uLm5vZGUuY2hpbGRyZW4sIHRoaXMubWFuYWdlci5nZXROZXdOb2RlKG5vZGUpXTtcclxuICAgICAgLy8gICAgIG5vZGUuZXhwYW5kZWQgPSB0cnVlO1xyXG4gICAgICAvLyAgICAgdGhpcy5jaGFuZ2VQZXJmb3JtZWQoe30pO1xyXG4gICAgICAvLyAgIH1cclxuICAgICAgLy8gfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBub2RlLmNoaWxkcmVuID0gWy4uLm5vZGUuY2hpbGRyZW4sIHRoaXMubWFuYWdlci5nZXROZXdOb2RlKG5vZGUpXTtcclxuICAgICAgbm9kZS5leHBhbmRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuY2hhbmdlUGVyZm9ybWVkKHt9KTtcclxuICAgIH1cclxuICB9XHJcbiAgbW92ZU5vZGUoZXZlbnQsIG5vZGUsIG1vdmVVcCkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIGlmKHRoaXMucmVhc29uaW5nKSB7XHJcbiAgICAgIC8vIGxldCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKEZyZWVKc29uRGlhbG9nLCB7XHJcbiAgICAgIC8vICAgZGF0YTogeyBcclxuICAgICAgLy8gICAgIGFjdGlvbjogJ21vdmUnLFxyXG4gICAgICAvLyAgICAgZnJvbTogdGhpcy50cmFuc2Zvcm1lZERhdGEuaW5kZXhPZihub2RlKSxcclxuICAgICAgLy8gICAgIGRpcmVjdGlvbjogbW92ZVVwLFxyXG4gICAgICAvLyAgICAgbm9kZTogbm9kZSxcclxuICAgICAgLy8gICAgIHJlYXNvbmluZzogdGhpcy5yZWFzb25pbmcsXHJcbiAgICAgIC8vICAgICBjb2RlczogdGhpcy5yZWFzb25pbmdDb2Rlc1xyXG4gICAgICAvLyAgIH0sXHJcbiAgICAgIC8vIH0pO1xyXG4gICAgICAvLyBkaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgLy8gICBpZiAocmVzdWx0Lm9rKSB7XHJcbiAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcIlRPRE86IHBvcHVwIHdpbGwgZ2l2ZSBpbmRleCB0byBnbyB0b1wiKTtcclxuICAgICAgLy8gICAgIGxldCBmcm9tID0gcmVzdWx0LmZyb207XHJcbiAgICAgIC8vICAgICBsZXQgdG8gPSBtb3ZlVXAgPyBcclxuICAgICAgLy8gICAgICAgICAgICAgICAoZnJvbSA+IDAgPyBmcm9tIC0gMSA6IGZyb20pIDogXHJcbiAgICAgIC8vICAgICAgICAgICAgICAgKGZyb20gPCAodGhpcy50cmFuc2Zvcm1lZERhdGEubGVuZ3RoIC0gMSkgPyBmcm9tICsgMSA6IGZyb20pO1xyXG4gICAgICBcclxuICAgICAgLy8gICAgIHRoaXMudHJhbnNmb3JtZWREYXRhLnNwbGljZSh0bywgMCwgdGhpcy50cmFuc2Zvcm1lZERhdGEuc3BsaWNlKGZyb20sIDEpWzBdKTtcclxuICAgICAgLy8gICAgIHRoaXMuY2hhbmdlUGVyZm9ybWVkKHt9KTtcclxuICAgICAgLy8gICB9XHJcbiAgICAgIC8vIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IGZyb20gPSB0aGlzLnRyYW5zZm9ybWVkRGF0YS5pbmRleE9mKG5vZGUpO1xyXG4gICAgICBsZXQgdG8gPSBtb3ZlVXAgPyBcclxuICAgICAgICAgICAgICAgIChmcm9tID4gMCA/IGZyb20gLSAxIDogZnJvbSkgOiBcclxuICAgICAgICAgICAgICAgIChmcm9tIDwgKHRoaXMudHJhbnNmb3JtZWREYXRhLmxlbmd0aCAtIDEpID8gZnJvbSArIDEgOiBmcm9tKTtcclxuICBcclxuICAgICAgdGhpcy50cmFuc2Zvcm1lZERhdGEuc3BsaWNlKHRvLCAwLCB0aGlzLnRyYW5zZm9ybWVkRGF0YS5zcGxpY2UoZnJvbSwgMSlbMF0pO1xyXG4gICAgICB0aGlzLmNoYW5nZVBlcmZvcm1lZCh7fSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGRlbGV0ZU5vZGUoZXZlbnQsIG5vZGUpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGlmKHRoaXMucmVhc29uaW5nKSB7XHJcbiAgICAgIC8vIGxldCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKEZyZWVKc29uRGlhbG9nLCB7XHJcbiAgICAgIC8vICAgZGF0YTogeyBcclxuICAgICAgLy8gICAgIGFjdGlvbjogJ3JlbW92ZScsXHJcbiAgICAgIC8vICAgICBub2RlOiBub2RlLFxyXG4gICAgICAvLyAgICAgcmVhc29uaW5nOiB0aGlzLnJlYXNvbmluZyxcclxuICAgICAgLy8gICAgIGNvZGVzOiB0aGlzLnJlYXNvbmluZ0NvZGVzXHJcbiAgICAgIC8vICAgfSxcclxuICAgICAgLy8gfSk7XHJcbiAgICAgIC8vIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICAvLyAgIGlmIChyZXN1bHQub2spIHtcclxuICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiVE9ETzogcHJvbXB0IHJlYXNvbiBhZCBzYXZlIGl0IGluIGEgY29uc3RydWN0XCIpO1xyXG4gICAgICAvLyAgICAgdGhpcy50cmFuc2Zvcm1lZERhdGEuc3BsaWNlKHRoaXMudHJhbnNmb3JtZWREYXRhLmluZGV4T2Yobm9kZSksIDEpO1xyXG4gICAgICAvLyAgICAgdGhpcy5jaGFuZ2VQZXJmb3JtZWQoe30pO1xyXG4gICAgICAvLyAgIH1cclxuICAgICAgLy8gfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnRyYW5zZm9ybWVkRGF0YS5zcGxpY2UodGhpcy50cmFuc2Zvcm1lZERhdGEuaW5kZXhPZihub2RlKSwgMSk7XHJcbiAgICAgIHRoaXMuY2hhbmdlUGVyZm9ybWVkKHt9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhhc0NoZXZyb25Eb3duKGNoaWxkKXtcclxuICAgIHJldHVybiBjaGlsZCAmJiBjaGlsZC5jaGlsZHJlbiAmJiBjaGlsZC5jaGlsZHJlbi5sZW5ndGggPiAwICYmIGNoaWxkLmV4cGFuZGVkXHJcbiAgfVxyXG5cclxuICBoYXNDaGV2cm9uUmlnaHQoY2hpbGQpIHtcclxuICAgIHJldHVybiBjaGlsZCAmJiBjaGlsZC5jaGlsZHJlbiAmJiBjaGlsZC5jaGlsZHJlbi5sZW5ndGggIT0gMCAmJiAhY2hpbGQuZXhwYW5kZWRcclxuICB9XHJcblxyXG5cdGRyYWdFbmFibGVkKGV2ZW50OiBEcmFnRXZlbnQpIHtcclxuXHRcdHJldHVybiAhZXZlbnQubWVkaXVtLmlzUm9vdCAmJiAoZXZlbnQubWVkaXVtLm5hbWUubGVuZ3RoIHx8IGV2ZW50Lm1lZGl1bS52YWx1ZS5sZW5ndGgpO1xyXG5cdH1cclxuXHRkcm9wRW5hYmxlZChldmVudDogRHJvcEV2ZW50KSB7XHJcblx0XHRyZXR1cm4gIWV2ZW50LmRlc3RpbmF0aW9uLm1lZGl1bS5pc1Jvb3Q7XHJcblx0fVxyXG4gIG9uRHJhZ1N0YXJ0KGV2ZW50KSB7XHJcbiAgICAvLyB0aGlzLm1hbmFnZXIuc2V0U2VsZWN0ZWROb2RlKGV2ZW50Lm1lZGl1bSk7XHJcbiAgfVxyXG5cclxuICBvbkRyYWdFbmQoZXZlbnQ6IERyb3BFdmVudCkge1xyXG4gICAgaWYgKGV2ZW50LmRlc3RpbmF0aW9uICYmIGV2ZW50LnNvdXJjZS5tZWRpdW0gIT09IGV2ZW50LmRlc3RpbmF0aW9uLm1lZGl1bSkge1xyXG4gICAgICBjb25zdCBzb3VyY2VJbmRleCA9IHRoaXMudHJhbnNmb3JtZWREYXRhLmluZGV4T2YoZXZlbnQuc291cmNlLm1lZGl1bSk7XHJcblxyXG4gICAgICBpZih0aGlzLnJlYXNvbmluZykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWRzYWRhc1wiKVxyXG4gICAgICAgIC8vIGxldCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKEZyZWVKc29uRGlhbG9nLCB7XHJcbiAgICAgICAgLy8gICBkYXRhOiB7IFxyXG4gICAgICAgIC8vICAgICBhY3Rpb246ICdkcmFnJyxcclxuICAgICAgICAvLyAgICAgZnJvbTogc291cmNlSW5kZXgsXHJcbiAgICAgICAgLy8gICAgIHJlYXNvbmluZzogdGhpcy5yZWFzb25pbmcsXHJcbiAgICAgICAgLy8gICAgIGNvZGVzOiB0aGlzLnJlYXNvbmluZ0NvZGVzXHJcbiAgICAgICAgLy8gICB9LFxyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIC8vIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICAgIC8vICAgaWYgKHJlc3VsdC5vaykge1xyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcIlRPRE86IHByb21wdCByZWFzb24gYWQgc2F2ZSBpdCBpbiBhIGNvbnN0cnVjdFwiKTtcclxuICAgICAgICAvLyAgICAgdGhpcy50cmFuc2Zvcm1lZERhdGEuc3BsaWNlKHNvdXJjZUluZGV4LCAxKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5jaGFuZ2VQZXJmb3JtZWQoe30pO1xyXG4gICAgICAgIC8vICAgfVxyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtZWREYXRhLnNwbGljZShzb3VyY2VJbmRleCwgMSk7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VQZXJmb3JtZWQoe30pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkRyb3AoZXZlbnQpe1xyXG4gICAgaWYgKGV2ZW50LmRlc3RpbmF0aW9uICYmIGV2ZW50LnNvdXJjZSAmJiBldmVudC5zb3VyY2UubWVkaXVtICE9PSBldmVudC5kZXN0aW5hdGlvbi5tZWRpdW0pIHtcclxuICAgICAgY29uc3Qgc291cmNlTm9kZSA9IGV2ZW50LnNvdXJjZS5tZWRpdW07XHJcbiAgICAgIGNvbnN0IGRlc3RpbmF0aW9uTm9kZSA9IGV2ZW50LmRlc3RpbmF0aW9uLm1lZGl1bTtcclxuICBcclxuICAgICAgZGVzdGluYXRpb25Ob2RlLmNoaWxkcmVuID0gWy4uLmRlc3RpbmF0aW9uTm9kZS5jaGlsZHJlbiwgc291cmNlTm9kZV07XHJcbiAgICAgIGlmIChkZXN0aW5hdGlvbk5vZGUuY2hpbGRyZW4ubGVuZ3RoKSB7XHJcbiAgICAgICAgZGVzdGluYXRpb25Ob2RlLmV4cGFuZGVkID0gdHJ1ZTtcclxuICAgICAgfSAgICBcclxuICAgICAgaWYgKGRlc3RpbmF0aW9uTm9kZS50eXBlID09PSBOb2RlVHlwZS5saXRlcmFsKSB7XHJcbiAgICAgICAgZGVzdGluYXRpb25Ob2RlLnR5cGUgPSBOb2RlVHlwZS5qc29uO1xyXG4gICAgICAgIGRlc3RpbmF0aW9uTm9kZS52YWx1ZT0gXCJcIjtcclxuICAgICAgfSBlbHNlIGlmIChkZXN0aW5hdGlvbk5vZGUudHlwZSA9PT0gTm9kZVR5cGUucGFpcikge1xyXG4gICAgICAgIGRlc3RpbmF0aW9uTm9kZS50eXBlID0gTm9kZVR5cGUuanNvbjtcclxuICAgICAgfSBlbHNlIGlmIChkZXN0aW5hdGlvbk5vZGUudHlwZSA9PT0gTm9kZVR5cGUuYXJyYXkpIHtcclxuICAgICAgICBpZiAoZGVzdGluYXRpb25Ob2RlLnBhcmVudCA9PT0gTm9kZVR5cGUuYXJyYXkgJiYgc291cmNlTm9kZS50eXBlID09PSBOb2RlVHlwZS5wYWlyKSB7XHJcbiAgICAgICAgICBzb3VyY2VOb2RlLnR5cGUgPSBOb2RlVHlwZS5qc29uO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBzb3VyY2VOb2RlLnBhcmVudCA9IGRlc3RpbmF0aW9uTm9kZS50eXBlO1xyXG5cclxuICAgICAgY29uc3QgaSA9IHNvdXJjZU5vZGUucGFyZW50Tm9kZS5jaGlsZHJlbi5pbmRleE9mKHNvdXJjZU5vZGUpO1xyXG4gICAgICBzb3VyY2VOb2RlLnBhcmVudE5vZGUuY2hpbGRyZW4uc3BsaWNlKGksIDEpO1xyXG4gICAgICBzb3VyY2VOb2RlLnBhcmVudE5vZGUgPSBkZXN0aW5hdGlvbk5vZGU7XHJcbiAgICAgIHRoaXMuY2hhbmdlUGVyZm9ybWVkKHt9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHRvR3JhbmRQYXJlbnQoZXZlbnQsIGNoaWxkKSB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgY29uc3QgcGFyZW50ID0gIGNoaWxkLnBhcmVudE5vZGU7XHJcbiAgICBjb25zdCBncmFuZFBhcmVudCA9ICBjaGlsZC5wYXJlbnROb2RlLnBhcmVudE5vZGU7XHJcbiAgICBjb25zdCBpID0gcGFyZW50LmNoaWxkcmVuLmluZGV4T2YoY2hpbGQpO1xyXG4gICAgY29uc3QgcCA9IGdyYW5kUGFyZW50LmNoaWxkcmVuLmluZGV4T2YocGFyZW50KTtcclxuXHJcbiAgICBwYXJlbnQuY2hpbGRyZW4uc3BsaWNlKGksIDEpO1xyXG5cclxuICAgIGlmIChwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIGlmICghcGFyZW50Lm5hbWUubGVuZ3RoICYmICFwYXJlbnQudmFsdWUubGVuZ3RoKSB7XHJcbiAgICAgICAgZ3JhbmRQYXJlbnQuY2hpbGRyZW4uc3BsaWNlKHAsIDEpO1xyXG4gICAgICAgIGdyYW5kUGFyZW50LmNoaWxkcmVuLnNwbGljZShwLCAwLCBjaGlsZCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcGFyZW50LnR5cGUgPSBOb2RlVHlwZS5wYWlyO1xyXG4gICAgICAgIGdyYW5kUGFyZW50LmNoaWxkcmVuLnNwbGljZShwICsgMSwgMCwgY2hpbGQpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBncmFuZFBhcmVudC5jaGlsZHJlbi5zcGxpY2UocCArIDEsIDAsIGNoaWxkKTtcclxuICAgIH1cclxuICAgIGNoaWxkLnBhcmVudE5vZGUgPSBncmFuZFBhcmVudDtcclxuICAgIHRoaXMuY2hhbmdlUGVyZm9ybWVkKHt9KTtcclxuICB9XHJcblxyXG4gIGdldEZpbHRlcmVkVGV4dCgpe1xyXG4gICAgdGhpcy5tYW5hZ2VyLmdldEZpbHRlcmVkVGV4dCgpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlKGV2ZW50LCBjaGlsZCkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY2hpbGQuZXhwYW5kZWQgPSAhY2hpbGQuZXhwYW5kZWQ7XHJcbiAgfVxyXG5cclxuICBrZXlkb3duKGV2ZW50LCBpdGVtKSB7XHJcbiAgICBjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcbiAgICBpZiAoKGNvZGUgPT09IDEzKSB8fCAoY29kZSA9PT0gMzIpKSB7XHJcblx0XHRcdHRoaXMudG9nZ2xlKGV2ZW50LCBpdGVtKTtcclxuXHRcdH1cclxuICB9XHJcbiAga2V5bW92ZShldmVudCwgaXRlbSwgbW92ZVVwKSB7XHJcbiAgICBjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcbiAgICBpZiAoKGNvZGUgPT09IDEzKSB8fCAoY29kZSA9PT0gMzIpKSB7XHJcbiAgICAgIHRoaXMubW92ZU5vZGUoZXZlbnQsIGl0ZW0sIG1vdmVVcCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGtleWRlbGV0ZShldmVudCwgaXRlbSkge1xyXG4gICAgY29uc3QgY29kZSA9IGV2ZW50LndoaWNoO1xyXG4gICAgaWYgKChjb2RlID09PSAxMykgfHwgKGNvZGUgPT09IDMyKSkge1xyXG5cdFx0XHR0aGlzLmRlbGV0ZU5vZGUoZXZlbnQsIGl0ZW0pO1xyXG5cdFx0fVxyXG4gIH1cclxuICBrZXl0b0dyYW5kUGFyZW50KGV2ZW50LCBpdGVtKSB7XHJcbiAgICBjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcbiAgICBpZiAoKGNvZGUgPT09IDEzKSB8fCAoY29kZSA9PT0gMzIpKSB7XHJcblx0XHRcdHRoaXMudG9HcmFuZFBhcmVudChldmVudCwgaXRlbSk7XHJcblx0XHR9XHJcbiAgfVxyXG4gIGtleWFkZChldmVudCwgaXRlbSkge1xyXG4gICAgY29uc3QgY29kZSA9IGV2ZW50LndoaWNoO1xyXG4gICAgaWYgKChjb2RlID09PSAxMykgfHwgKGNvZGUgPT09IDMyKSkge1xyXG5cdFx0XHR0aGlzLmFkZE5ld05vZGUoZXZlbnQsIGl0ZW0pO1xyXG5cdFx0fVxyXG4gIH1cclxuICBjYW5BZGROb2RlKG5vZGUpIHtcclxuICAgIHJldHVybiAobm9kZS50eXBlID09PSBOb2RlVHlwZS5qc29uKSB8fCAobm9kZS50eXBlID09PSBOb2RlVHlwZS5hcnJheSk7XHJcbiAgfVxyXG4gIGNoYW5nZVBlcmZvcm1lZChldmVudCkge1xyXG4gICAgaWYgKHRoaXMuY2hpbGRyZW4pIHtcclxuICAgICAgY29uc3Qgc2F2ZWROb2RlID0gdGhpcy50cmFuc2Zvcm1lZEludGVybmFsU3RydWN0dXJlQmFja1RvTm9kZSh0aGlzLnRyYW5zZm9ybWVkRGF0YVswXS5jaGlsZHJlbiwgTm9kZVR5cGUuanNvbik7XHJcbiAgICAgIHRoaXMub25jaGFuZ2UuZW1pdCh7XHJcbiAgICAgICAgZGF0YTogc2F2ZWROb2RlLFxyXG4gICAgICAgIHJlYXNvbmluZzogdGhpcy5yZWFzb25pbmdcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm9uY2hhbmdlLmVtaXQoe30pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5vZGVNYW5hZ2VyIH0gZnJvbSAnLi4vaW5qZWN0YWJsZXMvbm9kZS1tYW5hZ2VyJztcclxuXHJcbkBDb21wb25lbnQoeyBcclxuICBzZWxlY3RvcjogJ2pzb24tc2VhcmNoLWZpZWxkJywgXHJcbiAgdGVtcGxhdGU6YDxpbnB1dCB0eXBlPSd0ZXh0JyBbKG5nTW9kZWwpXT0ndmFsJyAobmdNb2RlbENoYW5nZSk9J2ZpbHRlcih2YWwpJz5gXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGcmVlSnNvblNlYXJjaEZpZWxke1xyXG4gIEBJbnB1dChcInZhbFwiKVxyXG4gIHZhbDogc3RyaW5nO1xyXG4gIFxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtYW5hZ2VyOiBOb2RlTWFuYWdlclxyXG4gICkge31cclxuXHJcbiAgZmlsdGVyKHZhbHVlKSB7XHJcbiAgICB0aGlzLm1hbmFnZXIuc2V0RmlsdGVyZWRUZXh0KHZhbHVlKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtDb21wb25lbnQsIFZpZXdDaGlsZCwgUmVuZGVyZXIsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi8uLi9pbnRlcmZhY2VzL25vZGUuaW50ZXJmYWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnanNvbi1sYWJlbCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2pzb24tbGFiZWwuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2pzb24tbGFiZWwuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRnJlZUpzb25MYWJlbCB7XHJcblxyXG4gIGVkaXROYW1lID0gZmFsc2U7XHJcbiAgZWRpdFZhbHVlID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgQFZpZXdDaGlsZChcIm5hbWVFZGl0b3JcIilcclxuICBuYW1lRWRpdG9yO1xyXG5cclxuICBAVmlld0NoaWxkKFwidmFsdWVFZGl0b3JcIilcclxuICB2YWx1ZUVkaXRvcjtcclxuXHJcbiAgQElucHV0KClcclxuICBub2RlOiBOb2RlO1xyXG5cclxuICBAT3V0cHV0KFwib25jaGFuZ2VcIilcclxuICBvbmNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgbmFtZUxhYmVsS2V5ZG93bihldmVudCkge1xyXG4gICAgY29uc3QgY29kZSA9IGV2ZW50LndoaWNoO1xyXG4gICAgaWYgKChjb2RlID09PSAxMykgfHwgKGNvZGUgPT09IDMyKSkge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QoZXZlbnQudGFyZ2V0LCBcImNsaWNrXCIpO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpPT57XHJcbiAgICAgICAgaWYgKHRoaXMubmFtZUVkaXRvcikge1xyXG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5pbnZva2VFbGVtZW50TWV0aG9kKHRoaXMubmFtZUVkaXRvci5uYXRpdmVFbGVtZW50LCBcImZvY3VzXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSw2Nik7XHJcblx0XHR9IGVsc2UgaWYgKGNvZGUgPT09IDI3KSB7XHJcbiAgICAgIHRoaXMuZWRpdE5hbWUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbiAgdmFsdWVMYWJlbEtleWRvd24oZXZlbnQpIHtcclxuICAgIGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcclxuICAgIGlmICgoY29kZSA9PT0gMTMpIHx8IChjb2RlID09PSAzMikpIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5pbnZva2VFbGVtZW50TWV0aG9kKGV2ZW50LnRhcmdldCwgXCJjbGlja1wiKTtcclxuICAgICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICAgIGlmICh0aGlzLnZhbHVlRWRpdG9yKSB7XHJcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QodGhpcy52YWx1ZUVkaXRvci5uYXRpdmVFbGVtZW50LCBcImZvY3VzXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSw2Nik7XHJcblx0XHR9IGVsc2UgaWYgKGNvZGUgPT09IDI3KSB7XHJcbiAgICAgIHRoaXMuZWRpdFZhbHVlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjbGlja05hbWUoZXZlbnQpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIHRoaXMuZWRpdE5hbWUgPSB0aGlzLm5vZGUubmFtZSAhPT0nUm9vdCc7XHJcbiAgICBzZXRUaW1lb3V0KCgpPT57XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuaW52b2tlRWxlbWVudE1ldGhvZCh0aGlzLm5hbWVFZGl0b3IubmF0aXZlRWxlbWVudCwgXCJmb2N1c1wiKTtcclxuICAgIH0sNjYpO1xyXG4gIH1cclxuICBjbGlja1ZhbHVlKGV2ZW50KSB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB0aGlzLmVkaXRWYWx1ZSA9IHRoaXMubm9kZS52YWx1ZSAhPT0nT2JqZWN0JztcclxuICAgIHNldFRpbWVvdXQoKCk9PntcclxuICAgICAgdGhpcy5yZW5kZXJlci5pbnZva2VFbGVtZW50TWV0aG9kKHRoaXMudmFsdWVFZGl0b3IubmF0aXZlRWxlbWVudCwgXCJmb2N1c1wiKTtcclxuICAgIH0sNjYpO1xyXG4gIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOb2RlTWFuYWdlciB9IGZyb20gJy4uL2luamVjdGFibGVzL25vZGUtbWFuYWdlcic7XHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ25vZGVTZWFyY2gnLFxyXG4gIHB1cmU6IGZhbHNlXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGcmVlSnNvblNlYXJjaCBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtYW5hZ2VyOiBOb2RlTWFuYWdlclxyXG4gICl7XHJcbiAgfVxyXG5cclxuICBpc0JsYW5rKG9iajogYW55KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gb2JqID09PSB1bmRlZmluZWQgfHwgb2JqID09PSBudWxsO1xyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtKHZhbHVlKSB7XHJcbiAgICB2YXIgZmlsdGVyZWRUZXh0ID0gdGhpcy5tYW5hZ2VyLmdldEZpbHRlcmVkVGV4dCgpXHJcbiAgICBpZiAodGhpcy5pc0JsYW5rKGZpbHRlcmVkVGV4dCkpIHsgXHJcbiAgICAgIHJldHVybiB2YWx1ZVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHZhbHVlLmZpbHRlcigobm9kZSkgPT4gbm9kZS50ZXh0LmluZGV4T2YoZmlsdGVyZWRUZXh0KSA+IC0xKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBEcmFnRHJvcE1vZHVsZSB9IGZyb20gJ2RyYWctZW5hYmxlZCc7XHJcbmltcG9ydCB7IE5vZGVNYW5hZ2VyIH0gZnJvbSAnLi9pbmplY3RhYmxlcy9ub2RlLW1hbmFnZXInO1xyXG5pbXBvcnQgeyBGcmVlSnNvblNlYXJjaEZpZWxkIH0gZnJvbSAnLi9jb21wb25lbnRzL2pzb24tc2VhcmNoLWZpZWxkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZyZWVKc29uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2pzb24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgRnJlZUpzb25MYWJlbCB9IGZyb20gJy4vY29tcG9uZW50cy9qc29uLWxhYmVsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZyZWVKc29uU2VhcmNoIH0gZnJvbSAnLi9waXBlcy9qc29uLXNlYXJjaCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIERyYWdEcm9wTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgRnJlZUpzb25Db21wb25lbnQsXHJcbiAgICBGcmVlSnNvbkxhYmVsLFxyXG4gICAgRnJlZUpzb25TZWFyY2gsXHJcbiAgICBGcmVlSnNvblNlYXJjaEZpZWxkXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBGcmVlSnNvbkNvbXBvbmVudFxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIEZyZWVKc29uU2VhcmNoLFxyXG4gICAgTm9kZU1hbmFnZXJcclxuICBdLFxyXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEZyZWVKc29uTW9kdWxlIHt9XHJcbiJdLCJuYW1lcyI6WyJJbmplY3RhYmxlIiwiRXZlbnRFbWl0dGVyIiwiQ29tcG9uZW50IiwiSW5wdXQiLCJPdXRwdXQiLCJSZW5kZXJlciIsIlZpZXdDaGlsZCIsIlBpcGUiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkRyYWdEcm9wTW9kdWxlIiwiRm9ybXNNb2R1bGUiLCJDVVNUT01fRUxFTUVOVFNfU0NIRU1BIl0sIm1hcHBpbmdzIjoiOzs7Ozs7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