(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common'), require('@sedeh/drag-enabled')) :
    typeof define === 'function' && define.amd ? define('@sedeh/free-json', ['exports', '@angular/core', '@angular/forms', '@angular/common', '@sedeh/drag-enabled'], factory) :
    (factory((global.sedeh = global.sedeh || {}, global.sedeh['free-json'] = {}),global.ng.core,global.ng.forms,global.ng.common,global['drag-enabled']));
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VkZWgtZnJlZS1qc29uLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJuZzovL0BzZWRlaC9mcmVlLWpzb24vc3JjL2FwcC9mcmVlLWpzb24vaW50ZXJmYWNlcy9ub2RlLmludGVyZmFjZS50cyIsIm5nOi8vQHNlZGVoL2ZyZWUtanNvbi9zcmMvYXBwL2ZyZWUtanNvbi9pbmplY3RhYmxlcy9ub2RlLW1hbmFnZXIudHMiLCJuZzovL0BzZWRlaC9mcmVlLWpzb24vc3JjL2FwcC9mcmVlLWpzb24vY29tcG9uZW50cy9qc29uLmNvbXBvbmVudC50cyIsIm5nOi8vQHNlZGVoL2ZyZWUtanNvbi9zcmMvYXBwL2ZyZWUtanNvbi9jb21wb25lbnRzL2pzb24tc2VhcmNoLWZpZWxkLmNvbXBvbmVudC50cyIsIm5nOi8vQHNlZGVoL2ZyZWUtanNvbi9zcmMvYXBwL2ZyZWUtanNvbi9jb21wb25lbnRzL2pzb24tbGFiZWwuY29tcG9uZW50LnRzIiwibmc6Ly9Ac2VkZWgvZnJlZS1qc29uL3NyYy9hcHAvZnJlZS1qc29uL3BpcGVzL2pzb24tc2VhcmNoLnRzIiwibmc6Ly9Ac2VkZWgvZnJlZS1qc29uL3NyYy9hcHAvZnJlZS1qc29uL2ZyZWUtanNvbi5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSB5W29wWzBdICYgMiA/IFwicmV0dXJuXCIgOiBvcFswXSA/IFwidGhyb3dcIiA6IFwibmV4dFwiXSkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbMCwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgIH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlmIChvW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9OyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsIlxyXG5leHBvcnQgZW51bSBOb2RlVHlwZSB7XHJcbiAgbGl0ZXJhbCA9IDEsXHJcbiAgcGFpciA9IDIsXHJcbiAganNvbiA9IDMsXHJcbiAgYXJyYXkgPSA0XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBOb2RlIHtcclxuICBpZDogbnVtYmVyLFxyXG4gIG5hbWU6IHN0cmluZyxcclxuICB2YWx1ZTogc3RyaW5nLFxyXG4gIHBhcmVudDogTm9kZVR5cGUsXHJcbiAgcGFyZW50Tm9kZT86IE5vZGUsXHJcbiAgdHlwZTogTm9kZVR5cGUsXHJcbiAgY2hpbGRyZW46IE5vZGVbXSxcclxuICBleHBhbmRlZD86IGJvb2xlYW4sXHJcbiAgaXNSb290PzogYm9vbGVhblxyXG59XHJcbmV4cG9ydCBlbnVtIEFjdGlvblR5cGUge1xyXG4gIGFkZCA9IDEsXHJcbiAgcmVtb3ZlID0gMixcclxuICBtb3ZlID0gMyxcclxuICBtb2RpZmllZCA9IDRcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIFJlYXNvbmluZyB7XHJcbiAgY29kZTogc3RyaW5nLFxyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmcsXHJcbiAgYWN0aW9uOiBBY3Rpb25UeXBlLFxyXG4gIG5vZGU6IHN0cmluZ1xyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBOb2RlLCBOb2RlVHlwZSB9IGZyb20gJy4vLi4vaW50ZXJmYWNlcy9ub2RlLmludGVyZmFjZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOb2RlTWFuYWdlciB7XHJcbiAgZmlsdGVyZWRUZXh0OiBTdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gIH1cclxuXHJcbiAgZ2VuZXJhdGVOb2RlSWQoKSB7XHJcbiAgICBjb25zdCBtaW4gPSAxO1xyXG4gICAgY29uc3QgbWF4ID0gMTAwMDBcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xyXG4gIH1cclxuXHJcbiAgZ2V0RmlsdGVyZWRUZXh0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyZWRUZXh0O1xyXG4gIH1cclxuXHJcbiAgZ2V0TmV3Tm9kZShub2RlOiBOb2RlKTogTm9kZSB7XHJcbiAgICBjb25zdCBpZCA9IHRoaXMuZ2VuZXJhdGVOb2RlSWQoKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGlkOiBpZCxcclxuICAgICAgbmFtZTogJ25hbWUnLCBcclxuICAgICAgdmFsdWU6ICd2YWx1ZScsXHJcbiAgICAgIHBhcmVudDogbm9kZS50eXBlLFxyXG4gICAgICBwYXJlbnROb2RlOiBub2RlLFxyXG4gICAgICB0eXBlOiBOb2RlVHlwZS5saXRlcmFsLFxyXG4gICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgIGV4cGFuZGVkOiBmYWxzZVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHNldEZpbHRlcmVkVGV4dCh0ZXh0KSB7XHJcbiAgICB0aGlzLmZpbHRlcmVkVGV4dCA9IHRleHQ7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRHJvcEV2ZW50LCBEcmFnRXZlbnQgfSBmcm9tICdAc2VkZWgvZHJhZy1lbmFibGVkJztcclxuXHJcbmltcG9ydCB7IE5vZGVNYW5hZ2VyIH0gZnJvbSAnLi4vaW5qZWN0YWJsZXMvbm9kZS1tYW5hZ2VyJztcclxuaW1wb3J0IHsgRnJlZUpzb25TZWFyY2ggfSBmcm9tICcuLi9waXBlcy9qc29uLXNlYXJjaCc7XHJcbmltcG9ydCB7IEZyZWVKc29uTGFiZWwgfSBmcm9tICcuL2pzb24tbGFiZWwuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTm9kZSwgTm9kZVR5cGUsIFJlYXNvbmluZywgQWN0aW9uVHlwZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvbm9kZS5pbnRlcmZhY2UnO1xyXG4vL2ltcG9ydCB7IEZyZWVKc29uRGlhbG9nIH0gZnJvbSAnLi9qc29uLWRpYWxvZy5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdmcmVlLWpzb24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9qc29uLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9qc29uLmNvbXBvbmVudC5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGcmVlSnNvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIGNoaWxkcmVuO1xyXG4gIFxyXG4gIEBJbnB1dChcInRyYW5zZm9ybWVkRGF0YVwiKVxyXG4gIHRyYW5zZm9ybWVkRGF0YTtcclxuICBcclxuICBASW5wdXQoXCJyZWFzb25pbmdcIilcclxuICByZWFzb25pbmc6IFJlYXNvbmluZ1tdO1xyXG5cclxuICBASW5wdXQoXCJyZWFzb25pbmdDb2Rlc1wiKVxyXG4gIHJlYXNvbmluZ0NvZGVzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCByb290KG5vZGUgOiBOb2RlICl7XHJcbiAgICBpZiAobm9kZSkge1xyXG4gICAgICB0aGlzLmNoaWxkcmVuID0gbm9kZTtcclxuICAgICAgaWYgKHRoaXMucmVhc29uaW5nKSB7XHJcbiAgICAgICAgdGhpcy5yZWFzb25pbmcgPSBbXTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBwYXJlbnQ6IE5vZGUgPSB7XHJcbiAgICAgICAgaWQ6IHRoaXMubWFuYWdlci5nZW5lcmF0ZU5vZGVJZCgpLFxyXG4gICAgICAgIG5hbWU6IFwiUm9vdFwiLFxyXG4gICAgICAgIHZhbHVlOiBcIk9iamVjdFwiLFxyXG4gICAgICAgIHBhcmVudDogTm9kZVR5cGUuYXJyYXksXHJcbiAgICAgICAgdHlwZTogTm9kZVR5cGUuYXJyYXksXHJcbiAgICAgICAgZXhwYW5kZWQ6IHRydWUsXHJcbiAgICAgICAgY2hpbGRyZW46IHVuZGVmaW5lZCxcclxuICAgICAgICBpc1Jvb3Q6IHRydWVcclxuICAgICAgfVxyXG4gICAgICBwYXJlbnQuY2hpbGRyZW4gPSB0aGlzLnRyYW5zZm9ybU5vZGVUb0ludGVybmFsU3RydWN0aW9uKHRoaXMuY2hpbGRyZW4sIHBhcmVudClcclxuXHJcbiAgICAgIHRoaXMudHJhbnNmb3JtZWREYXRhID0gWyBwYXJlbnQgXTtcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0IHJvb3QoKTogTm9kZXtcclxuICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW47XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBzYXZlKGZsYWcgOiBib29sZWFuICl7XHJcbiAgICAgIGlmIChmbGFnKSB7XHJcbiAgICAgICAgY29uc3Qgc2F2ZWROb2RlID0gdGhpcy50cmFuc2Zvcm1lZEludGVybmFsU3RydWN0dXJlQmFja1RvTm9kZSh0aGlzLnRyYW5zZm9ybWVkRGF0YVswXS5jaGlsZHJlbiwgTm9kZVR5cGUuanNvbik7XHJcbiAgICAgICAgdGhpcy5vbnB1Ymxpc2guZW1pdChzYXZlZE5vZGUpXHJcbiAgICAgIH1cclxuICB9XHJcbiAgZ2V0IHNhdmUoKXtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgQE91dHB1dChcIm9ucHVibGlzaFwiKVxyXG4gIG9ucHVibGlzaCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBcclxuICBAT3V0cHV0KFwib25jaGFuZ2VcIilcclxuICBvbmNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBcclxuICBleHBhbmRlZDpCb29sZWFuO1xyXG4gIFxyXG4gIGNvbnN0cnVjdG9yKFxyXG5cdCAgcHJpdmF0ZSBtYW5hZ2VyOk5vZGVNYW5hZ2VyXHJcblx0KSB7XHJcblx0ICBcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdHJhbnNmb3JtZWRJbnRlcm5hbFN0cnVjdHVyZUJhY2tUb05vZGUoIHJvb3QsIHBhcmVudCApIHtcclxuICAgIGxldCBqc29uID0ge307XHJcbiAgICBsZXQgYXJyYXkgPSBbXTtcclxuXHJcbiAgICByb290Lm1hcCggKGl0ZW06IE5vZGUpID0+IHtcclxuICAgICAgaWYgKHBhcmVudCA9PT0gTm9kZVR5cGUuanNvbikgeyAgICAgICAgXHJcbiAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gTm9kZVR5cGUubGl0ZXJhbCkge1xyXG4gICAgICAgICAgYXJyYXkucHVzaChpdGVtLnZhbHVlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gTm9kZVR5cGUucGFpcikge1xyXG4gICAgICAgICAganNvbltpdGVtLm5hbWVdID0gaXRlbS52YWx1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gTm9kZVR5cGUuYXJyYXkpIHtcclxuICAgICAgICAgIGpzb25baXRlbS5uYW1lXSA9IHRoaXMudHJhbnNmb3JtZWRJbnRlcm5hbFN0cnVjdHVyZUJhY2tUb05vZGUoaXRlbS5jaGlsZHJlbiwgaXRlbS5wYXJlbnQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSBOb2RlVHlwZS5qc29uKSB7XHJcbiAgICAgICAgICBqc29uW2l0ZW0ubmFtZV0gPSB0aGlzLnRyYW5zZm9ybWVkSW50ZXJuYWxTdHJ1Y3R1cmVCYWNrVG9Ob2RlKGl0ZW0uY2hpbGRyZW4sIGl0ZW0ucGFyZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAocGFyZW50ID09PSBOb2RlVHlwZS5hcnJheSl7XHJcbiAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gTm9kZVR5cGUubGl0ZXJhbCkge1xyXG4gICAgICAgICAgYXJyYXkucHVzaChpdGVtLnZhbHVlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gTm9kZVR5cGUuanNvbikge1xyXG4gICAgICAgICAgYXJyYXkucHVzaCh0aGlzLnRyYW5zZm9ybWVkSW50ZXJuYWxTdHJ1Y3R1cmVCYWNrVG9Ob2RlKGl0ZW0sIGl0ZW0ucGFyZW50KSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09IE5vZGVUeXBlLmFycmF5KSB7XHJcbiAgICAgICAgICBhcnJheS5wdXNoKHRoaXMudHJhbnNmb3JtZWRJbnRlcm5hbFN0cnVjdHVyZUJhY2tUb05vZGUoaXRlbS5jaGlsZHJlbiwgaXRlbS5wYXJlbnQpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGFycmF5Lmxlbmd0aCA/IGFycmF5IDoganNvbjtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdHJhbnNmb3JtTm9kZVRvSW50ZXJuYWxTdHJ1Y3Rpb24obm9kZSwgcGFyZW50OiBOb2RlKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gbm9kZTtcclxuICAgIGlmIChub2RlIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgY29uc3QgY2hpbGRyZW46IE5vZGVbXSA9IFtdO1xyXG4gICAgICBub2RlLm1hcCggKGl0ZW0pID0+IHtcclxuICAgICAgICBjb25zdCBzdWJOb2RlOiBOb2RlID0ge1xyXG4gICAgICAgICAgaWQ6IHRoaXMubWFuYWdlci5nZW5lcmF0ZU5vZGVJZCgpLFxyXG4gICAgICAgICAgbmFtZTogXCJcIixcclxuICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgcGFyZW50OiBOb2RlVHlwZS5hcnJheSxcclxuICAgICAgICAgIHBhcmVudE5vZGU6IHBhcmVudCxcclxuICAgICAgICAgIHR5cGU6IE5vZGVUeXBlLmFycmF5LFxyXG4gICAgICAgICAgY2hpbGRyZW46IFtdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGpzb25WYWx1ZTogYW55ID0gdGhpcy50cmFuc2Zvcm1Ob2RlVG9JbnRlcm5hbFN0cnVjdGlvbihpdGVtLCBzdWJOb2RlKTtcclxuICAgICAgICBpZiAoanNvblZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgIHN1Yk5vZGUuY2hpbGRyZW4gPSBqc29uVmFsdWU7XHJcbiAgICAgICAgICBjaGlsZHJlbi5wdXNoKHN1Yk5vZGUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzdWJOb2RlLnZhbHVlID0ganNvblZhbHVlO1xyXG4gICAgICAgICAgc3ViTm9kZS50eXBlID0gTm9kZVR5cGUubGl0ZXJhbDtcclxuICAgICAgICAgIGNoaWxkcmVuLnB1c2goc3ViTm9kZSk7XHJcbiAgICAgICAgfSAgICAgIFxyXG4gICAgICB9KTtcclxuICAgICAgcmVzdWx0ID0gY2hpbGRyZW47XHJcbiAgICB9IGVsc2UgaWYgKG5vZGUgaW5zdGFuY2VvZiBPYmplY3QpIHtcclxuICAgICAgY29uc3QgbGlzdCA9IE9iamVjdC5rZXlzKG5vZGUpO1xyXG4gICAgICBjb25zdCBjaGlsZHJlbjogTm9kZVtdID0gW107XHJcbiAgICAgIGxpc3QubWFwKCAoaXRlbSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHN1Yk5vZGU6IE5vZGUgPSB7XHJcbiAgICAgICAgICBpZDogdGhpcy5tYW5hZ2VyLmdlbmVyYXRlTm9kZUlkKCksXHJcbiAgICAgICAgICBuYW1lOiBpdGVtLFxyXG4gICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICBwYXJlbnQ6IE5vZGVUeXBlLmpzb24sXHJcbiAgICAgICAgICBwYXJlbnROb2RlOiBwYXJlbnQsXHJcbiAgICAgICAgICB0eXBlOiBOb2RlVHlwZS5hcnJheSxcclxuICAgICAgICAgIGNoaWxkcmVuOiBbXVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBqc29uVmFsdWU6IGFueSA9IHRoaXMudHJhbnNmb3JtTm9kZVRvSW50ZXJuYWxTdHJ1Y3Rpb24obm9kZVtpdGVtXSwgc3ViTm9kZSk7XHJcbiAgICAgICAgaWYgKGpzb25WYWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICBzdWJOb2RlLmNoaWxkcmVuID0ganNvblZhbHVlO1xyXG4gICAgICAgICAgY2hpbGRyZW4ucHVzaChzdWJOb2RlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3ViTm9kZS52YWx1ZSA9IGpzb25WYWx1ZTtcclxuICAgICAgICAgIHN1Yk5vZGUudHlwZSA9IE5vZGVUeXBlLnBhaXI7XHJcbiAgICAgICAgICBjaGlsZHJlbi5wdXNoKHN1Yk5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHJlc3VsdCA9IGNoaWxkcmVuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuXHJcbiAgYWRkTmV3Tm9kZShldmVudCwgbm9kZSkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIGlmKHRoaXMucmVhc29uaW5nKSB7XHJcbiAgICAgIC8vIGxldCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKEZyZWVKc29uRGlhbG9nLCB7XHJcbiAgICAgIC8vICAgZGF0YTogeyBcclxuICAgICAgLy8gICAgIGFjdGlvbjogJ2FkZCcsXHJcbiAgICAgIC8vICAgICBub2RlOiBub2RlLFxyXG4gICAgICAvLyAgICAgcmVhc29uaW5nOiB0aGlzLnJlYXNvbmluZyxcclxuICAgICAgLy8gICAgIGNvZGVzOiB0aGlzLnJlYXNvbmluZ0NvZGVzXHJcbiAgICAgIC8vICAgfSxcclxuICAgICAgLy8gfSk7XHJcbiAgICAgIC8vIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICAvLyAgIGlmIChyZXN1bHQub2spIHtcclxuICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiVE9ETzogcG9wdXAgd2lsbCBzZXQgbm9kZSB0eXBlXCIpO1xyXG4gICAgICAvLyAgICAgY29uc3QgdHlwZSA9IHJlc3VsdC5ub3RlVHlwZTtcclxuICAgICAgLy8gICAgIG5vZGUuY2hpbGRyZW4gPSBbLi4ubm9kZS5jaGlsZHJlbiwgdGhpcy5tYW5hZ2VyLmdldE5ld05vZGUobm9kZSldO1xyXG4gICAgICAvLyAgICAgbm9kZS5leHBhbmRlZCA9IHRydWU7XHJcbiAgICAgIC8vICAgICB0aGlzLmNoYW5nZVBlcmZvcm1lZCh7fSk7XHJcbiAgICAgIC8vICAgfVxyXG4gICAgICAvLyB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG5vZGUuY2hpbGRyZW4gPSBbLi4ubm9kZS5jaGlsZHJlbiwgdGhpcy5tYW5hZ2VyLmdldE5ld05vZGUobm9kZSldO1xyXG4gICAgICBub2RlLmV4cGFuZGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5jaGFuZ2VQZXJmb3JtZWQoe30pO1xyXG4gICAgfVxyXG4gIH1cclxuICBtb3ZlTm9kZShldmVudCwgbm9kZSwgbW92ZVVwKSB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgaWYodGhpcy5yZWFzb25pbmcpIHtcclxuICAgICAgLy8gbGV0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oRnJlZUpzb25EaWFsb2csIHtcclxuICAgICAgLy8gICBkYXRhOiB7IFxyXG4gICAgICAvLyAgICAgYWN0aW9uOiAnbW92ZScsXHJcbiAgICAgIC8vICAgICBmcm9tOiB0aGlzLnRyYW5zZm9ybWVkRGF0YS5pbmRleE9mKG5vZGUpLFxyXG4gICAgICAvLyAgICAgZGlyZWN0aW9uOiBtb3ZlVXAsXHJcbiAgICAgIC8vICAgICBub2RlOiBub2RlLFxyXG4gICAgICAvLyAgICAgcmVhc29uaW5nOiB0aGlzLnJlYXNvbmluZyxcclxuICAgICAgLy8gICAgIGNvZGVzOiB0aGlzLnJlYXNvbmluZ0NvZGVzXHJcbiAgICAgIC8vICAgfSxcclxuICAgICAgLy8gfSk7XHJcbiAgICAgIC8vIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICAvLyAgIGlmIChyZXN1bHQub2spIHtcclxuICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiVE9ETzogcG9wdXAgd2lsbCBnaXZlIGluZGV4IHRvIGdvIHRvXCIpO1xyXG4gICAgICAvLyAgICAgbGV0IGZyb20gPSByZXN1bHQuZnJvbTtcclxuICAgICAgLy8gICAgIGxldCB0byA9IG1vdmVVcCA/IFxyXG4gICAgICAvLyAgICAgICAgICAgICAgIChmcm9tID4gMCA/IGZyb20gLSAxIDogZnJvbSkgOiBcclxuICAgICAgLy8gICAgICAgICAgICAgICAoZnJvbSA8ICh0aGlzLnRyYW5zZm9ybWVkRGF0YS5sZW5ndGggLSAxKSA/IGZyb20gKyAxIDogZnJvbSk7XHJcbiAgICAgIFxyXG4gICAgICAvLyAgICAgdGhpcy50cmFuc2Zvcm1lZERhdGEuc3BsaWNlKHRvLCAwLCB0aGlzLnRyYW5zZm9ybWVkRGF0YS5zcGxpY2UoZnJvbSwgMSlbMF0pO1xyXG4gICAgICAvLyAgICAgdGhpcy5jaGFuZ2VQZXJmb3JtZWQoe30pO1xyXG4gICAgICAvLyAgIH1cclxuICAgICAgLy8gfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgZnJvbSA9IHRoaXMudHJhbnNmb3JtZWREYXRhLmluZGV4T2Yobm9kZSk7XHJcbiAgICAgIGxldCB0byA9IG1vdmVVcCA/IFxyXG4gICAgICAgICAgICAgICAgKGZyb20gPiAwID8gZnJvbSAtIDEgOiBmcm9tKSA6IFxyXG4gICAgICAgICAgICAgICAgKGZyb20gPCAodGhpcy50cmFuc2Zvcm1lZERhdGEubGVuZ3RoIC0gMSkgPyBmcm9tICsgMSA6IGZyb20pO1xyXG4gIFxyXG4gICAgICB0aGlzLnRyYW5zZm9ybWVkRGF0YS5zcGxpY2UodG8sIDAsIHRoaXMudHJhbnNmb3JtZWREYXRhLnNwbGljZShmcm9tLCAxKVswXSk7XHJcbiAgICAgIHRoaXMuY2hhbmdlUGVyZm9ybWVkKHt9KTtcclxuICAgIH1cclxuICB9XHJcbiAgZGVsZXRlTm9kZShldmVudCwgbm9kZSkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgaWYodGhpcy5yZWFzb25pbmcpIHtcclxuICAgICAgLy8gbGV0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oRnJlZUpzb25EaWFsb2csIHtcclxuICAgICAgLy8gICBkYXRhOiB7IFxyXG4gICAgICAvLyAgICAgYWN0aW9uOiAncmVtb3ZlJyxcclxuICAgICAgLy8gICAgIG5vZGU6IG5vZGUsXHJcbiAgICAgIC8vICAgICByZWFzb25pbmc6IHRoaXMucmVhc29uaW5nLFxyXG4gICAgICAvLyAgICAgY29kZXM6IHRoaXMucmVhc29uaW5nQ29kZXNcclxuICAgICAgLy8gICB9LFxyXG4gICAgICAvLyB9KTtcclxuICAgICAgLy8gZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgIC8vICAgaWYgKHJlc3VsdC5vaykge1xyXG4gICAgICAvLyAgICAgY29uc29sZS5sb2coXCJUT0RPOiBwcm9tcHQgcmVhc29uIGFkIHNhdmUgaXQgaW4gYSBjb25zdHJ1Y3RcIik7XHJcbiAgICAgIC8vICAgICB0aGlzLnRyYW5zZm9ybWVkRGF0YS5zcGxpY2UodGhpcy50cmFuc2Zvcm1lZERhdGEuaW5kZXhPZihub2RlKSwgMSk7XHJcbiAgICAgIC8vICAgICB0aGlzLmNoYW5nZVBlcmZvcm1lZCh7fSk7XHJcbiAgICAgIC8vICAgfVxyXG4gICAgICAvLyB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudHJhbnNmb3JtZWREYXRhLnNwbGljZSh0aGlzLnRyYW5zZm9ybWVkRGF0YS5pbmRleE9mKG5vZGUpLCAxKTtcclxuICAgICAgdGhpcy5jaGFuZ2VQZXJmb3JtZWQoe30pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGFzQ2hldnJvbkRvd24oY2hpbGQpe1xyXG4gICAgcmV0dXJuIGNoaWxkICYmIGNoaWxkLmNoaWxkcmVuICYmIGNoaWxkLmNoaWxkcmVuLmxlbmd0aCA+IDAgJiYgY2hpbGQuZXhwYW5kZWRcclxuICB9XHJcblxyXG4gIGhhc0NoZXZyb25SaWdodChjaGlsZCkge1xyXG4gICAgcmV0dXJuIGNoaWxkICYmIGNoaWxkLmNoaWxkcmVuICYmIGNoaWxkLmNoaWxkcmVuLmxlbmd0aCAhPSAwICYmICFjaGlsZC5leHBhbmRlZFxyXG4gIH1cclxuXHJcblx0ZHJhZ0VuYWJsZWQoZXZlbnQ6IERyYWdFdmVudCkge1xyXG5cdFx0cmV0dXJuICFldmVudC5tZWRpdW0uaXNSb290ICYmIChldmVudC5tZWRpdW0ubmFtZS5sZW5ndGggfHwgZXZlbnQubWVkaXVtLnZhbHVlLmxlbmd0aCk7XHJcblx0fVxyXG5cdGRyb3BFbmFibGVkKGV2ZW50OiBEcm9wRXZlbnQpIHtcclxuXHRcdHJldHVybiAhZXZlbnQuZGVzdGluYXRpb24ubWVkaXVtLmlzUm9vdDtcclxuXHR9XHJcbiAgb25EcmFnU3RhcnQoZXZlbnQpIHtcclxuICAgIC8vIHRoaXMubWFuYWdlci5zZXRTZWxlY3RlZE5vZGUoZXZlbnQubWVkaXVtKTtcclxuICB9XHJcblxyXG4gIG9uRHJhZ0VuZChldmVudDogRHJvcEV2ZW50KSB7XHJcbiAgICBpZiAoZXZlbnQuZGVzdGluYXRpb24gJiYgZXZlbnQuc291cmNlLm1lZGl1bSAhPT0gZXZlbnQuZGVzdGluYXRpb24ubWVkaXVtKSB7XHJcbiAgICAgIGNvbnN0IHNvdXJjZUluZGV4ID0gdGhpcy50cmFuc2Zvcm1lZERhdGEuaW5kZXhPZihldmVudC5zb3VyY2UubWVkaXVtKTtcclxuXHJcbiAgICAgIGlmKHRoaXMucmVhc29uaW5nKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJhZHNhZGFzXCIpXHJcbiAgICAgICAgLy8gbGV0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oRnJlZUpzb25EaWFsb2csIHtcclxuICAgICAgICAvLyAgIGRhdGE6IHsgXHJcbiAgICAgICAgLy8gICAgIGFjdGlvbjogJ2RyYWcnLFxyXG4gICAgICAgIC8vICAgICBmcm9tOiBzb3VyY2VJbmRleCxcclxuICAgICAgICAvLyAgICAgcmVhc29uaW5nOiB0aGlzLnJlYXNvbmluZyxcclxuICAgICAgICAvLyAgICAgY29kZXM6IHRoaXMucmVhc29uaW5nQ29kZXNcclxuICAgICAgICAvLyAgIH0sXHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgLy8gZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgLy8gICBpZiAocmVzdWx0Lm9rKSB7XHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiVE9ETzogcHJvbXB0IHJlYXNvbiBhZCBzYXZlIGl0IGluIGEgY29uc3RydWN0XCIpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLnRyYW5zZm9ybWVkRGF0YS5zcGxpY2Uoc291cmNlSW5kZXgsIDEpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLmNoYW5nZVBlcmZvcm1lZCh7fSk7XHJcbiAgICAgICAgLy8gICB9XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm1lZERhdGEuc3BsaWNlKHNvdXJjZUluZGV4LCAxKTtcclxuICAgICAgICB0aGlzLmNoYW5nZVBlcmZvcm1lZCh7fSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uRHJvcChldmVudCl7XHJcbiAgICBpZiAoZXZlbnQuZGVzdGluYXRpb24gJiYgZXZlbnQuc291cmNlICYmIGV2ZW50LnNvdXJjZS5tZWRpdW0gIT09IGV2ZW50LmRlc3RpbmF0aW9uLm1lZGl1bSkge1xyXG4gICAgICBjb25zdCBzb3VyY2VOb2RlID0gZXZlbnQuc291cmNlLm1lZGl1bTtcclxuICAgICAgY29uc3QgZGVzdGluYXRpb25Ob2RlID0gZXZlbnQuZGVzdGluYXRpb24ubWVkaXVtO1xyXG4gIFxyXG4gICAgICBkZXN0aW5hdGlvbk5vZGUuY2hpbGRyZW4gPSBbLi4uZGVzdGluYXRpb25Ob2RlLmNoaWxkcmVuLCBzb3VyY2VOb2RlXTtcclxuICAgICAgaWYgKGRlc3RpbmF0aW9uTm9kZS5jaGlsZHJlbi5sZW5ndGgpIHtcclxuICAgICAgICBkZXN0aW5hdGlvbk5vZGUuZXhwYW5kZWQgPSB0cnVlO1xyXG4gICAgICB9ICAgIFxyXG4gICAgICBpZiAoZGVzdGluYXRpb25Ob2RlLnR5cGUgPT09IE5vZGVUeXBlLmxpdGVyYWwpIHtcclxuICAgICAgICBkZXN0aW5hdGlvbk5vZGUudHlwZSA9IE5vZGVUeXBlLmpzb247XHJcbiAgICAgICAgZGVzdGluYXRpb25Ob2RlLnZhbHVlPSBcIlwiO1xyXG4gICAgICB9IGVsc2UgaWYgKGRlc3RpbmF0aW9uTm9kZS50eXBlID09PSBOb2RlVHlwZS5wYWlyKSB7XHJcbiAgICAgICAgZGVzdGluYXRpb25Ob2RlLnR5cGUgPSBOb2RlVHlwZS5qc29uO1xyXG4gICAgICB9IGVsc2UgaWYgKGRlc3RpbmF0aW9uTm9kZS50eXBlID09PSBOb2RlVHlwZS5hcnJheSkge1xyXG4gICAgICAgIGlmIChkZXN0aW5hdGlvbk5vZGUucGFyZW50ID09PSBOb2RlVHlwZS5hcnJheSAmJiBzb3VyY2VOb2RlLnR5cGUgPT09IE5vZGVUeXBlLnBhaXIpIHtcclxuICAgICAgICAgIHNvdXJjZU5vZGUudHlwZSA9IE5vZGVUeXBlLmpzb247XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHNvdXJjZU5vZGUucGFyZW50ID0gZGVzdGluYXRpb25Ob2RlLnR5cGU7XHJcblxyXG4gICAgICBjb25zdCBpID0gc291cmNlTm9kZS5wYXJlbnROb2RlLmNoaWxkcmVuLmluZGV4T2Yoc291cmNlTm9kZSk7XHJcbiAgICAgIHNvdXJjZU5vZGUucGFyZW50Tm9kZS5jaGlsZHJlbi5zcGxpY2UoaSwgMSk7XHJcbiAgICAgIHNvdXJjZU5vZGUucGFyZW50Tm9kZSA9IGRlc3RpbmF0aW9uTm9kZTtcclxuICAgICAgdGhpcy5jaGFuZ2VQZXJmb3JtZWQoe30pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdG9HcmFuZFBhcmVudChldmVudCwgY2hpbGQpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBjb25zdCBwYXJlbnQgPSAgY2hpbGQucGFyZW50Tm9kZTtcclxuICAgIGNvbnN0IGdyYW5kUGFyZW50ID0gIGNoaWxkLnBhcmVudE5vZGUucGFyZW50Tm9kZTtcclxuICAgIGNvbnN0IGkgPSBwYXJlbnQuY2hpbGRyZW4uaW5kZXhPZihjaGlsZCk7XHJcbiAgICBjb25zdCBwID0gZ3JhbmRQYXJlbnQuY2hpbGRyZW4uaW5kZXhPZihwYXJlbnQpO1xyXG5cclxuICAgIHBhcmVudC5jaGlsZHJlbi5zcGxpY2UoaSwgMSk7XHJcblxyXG4gICAgaWYgKHBhcmVudC5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcclxuICAgICAgaWYgKCFwYXJlbnQubmFtZS5sZW5ndGggJiYgIXBhcmVudC52YWx1ZS5sZW5ndGgpIHtcclxuICAgICAgICBncmFuZFBhcmVudC5jaGlsZHJlbi5zcGxpY2UocCwgMSk7XHJcbiAgICAgICAgZ3JhbmRQYXJlbnQuY2hpbGRyZW4uc3BsaWNlKHAsIDAsIGNoaWxkKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBwYXJlbnQudHlwZSA9IE5vZGVUeXBlLnBhaXI7XHJcbiAgICAgICAgZ3JhbmRQYXJlbnQuY2hpbGRyZW4uc3BsaWNlKHAgKyAxLCAwLCBjaGlsZCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGdyYW5kUGFyZW50LmNoaWxkcmVuLnNwbGljZShwICsgMSwgMCwgY2hpbGQpO1xyXG4gICAgfVxyXG4gICAgY2hpbGQucGFyZW50Tm9kZSA9IGdyYW5kUGFyZW50O1xyXG4gICAgdGhpcy5jaGFuZ2VQZXJmb3JtZWQoe30pO1xyXG4gIH1cclxuXHJcbiAgZ2V0RmlsdGVyZWRUZXh0KCl7XHJcbiAgICB0aGlzLm1hbmFnZXIuZ2V0RmlsdGVyZWRUZXh0KCk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGUoZXZlbnQsIGNoaWxkKSB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjaGlsZC5leHBhbmRlZCA9ICFjaGlsZC5leHBhbmRlZDtcclxuICB9XHJcblxyXG4gIGtleWRvd24oZXZlbnQsIGl0ZW0pIHtcclxuICAgIGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcclxuICAgIGlmICgoY29kZSA9PT0gMTMpIHx8IChjb2RlID09PSAzMikpIHtcclxuXHRcdFx0dGhpcy50b2dnbGUoZXZlbnQsIGl0ZW0pO1xyXG5cdFx0fVxyXG4gIH1cclxuICBrZXltb3ZlKGV2ZW50LCBpdGVtLCBtb3ZlVXApIHtcclxuICAgIGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcclxuICAgIGlmICgoY29kZSA9PT0gMTMpIHx8IChjb2RlID09PSAzMikpIHtcclxuICAgICAgdGhpcy5tb3ZlTm9kZShldmVudCwgaXRlbSwgbW92ZVVwKTtcclxuICAgIH1cclxuICB9XHJcbiAga2V5ZGVsZXRlKGV2ZW50LCBpdGVtKSB7XHJcbiAgICBjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcbiAgICBpZiAoKGNvZGUgPT09IDEzKSB8fCAoY29kZSA9PT0gMzIpKSB7XHJcblx0XHRcdHRoaXMuZGVsZXRlTm9kZShldmVudCwgaXRlbSk7XHJcblx0XHR9XHJcbiAgfVxyXG4gIGtleXRvR3JhbmRQYXJlbnQoZXZlbnQsIGl0ZW0pIHtcclxuICAgIGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcclxuICAgIGlmICgoY29kZSA9PT0gMTMpIHx8IChjb2RlID09PSAzMikpIHtcclxuXHRcdFx0dGhpcy50b0dyYW5kUGFyZW50KGV2ZW50LCBpdGVtKTtcclxuXHRcdH1cclxuICB9XHJcbiAga2V5YWRkKGV2ZW50LCBpdGVtKSB7XHJcbiAgICBjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcbiAgICBpZiAoKGNvZGUgPT09IDEzKSB8fCAoY29kZSA9PT0gMzIpKSB7XHJcblx0XHRcdHRoaXMuYWRkTmV3Tm9kZShldmVudCwgaXRlbSk7XHJcblx0XHR9XHJcbiAgfVxyXG4gIGNhbkFkZE5vZGUobm9kZSkge1xyXG4gICAgcmV0dXJuIChub2RlLnR5cGUgPT09IE5vZGVUeXBlLmpzb24pIHx8IChub2RlLnR5cGUgPT09IE5vZGVUeXBlLmFycmF5KTtcclxuICB9XHJcbiAgY2hhbmdlUGVyZm9ybWVkKGV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5jaGlsZHJlbikge1xyXG4gICAgICBjb25zdCBzYXZlZE5vZGUgPSB0aGlzLnRyYW5zZm9ybWVkSW50ZXJuYWxTdHJ1Y3R1cmVCYWNrVG9Ob2RlKHRoaXMudHJhbnNmb3JtZWREYXRhWzBdLmNoaWxkcmVuLCBOb2RlVHlwZS5qc29uKTtcclxuICAgICAgdGhpcy5vbmNoYW5nZS5lbWl0KHtcclxuICAgICAgICBkYXRhOiBzYXZlZE5vZGUsXHJcbiAgICAgICAgcmVhc29uaW5nOiB0aGlzLnJlYXNvbmluZ1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMub25jaGFuZ2UuZW1pdCh7fSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTm9kZU1hbmFnZXIgfSBmcm9tICcuLi9pbmplY3RhYmxlcy9ub2RlLW1hbmFnZXInO1xyXG5cclxuQENvbXBvbmVudCh7IFxyXG4gIHNlbGVjdG9yOiAnanNvbi1zZWFyY2gtZmllbGQnLCBcclxuICB0ZW1wbGF0ZTpgPGlucHV0IHR5cGU9J3RleHQnIFsobmdNb2RlbCldPSd2YWwnIChuZ01vZGVsQ2hhbmdlKT0nZmlsdGVyKHZhbCknPmBcclxufSlcclxuZXhwb3J0IGNsYXNzIEZyZWVKc29uU2VhcmNoRmllbGR7XHJcbiAgQElucHV0KFwidmFsXCIpXHJcbiAgdmFsOiBzdHJpbmc7XHJcbiAgXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG1hbmFnZXI6IE5vZGVNYW5hZ2VyXHJcbiAgKSB7fVxyXG5cclxuICBmaWx0ZXIodmFsdWUpIHtcclxuICAgIHRoaXMubWFuYWdlci5zZXRGaWx0ZXJlZFRleHQodmFsdWUpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge0NvbXBvbmVudCwgVmlld0NoaWxkLCBSZW5kZXJlciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IE5vZGUgfSBmcm9tICcuLy4uL2ludGVyZmFjZXMvbm9kZS5pbnRlcmZhY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdqc29uLWxhYmVsJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vanNvbi1sYWJlbC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vanNvbi1sYWJlbC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGcmVlSnNvbkxhYmVsIHtcclxuXHJcbiAgZWRpdE5hbWUgPSBmYWxzZTtcclxuICBlZGl0VmFsdWUgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIpIHtcclxuXHJcbiAgfVxyXG5cclxuICBAVmlld0NoaWxkKFwibmFtZUVkaXRvclwiKVxyXG4gIG5hbWVFZGl0b3I7XHJcblxyXG4gIEBWaWV3Q2hpbGQoXCJ2YWx1ZUVkaXRvclwiKVxyXG4gIHZhbHVlRWRpdG9yO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIG5vZGU6IE5vZGU7XHJcblxyXG4gIEBPdXRwdXQoXCJvbmNoYW5nZVwiKVxyXG4gIG9uY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBuYW1lTGFiZWxLZXlkb3duKGV2ZW50KSB7XHJcbiAgICBjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcbiAgICBpZiAoKGNvZGUgPT09IDEzKSB8fCAoY29kZSA9PT0gMzIpKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuaW52b2tlRWxlbWVudE1ldGhvZChldmVudC50YXJnZXQsIFwiY2xpY2tcIik7XHJcbiAgICAgIHNldFRpbWVvdXQoKCk9PntcclxuICAgICAgICBpZiAodGhpcy5uYW1lRWRpdG9yKSB7XHJcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QodGhpcy5uYW1lRWRpdG9yLm5hdGl2ZUVsZW1lbnQsIFwiZm9jdXNcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LDY2KTtcclxuXHRcdH0gZWxzZSBpZiAoY29kZSA9PT0gMjcpIHtcclxuICAgICAgdGhpcy5lZGl0TmFtZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuICB2YWx1ZUxhYmVsS2V5ZG93bihldmVudCkge1xyXG4gICAgY29uc3QgY29kZSA9IGV2ZW50LndoaWNoO1xyXG4gICAgaWYgKChjb2RlID09PSAxMykgfHwgKGNvZGUgPT09IDMyKSkge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QoZXZlbnQudGFyZ2V0LCBcImNsaWNrXCIpO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpPT57XHJcbiAgICAgICAgaWYgKHRoaXMudmFsdWVFZGl0b3IpIHtcclxuICAgICAgICAgIHRoaXMucmVuZGVyZXIuaW52b2tlRWxlbWVudE1ldGhvZCh0aGlzLnZhbHVlRWRpdG9yLm5hdGl2ZUVsZW1lbnQsIFwiZm9jdXNcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LDY2KTtcclxuXHRcdH0gZWxzZSBpZiAoY29kZSA9PT0gMjcpIHtcclxuICAgICAgdGhpcy5lZGl0VmFsdWUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNsaWNrTmFtZShldmVudCkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdGhpcy5lZGl0TmFtZSA9IHRoaXMubm9kZS5uYW1lICE9PSdSb290JztcclxuICAgIHNldFRpbWVvdXQoKCk9PntcclxuICAgICAgdGhpcy5yZW5kZXJlci5pbnZva2VFbGVtZW50TWV0aG9kKHRoaXMubmFtZUVkaXRvci5uYXRpdmVFbGVtZW50LCBcImZvY3VzXCIpO1xyXG4gICAgfSw2Nik7XHJcbiAgfVxyXG4gIGNsaWNrVmFsdWUoZXZlbnQpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIHRoaXMuZWRpdFZhbHVlID0gdGhpcy5ub2RlLnZhbHVlICE9PSdPYmplY3QnO1xyXG4gICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QodGhpcy52YWx1ZUVkaXRvci5uYXRpdmVFbGVtZW50LCBcImZvY3VzXCIpO1xyXG4gICAgfSw2Nik7XHJcbiAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5vZGVNYW5hZ2VyIH0gZnJvbSAnLi4vaW5qZWN0YWJsZXMvbm9kZS1tYW5hZ2VyJztcclxuXHJcbkBQaXBlKHtcclxuICBuYW1lOiAnbm9kZVNlYXJjaCcsXHJcbiAgcHVyZTogZmFsc2VcclxufSlcclxuZXhwb3J0IGNsYXNzIEZyZWVKc29uU2VhcmNoIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG1hbmFnZXI6IE5vZGVNYW5hZ2VyXHJcbiAgKXtcclxuICB9XHJcblxyXG4gIGlzQmxhbmsob2JqOiBhbnkpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBvYmogPT09IHVuZGVmaW5lZCB8fCBvYmogPT09IG51bGw7XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm0odmFsdWUpIHtcclxuICAgIHZhciBmaWx0ZXJlZFRleHQgPSB0aGlzLm1hbmFnZXIuZ2V0RmlsdGVyZWRUZXh0KClcclxuICAgIGlmICh0aGlzLmlzQmxhbmsoZmlsdGVyZWRUZXh0KSkgeyBcclxuICAgICAgcmV0dXJuIHZhbHVlXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdmFsdWUuZmlsdGVyKChub2RlKSA9PiBub2RlLnRleHQuaW5kZXhPZihmaWx0ZXJlZFRleHQpID4gLTEpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IERyYWdEcm9wTW9kdWxlIH0gZnJvbSAnQHNlZGVoL2RyYWctZW5hYmxlZCc7XHJcblxyXG5pbXBvcnQgeyBOb2RlTWFuYWdlciB9IGZyb20gJy4vaW5qZWN0YWJsZXMvbm9kZS1tYW5hZ2VyJztcclxuaW1wb3J0IHsgRnJlZUpzb25TZWFyY2hGaWVsZCB9IGZyb20gJy4vY29tcG9uZW50cy9qc29uLXNlYXJjaC1maWVsZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGcmVlSnNvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9qc29uLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZyZWVKc29uTGFiZWwgfSBmcm9tICcuL2NvbXBvbmVudHMvanNvbi1sYWJlbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGcmVlSnNvblNlYXJjaCB9IGZyb20gJy4vcGlwZXMvanNvbi1zZWFyY2gnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBEcmFnRHJvcE1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEZyZWVKc29uQ29tcG9uZW50LFxyXG4gICAgRnJlZUpzb25MYWJlbCxcclxuICAgIEZyZWVKc29uU2VhcmNoLFxyXG4gICAgRnJlZUpzb25TZWFyY2hGaWVsZFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgRnJlZUpzb25Db21wb25lbnRcclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1xyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBGcmVlSnNvblNlYXJjaCxcclxuICAgIE5vZGVNYW5hZ2VyXHJcbiAgXSxcclxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQV1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBGcmVlSnNvbk1vZHVsZSB7fVxyXG4iXSwibmFtZXMiOlsiSW5qZWN0YWJsZSIsIkV2ZW50RW1pdHRlciIsIkNvbXBvbmVudCIsIklucHV0IiwiT3V0cHV0IiwiUmVuZGVyZXIiLCJWaWV3Q2hpbGQiLCJQaXBlIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJE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