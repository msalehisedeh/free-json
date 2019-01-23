/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NodeManager } from '../injectables/node-manager';
import { NodeType } from '../interfaces/node.interface';
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
            node.children = tslib_1.__spread(node.children, [this.manager.getNewNode(node)]);
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
            destinationNode.children = tslib_1.__spread(destinationNode.children, [sourceNode]);
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
export { FreeJsonComponent };
if (false) {
    /** @type {?} */
    FreeJsonComponent.prototype.children;
    /** @type {?} */
    FreeJsonComponent.prototype.transformedData;
    /** @type {?} */
    FreeJsonComponent.prototype.reasoning;
    /** @type {?} */
    FreeJsonComponent.prototype.reasoningCodes;
    /** @type {?} */
    FreeJsonComponent.prototype.onpublish;
    /** @type {?} */
    FreeJsonComponent.prototype.onchange;
    /** @type {?} */
    FreeJsonComponent.prototype.expanded;
    /** @type {?} */
    FreeJsonComponent.prototype.manager;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvZnJlZS1qc29uLyIsInNvdXJjZXMiOlsic3JjL2FwcC9mcmVlLWpzb24vY29tcG9uZW50cy9qc29uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHL0UsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRzFELE9BQU8sRUFBUSxRQUFRLEVBQXlCLE1BQU0sOEJBQThCLENBQUM7O0lBa0VuRiwyQkFDUztRQUFBLFlBQU8sR0FBUCxPQUFPOzhCQWhEVyxFQUFFO3lCQXdDakIsSUFBSSxZQUFZLEVBQUU7d0JBR25CLElBQUksWUFBWSxFQUFFO0tBUTVCO0lBakRELHNCQUNJLG1DQUFJOzs7O1FBcUJSO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDeEI7Ozs7O1FBeEJELFVBQ1MsSUFBVztZQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNULElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7aUJBQ3JCOztnQkFDRCxJQUFNLFFBQU0sR0FBUztvQkFDbkIsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFO29CQUNqQyxJQUFJLEVBQUUsTUFBTTtvQkFDWixLQUFLLEVBQUUsUUFBUTtvQkFDZixNQUFNLEVBQUUsUUFBUSxDQUFDLEtBQUs7b0JBQ3RCLElBQUksRUFBRSxRQUFRLENBQUMsS0FBSztvQkFDcEIsUUFBUSxFQUFFLElBQUk7b0JBQ2QsUUFBUSxFQUFFLFNBQVM7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QUMsV0FBVzsyQkFHbEIsTUFBTSxTQUFDLFVBQVU7OzRCQW5FcEI7O1NBY2EsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEcm9wRXZlbnQsIERyYWdFdmVudCB9IGZyb20gJ0BzZWRlaC9kcmFnLWVuYWJsZWQnO1xyXG5cclxuaW1wb3J0IHsgTm9kZU1hbmFnZXIgfSBmcm9tICcuLi9pbmplY3RhYmxlcy9ub2RlLW1hbmFnZXInO1xyXG5pbXBvcnQgeyBGcmVlSnNvblNlYXJjaCB9IGZyb20gJy4uL3BpcGVzL2pzb24tc2VhcmNoJztcclxuaW1wb3J0IHsgRnJlZUpzb25MYWJlbCB9IGZyb20gJy4vanNvbi1sYWJlbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOb2RlLCBOb2RlVHlwZSwgUmVhc29uaW5nLCBBY3Rpb25UeXBlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9ub2RlLmludGVyZmFjZSc7XHJcbi8vaW1wb3J0IHsgRnJlZUpzb25EaWFsb2cgfSBmcm9tICcuL2pzb24tZGlhbG9nLmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2ZyZWUtanNvbicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2pzb24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2pzb24uY29tcG9uZW50LnNjc3MnXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIEZyZWVKc29uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgY2hpbGRyZW47XHJcbiAgXHJcbiAgQElucHV0KFwidHJhbnNmb3JtZWREYXRhXCIpXHJcbiAgdHJhbnNmb3JtZWREYXRhO1xyXG4gIFxyXG4gIEBJbnB1dChcInJlYXNvbmluZ1wiKVxyXG4gIHJlYXNvbmluZzogUmVhc29uaW5nW107XHJcblxyXG4gIEBJbnB1dChcInJlYXNvbmluZ0NvZGVzXCIpXHJcbiAgcmVhc29uaW5nQ29kZXM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHJvb3Qobm9kZSA6IE5vZGUgKXtcclxuICAgIGlmIChub2RlKSB7XHJcbiAgICAgIHRoaXMuY2hpbGRyZW4gPSBub2RlO1xyXG4gICAgICBpZiAodGhpcy5yZWFzb25pbmcpIHtcclxuICAgICAgICB0aGlzLnJlYXNvbmluZyA9IFtdO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHBhcmVudDogTm9kZSA9IHtcclxuICAgICAgICBpZDogdGhpcy5tYW5hZ2VyLmdlbmVyYXRlTm9kZUlkKCksXHJcbiAgICAgICAgbmFtZTogXCJSb290XCIsXHJcbiAgICAgICAgdmFsdWU6IFwiT2JqZWN0XCIsXHJcbiAgICAgICAgcGFyZW50OiBOb2RlVHlwZS5hcnJheSxcclxuICAgICAgICB0eXBlOiBOb2RlVHlwZS5hcnJheSxcclxuICAgICAgICBleHBhbmRlZDogdHJ1ZSxcclxuICAgICAgICBjaGlsZHJlbjogdW5kZWZpbmVkLFxyXG4gICAgICAgIGlzUm9vdDogdHJ1ZVxyXG4gICAgICB9XHJcbiAgICAgIHBhcmVudC5jaGlsZHJlbiA9IHRoaXMudHJhbnNmb3JtTm9kZVRvSW50ZXJuYWxTdHJ1Y3Rpb24odGhpcy5jaGlsZHJlbiwgcGFyZW50KVxyXG5cclxuICAgICAgdGhpcy50cmFuc2Zvcm1lZERhdGEgPSBbIHBhcmVudCBdO1xyXG4gICAgfVxyXG4gIH1cclxuICBnZXQgcm9vdCgpOiBOb2Rle1xyXG4gICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbjtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHNhdmUoZmxhZyA6IGJvb2xlYW4gKXtcclxuICAgICAgaWYgKGZsYWcpIHtcclxuICAgICAgICBjb25zdCBzYXZlZE5vZGUgPSB0aGlzLnRyYW5zZm9ybWVkSW50ZXJuYWxTdHJ1Y3R1cmVCYWNrVG9Ob2RlKHRoaXMudHJhbnNmb3JtZWREYXRhWzBdLmNoaWxkcmVuLCBOb2RlVHlwZS5qc29uKTtcclxuICAgICAgICB0aGlzLm9ucHVibGlzaC5lbWl0KHNhdmVkTm9kZSlcclxuICAgICAgfVxyXG4gIH1cclxuICBnZXQgc2F2ZSgpe1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBAT3V0cHV0KFwib25wdWJsaXNoXCIpXHJcbiAgb25wdWJsaXNoID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIFxyXG4gIEBPdXRwdXQoXCJvbmNoYW5nZVwiKVxyXG4gIG9uY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIFxyXG4gIGV4cGFuZGVkOkJvb2xlYW47XHJcbiAgXHJcbiAgY29uc3RydWN0b3IoXHJcblx0ICBwcml2YXRlIG1hbmFnZXI6Tm9kZU1hbmFnZXJcclxuXHQpIHtcclxuXHQgIFxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0cmFuc2Zvcm1lZEludGVybmFsU3RydWN0dXJlQmFja1RvTm9kZSggcm9vdCwgcGFyZW50ICkge1xyXG4gICAgbGV0IGpzb24gPSB7fTtcclxuICAgIGxldCBhcnJheSA9IFtdO1xyXG5cclxuICAgIHJvb3QubWFwKCAoaXRlbTogTm9kZSkgPT4ge1xyXG4gICAgICBpZiAocGFyZW50ID09PSBOb2RlVHlwZS5qc29uKSB7ICAgICAgICBcclxuICAgICAgICBpZiAoaXRlbS50eXBlID09PSBOb2RlVHlwZS5saXRlcmFsKSB7XHJcbiAgICAgICAgICBhcnJheS5wdXNoKGl0ZW0udmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSBOb2RlVHlwZS5wYWlyKSB7XHJcbiAgICAgICAgICBqc29uW2l0ZW0ubmFtZV0gPSBpdGVtLnZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSBOb2RlVHlwZS5hcnJheSkge1xyXG4gICAgICAgICAganNvbltpdGVtLm5hbWVdID0gdGhpcy50cmFuc2Zvcm1lZEludGVybmFsU3RydWN0dXJlQmFja1RvTm9kZShpdGVtLmNoaWxkcmVuLCBpdGVtLnBhcmVudCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09IE5vZGVUeXBlLmpzb24pIHtcclxuICAgICAgICAgIGpzb25baXRlbS5uYW1lXSA9IHRoaXMudHJhbnNmb3JtZWRJbnRlcm5hbFN0cnVjdHVyZUJhY2tUb05vZGUoaXRlbS5jaGlsZHJlbiwgaXRlbS5wYXJlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmIChwYXJlbnQgPT09IE5vZGVUeXBlLmFycmF5KXtcclxuICAgICAgICBpZiAoaXRlbS50eXBlID09PSBOb2RlVHlwZS5saXRlcmFsKSB7XHJcbiAgICAgICAgICBhcnJheS5wdXNoKGl0ZW0udmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSBOb2RlVHlwZS5qc29uKSB7XHJcbiAgICAgICAgICBhcnJheS5wdXNoKHRoaXMudHJhbnNmb3JtZWRJbnRlcm5hbFN0cnVjdHVyZUJhY2tUb05vZGUoaXRlbSwgaXRlbS5wYXJlbnQpKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gTm9kZVR5cGUuYXJyYXkpIHtcclxuICAgICAgICAgIGFycmF5LnB1c2godGhpcy50cmFuc2Zvcm1lZEludGVybmFsU3RydWN0dXJlQmFja1RvTm9kZShpdGVtLmNoaWxkcmVuLCBpdGVtLnBhcmVudCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gYXJyYXkubGVuZ3RoID8gYXJyYXkgOiBqc29uO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0cmFuc2Zvcm1Ob2RlVG9JbnRlcm5hbFN0cnVjdGlvbihub2RlLCBwYXJlbnQ6IE5vZGUpIHtcclxuICAgIGxldCByZXN1bHQgPSBub2RlO1xyXG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICBjb25zdCBjaGlsZHJlbjogTm9kZVtdID0gW107XHJcbiAgICAgIG5vZGUubWFwKCAoaXRlbSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHN1Yk5vZGU6IE5vZGUgPSB7XHJcbiAgICAgICAgICBpZDogdGhpcy5tYW5hZ2VyLmdlbmVyYXRlTm9kZUlkKCksXHJcbiAgICAgICAgICBuYW1lOiBcIlwiLFxyXG4gICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICBwYXJlbnQ6IE5vZGVUeXBlLmFycmF5LFxyXG4gICAgICAgICAgcGFyZW50Tm9kZTogcGFyZW50LFxyXG4gICAgICAgICAgdHlwZTogTm9kZVR5cGUuYXJyYXksXHJcbiAgICAgICAgICBjaGlsZHJlbjogW11cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QganNvblZhbHVlOiBhbnkgPSB0aGlzLnRyYW5zZm9ybU5vZGVUb0ludGVybmFsU3RydWN0aW9uKGl0ZW0sIHN1Yk5vZGUpO1xyXG4gICAgICAgIGlmIChqc29uVmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgc3ViTm9kZS5jaGlsZHJlbiA9IGpzb25WYWx1ZTtcclxuICAgICAgICAgIGNoaWxkcmVuLnB1c2goc3ViTm9kZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN1Yk5vZGUudmFsdWUgPSBqc29uVmFsdWU7XHJcbiAgICAgICAgICBzdWJOb2RlLnR5cGUgPSBOb2RlVHlwZS5saXRlcmFsO1xyXG4gICAgICAgICAgY2hpbGRyZW4ucHVzaChzdWJOb2RlKTtcclxuICAgICAgICB9ICAgICAgXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXN1bHQgPSBjaGlsZHJlbjtcclxuICAgIH0gZWxzZSBpZiAobm9kZSBpbnN0YW5jZW9mIE9iamVjdCkge1xyXG4gICAgICBjb25zdCBsaXN0ID0gT2JqZWN0LmtleXMobm9kZSk7XHJcbiAgICAgIGNvbnN0IGNoaWxkcmVuOiBOb2RlW10gPSBbXTtcclxuICAgICAgbGlzdC5tYXAoIChpdGVtKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc3ViTm9kZTogTm9kZSA9IHtcclxuICAgICAgICAgIGlkOiB0aGlzLm1hbmFnZXIuZ2VuZXJhdGVOb2RlSWQoKSxcclxuICAgICAgICAgIG5hbWU6IGl0ZW0sXHJcbiAgICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICAgIHBhcmVudDogTm9kZVR5cGUuanNvbixcclxuICAgICAgICAgIHBhcmVudE5vZGU6IHBhcmVudCxcclxuICAgICAgICAgIHR5cGU6IE5vZGVUeXBlLmFycmF5LFxyXG4gICAgICAgICAgY2hpbGRyZW46IFtdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGpzb25WYWx1ZTogYW55ID0gdGhpcy50cmFuc2Zvcm1Ob2RlVG9JbnRlcm5hbFN0cnVjdGlvbihub2RlW2l0ZW1dLCBzdWJOb2RlKTtcclxuICAgICAgICBpZiAoanNvblZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgIHN1Yk5vZGUuY2hpbGRyZW4gPSBqc29uVmFsdWU7XHJcbiAgICAgICAgICBjaGlsZHJlbi5wdXNoKHN1Yk5vZGUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzdWJOb2RlLnZhbHVlID0ganNvblZhbHVlO1xyXG4gICAgICAgICAgc3ViTm9kZS50eXBlID0gTm9kZVR5cGUucGFpcjtcclxuICAgICAgICAgIGNoaWxkcmVuLnB1c2goc3ViTm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgcmVzdWx0ID0gY2hpbGRyZW47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgfVxyXG5cclxuICBhZGROZXdOb2RlKGV2ZW50LCBub2RlKSB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgaWYodGhpcy5yZWFzb25pbmcpIHtcclxuICAgICAgLy8gbGV0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oRnJlZUpzb25EaWFsb2csIHtcclxuICAgICAgLy8gICBkYXRhOiB7IFxyXG4gICAgICAvLyAgICAgYWN0aW9uOiAnYWRkJyxcclxuICAgICAgLy8gICAgIG5vZGU6IG5vZGUsXHJcbiAgICAgIC8vICAgICByZWFzb25pbmc6IHRoaXMucmVhc29uaW5nLFxyXG4gICAgICAvLyAgICAgY29kZXM6IHRoaXMucmVhc29uaW5nQ29kZXNcclxuICAgICAgLy8gICB9LFxyXG4gICAgICAvLyB9KTtcclxuICAgICAgLy8gZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgIC8vICAgaWYgKHJlc3VsdC5vaykge1xyXG4gICAgICAvLyAgICAgY29uc29sZS5sb2coXCJUT0RPOiBwb3B1cCB3aWxsIHNldCBub2RlIHR5cGVcIik7XHJcbiAgICAgIC8vICAgICBjb25zdCB0eXBlID0gcmVzdWx0Lm5vdGVUeXBlO1xyXG4gICAgICAvLyAgICAgbm9kZS5jaGlsZHJlbiA9IFsuLi5ub2RlLmNoaWxkcmVuLCB0aGlzLm1hbmFnZXIuZ2V0TmV3Tm9kZShub2RlKV07XHJcbiAgICAgIC8vICAgICBub2RlLmV4cGFuZGVkID0gdHJ1ZTtcclxuICAgICAgLy8gICAgIHRoaXMuY2hhbmdlUGVyZm9ybWVkKHt9KTtcclxuICAgICAgLy8gICB9XHJcbiAgICAgIC8vIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbm9kZS5jaGlsZHJlbiA9IFsuLi5ub2RlLmNoaWxkcmVuLCB0aGlzLm1hbmFnZXIuZ2V0TmV3Tm9kZShub2RlKV07XHJcbiAgICAgIG5vZGUuZXhwYW5kZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLmNoYW5nZVBlcmZvcm1lZCh7fSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIG1vdmVOb2RlKGV2ZW50LCBub2RlLCBtb3ZlVXApIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBpZih0aGlzLnJlYXNvbmluZykge1xyXG4gICAgICAvLyBsZXQgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihGcmVlSnNvbkRpYWxvZywge1xyXG4gICAgICAvLyAgIGRhdGE6IHsgXHJcbiAgICAgIC8vICAgICBhY3Rpb246ICdtb3ZlJyxcclxuICAgICAgLy8gICAgIGZyb206IHRoaXMudHJhbnNmb3JtZWREYXRhLmluZGV4T2Yobm9kZSksXHJcbiAgICAgIC8vICAgICBkaXJlY3Rpb246IG1vdmVVcCxcclxuICAgICAgLy8gICAgIG5vZGU6IG5vZGUsXHJcbiAgICAgIC8vICAgICByZWFzb25pbmc6IHRoaXMucmVhc29uaW5nLFxyXG4gICAgICAvLyAgICAgY29kZXM6IHRoaXMucmVhc29uaW5nQ29kZXNcclxuICAgICAgLy8gICB9LFxyXG4gICAgICAvLyB9KTtcclxuICAgICAgLy8gZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgIC8vICAgaWYgKHJlc3VsdC5vaykge1xyXG4gICAgICAvLyAgICAgY29uc29sZS5sb2coXCJUT0RPOiBwb3B1cCB3aWxsIGdpdmUgaW5kZXggdG8gZ28gdG9cIik7XHJcbiAgICAgIC8vICAgICBsZXQgZnJvbSA9IHJlc3VsdC5mcm9tO1xyXG4gICAgICAvLyAgICAgbGV0IHRvID0gbW92ZVVwID8gXHJcbiAgICAgIC8vICAgICAgICAgICAgICAgKGZyb20gPiAwID8gZnJvbSAtIDEgOiBmcm9tKSA6IFxyXG4gICAgICAvLyAgICAgICAgICAgICAgIChmcm9tIDwgKHRoaXMudHJhbnNmb3JtZWREYXRhLmxlbmd0aCAtIDEpID8gZnJvbSArIDEgOiBmcm9tKTtcclxuICAgICAgXHJcbiAgICAgIC8vICAgICB0aGlzLnRyYW5zZm9ybWVkRGF0YS5zcGxpY2UodG8sIDAsIHRoaXMudHJhbnNmb3JtZWREYXRhLnNwbGljZShmcm9tLCAxKVswXSk7XHJcbiAgICAgIC8vICAgICB0aGlzLmNoYW5nZVBlcmZvcm1lZCh7fSk7XHJcbiAgICAgIC8vICAgfVxyXG4gICAgICAvLyB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCBmcm9tID0gdGhpcy50cmFuc2Zvcm1lZERhdGEuaW5kZXhPZihub2RlKTtcclxuICAgICAgbGV0IHRvID0gbW92ZVVwID8gXHJcbiAgICAgICAgICAgICAgICAoZnJvbSA+IDAgPyBmcm9tIC0gMSA6IGZyb20pIDogXHJcbiAgICAgICAgICAgICAgICAoZnJvbSA8ICh0aGlzLnRyYW5zZm9ybWVkRGF0YS5sZW5ndGggLSAxKSA/IGZyb20gKyAxIDogZnJvbSk7XHJcbiAgXHJcbiAgICAgIHRoaXMudHJhbnNmb3JtZWREYXRhLnNwbGljZSh0bywgMCwgdGhpcy50cmFuc2Zvcm1lZERhdGEuc3BsaWNlKGZyb20sIDEpWzBdKTtcclxuICAgICAgdGhpcy5jaGFuZ2VQZXJmb3JtZWQoe30pO1xyXG4gICAgfVxyXG4gIH1cclxuICBkZWxldGVOb2RlKGV2ZW50LCBub2RlKSB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBpZih0aGlzLnJlYXNvbmluZykge1xyXG4gICAgICAvLyBsZXQgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihGcmVlSnNvbkRpYWxvZywge1xyXG4gICAgICAvLyAgIGRhdGE6IHsgXHJcbiAgICAgIC8vICAgICBhY3Rpb246ICdyZW1vdmUnLFxyXG4gICAgICAvLyAgICAgbm9kZTogbm9kZSxcclxuICAgICAgLy8gICAgIHJlYXNvbmluZzogdGhpcy5yZWFzb25pbmcsXHJcbiAgICAgIC8vICAgICBjb2RlczogdGhpcy5yZWFzb25pbmdDb2Rlc1xyXG4gICAgICAvLyAgIH0sXHJcbiAgICAgIC8vIH0pO1xyXG4gICAgICAvLyBkaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgLy8gICBpZiAocmVzdWx0Lm9rKSB7XHJcbiAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcIlRPRE86IHByb21wdCByZWFzb24gYWQgc2F2ZSBpdCBpbiBhIGNvbnN0cnVjdFwiKTtcclxuICAgICAgLy8gICAgIHRoaXMudHJhbnNmb3JtZWREYXRhLnNwbGljZSh0aGlzLnRyYW5zZm9ybWVkRGF0YS5pbmRleE9mKG5vZGUpLCAxKTtcclxuICAgICAgLy8gICAgIHRoaXMuY2hhbmdlUGVyZm9ybWVkKHt9KTtcclxuICAgICAgLy8gICB9XHJcbiAgICAgIC8vIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy50cmFuc2Zvcm1lZERhdGEuc3BsaWNlKHRoaXMudHJhbnNmb3JtZWREYXRhLmluZGV4T2Yobm9kZSksIDEpO1xyXG4gICAgICB0aGlzLmNoYW5nZVBlcmZvcm1lZCh7fSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoYXNDaGV2cm9uRG93bihjaGlsZCl7XHJcbiAgICByZXR1cm4gY2hpbGQgJiYgY2hpbGQuY2hpbGRyZW4gJiYgY2hpbGQuY2hpbGRyZW4ubGVuZ3RoID4gMCAmJiBjaGlsZC5leHBhbmRlZFxyXG4gIH1cclxuXHJcbiAgaGFzQ2hldnJvblJpZ2h0KGNoaWxkKSB7XHJcbiAgICByZXR1cm4gY2hpbGQgJiYgY2hpbGQuY2hpbGRyZW4gJiYgY2hpbGQuY2hpbGRyZW4ubGVuZ3RoICE9IDAgJiYgIWNoaWxkLmV4cGFuZGVkXHJcbiAgfVxyXG5cclxuXHRkcmFnRW5hYmxlZChldmVudDogRHJhZ0V2ZW50KSB7XHJcblx0XHRyZXR1cm4gIWV2ZW50Lm1lZGl1bS5pc1Jvb3QgJiYgKGV2ZW50Lm1lZGl1bS5uYW1lLmxlbmd0aCB8fCBldmVudC5tZWRpdW0udmFsdWUubGVuZ3RoKTtcclxuXHR9XHJcblx0ZHJvcEVuYWJsZWQoZXZlbnQ6IERyb3BFdmVudCkge1xyXG5cdFx0cmV0dXJuICFldmVudC5kZXN0aW5hdGlvbi5tZWRpdW0uaXNSb290O1xyXG5cdH1cclxuICBvbkRyYWdTdGFydChldmVudCkge1xyXG4gICAgLy8gdGhpcy5tYW5hZ2VyLnNldFNlbGVjdGVkTm9kZShldmVudC5tZWRpdW0pO1xyXG4gIH1cclxuXHJcbiAgb25EcmFnRW5kKGV2ZW50OiBEcm9wRXZlbnQpIHtcclxuICAgIGlmIChldmVudC5kZXN0aW5hdGlvbiAmJiBldmVudC5zb3VyY2UubWVkaXVtICE9PSBldmVudC5kZXN0aW5hdGlvbi5tZWRpdW0pIHtcclxuICAgICAgY29uc3Qgc291cmNlSW5kZXggPSB0aGlzLnRyYW5zZm9ybWVkRGF0YS5pbmRleE9mKGV2ZW50LnNvdXJjZS5tZWRpdW0pO1xyXG5cclxuICAgICAgaWYodGhpcy5yZWFzb25pbmcpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImFkc2FkYXNcIilcclxuICAgICAgICAvLyBsZXQgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihGcmVlSnNvbkRpYWxvZywge1xyXG4gICAgICAgIC8vICAgZGF0YTogeyBcclxuICAgICAgICAvLyAgICAgYWN0aW9uOiAnZHJhZycsXHJcbiAgICAgICAgLy8gICAgIGZyb206IHNvdXJjZUluZGV4LFxyXG4gICAgICAgIC8vICAgICByZWFzb25pbmc6IHRoaXMucmVhc29uaW5nLFxyXG4gICAgICAgIC8vICAgICBjb2RlczogdGhpcy5yZWFzb25pbmdDb2Rlc1xyXG4gICAgICAgIC8vICAgfSxcclxuICAgICAgICAvLyB9KTtcclxuICAgICAgICAvLyBkaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgICAvLyAgIGlmIChyZXN1bHQub2spIHtcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCJUT0RPOiBwcm9tcHQgcmVhc29uIGFkIHNhdmUgaXQgaW4gYSBjb25zdHJ1Y3RcIik7XHJcbiAgICAgICAgLy8gICAgIHRoaXMudHJhbnNmb3JtZWREYXRhLnNwbGljZShzb3VyY2VJbmRleCwgMSk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuY2hhbmdlUGVyZm9ybWVkKHt9KTtcclxuICAgICAgICAvLyAgIH1cclxuICAgICAgICAvLyB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybWVkRGF0YS5zcGxpY2Uoc291cmNlSW5kZXgsIDEpO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlUGVyZm9ybWVkKHt9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25Ecm9wKGV2ZW50KXtcclxuICAgIGlmIChldmVudC5kZXN0aW5hdGlvbiAmJiBldmVudC5zb3VyY2UgJiYgZXZlbnQuc291cmNlLm1lZGl1bSAhPT0gZXZlbnQuZGVzdGluYXRpb24ubWVkaXVtKSB7XHJcbiAgICAgIGNvbnN0IHNvdXJjZU5vZGUgPSBldmVudC5zb3VyY2UubWVkaXVtO1xyXG4gICAgICBjb25zdCBkZXN0aW5hdGlvbk5vZGUgPSBldmVudC5kZXN0aW5hdGlvbi5tZWRpdW07XHJcbiAgXHJcbiAgICAgIGRlc3RpbmF0aW9uTm9kZS5jaGlsZHJlbiA9IFsuLi5kZXN0aW5hdGlvbk5vZGUuY2hpbGRyZW4sIHNvdXJjZU5vZGVdO1xyXG4gICAgICBpZiAoZGVzdGluYXRpb25Ob2RlLmNoaWxkcmVuLmxlbmd0aCkge1xyXG4gICAgICAgIGRlc3RpbmF0aW9uTm9kZS5leHBhbmRlZCA9IHRydWU7XHJcbiAgICAgIH0gICAgXHJcbiAgICAgIGlmIChkZXN0aW5hdGlvbk5vZGUudHlwZSA9PT0gTm9kZVR5cGUubGl0ZXJhbCkge1xyXG4gICAgICAgIGRlc3RpbmF0aW9uTm9kZS50eXBlID0gTm9kZVR5cGUuanNvbjtcclxuICAgICAgICBkZXN0aW5hdGlvbk5vZGUudmFsdWU9IFwiXCI7XHJcbiAgICAgIH0gZWxzZSBpZiAoZGVzdGluYXRpb25Ob2RlLnR5cGUgPT09IE5vZGVUeXBlLnBhaXIpIHtcclxuICAgICAgICBkZXN0aW5hdGlvbk5vZGUudHlwZSA9IE5vZGVUeXBlLmpzb247XHJcbiAgICAgIH0gZWxzZSBpZiAoZGVzdGluYXRpb25Ob2RlLnR5cGUgPT09IE5vZGVUeXBlLmFycmF5KSB7XHJcbiAgICAgICAgaWYgKGRlc3RpbmF0aW9uTm9kZS5wYXJlbnQgPT09IE5vZGVUeXBlLmFycmF5ICYmIHNvdXJjZU5vZGUudHlwZSA9PT0gTm9kZVR5cGUucGFpcikge1xyXG4gICAgICAgICAgc291cmNlTm9kZS50eXBlID0gTm9kZVR5cGUuanNvbjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgc291cmNlTm9kZS5wYXJlbnQgPSBkZXN0aW5hdGlvbk5vZGUudHlwZTtcclxuXHJcbiAgICAgIGNvbnN0IGkgPSBzb3VyY2VOb2RlLnBhcmVudE5vZGUuY2hpbGRyZW4uaW5kZXhPZihzb3VyY2VOb2RlKTtcclxuICAgICAgc291cmNlTm9kZS5wYXJlbnROb2RlLmNoaWxkcmVuLnNwbGljZShpLCAxKTtcclxuICAgICAgc291cmNlTm9kZS5wYXJlbnROb2RlID0gZGVzdGluYXRpb25Ob2RlO1xyXG4gICAgICB0aGlzLmNoYW5nZVBlcmZvcm1lZCh7fSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0b0dyYW5kUGFyZW50KGV2ZW50LCBjaGlsZCkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIGNvbnN0IHBhcmVudCA9ICBjaGlsZC5wYXJlbnROb2RlO1xyXG4gICAgY29uc3QgZ3JhbmRQYXJlbnQgPSAgY2hpbGQucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xyXG4gICAgY29uc3QgaSA9IHBhcmVudC5jaGlsZHJlbi5pbmRleE9mKGNoaWxkKTtcclxuICAgIGNvbnN0IHAgPSBncmFuZFBhcmVudC5jaGlsZHJlbi5pbmRleE9mKHBhcmVudCk7XHJcblxyXG4gICAgcGFyZW50LmNoaWxkcmVuLnNwbGljZShpLCAxKTtcclxuXHJcbiAgICBpZiAocGFyZW50LmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBpZiAoIXBhcmVudC5uYW1lLmxlbmd0aCAmJiAhcGFyZW50LnZhbHVlLmxlbmd0aCkge1xyXG4gICAgICAgIGdyYW5kUGFyZW50LmNoaWxkcmVuLnNwbGljZShwLCAxKTtcclxuICAgICAgICBncmFuZFBhcmVudC5jaGlsZHJlbi5zcGxpY2UocCwgMCwgY2hpbGQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHBhcmVudC50eXBlID0gTm9kZVR5cGUucGFpcjtcclxuICAgICAgICBncmFuZFBhcmVudC5jaGlsZHJlbi5zcGxpY2UocCArIDEsIDAsIGNoaWxkKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZ3JhbmRQYXJlbnQuY2hpbGRyZW4uc3BsaWNlKHAgKyAxLCAwLCBjaGlsZCk7XHJcbiAgICB9XHJcbiAgICBjaGlsZC5wYXJlbnROb2RlID0gZ3JhbmRQYXJlbnQ7XHJcbiAgICB0aGlzLmNoYW5nZVBlcmZvcm1lZCh7fSk7XHJcbiAgfVxyXG5cclxuICBnZXRGaWx0ZXJlZFRleHQoKXtcclxuICAgIHRoaXMubWFuYWdlci5nZXRGaWx0ZXJlZFRleHQoKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZShldmVudCwgY2hpbGQpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNoaWxkLmV4cGFuZGVkID0gIWNoaWxkLmV4cGFuZGVkO1xyXG4gIH1cclxuXHJcbiAga2V5ZG93bihldmVudCwgaXRlbSkge1xyXG4gICAgY29uc3QgY29kZSA9IGV2ZW50LndoaWNoO1xyXG4gICAgaWYgKChjb2RlID09PSAxMykgfHwgKGNvZGUgPT09IDMyKSkge1xyXG5cdFx0XHR0aGlzLnRvZ2dsZShldmVudCwgaXRlbSk7XHJcblx0XHR9XHJcbiAgfVxyXG4gIGtleW1vdmUoZXZlbnQsIGl0ZW0sIG1vdmVVcCkge1xyXG4gICAgY29uc3QgY29kZSA9IGV2ZW50LndoaWNoO1xyXG4gICAgaWYgKChjb2RlID09PSAxMykgfHwgKGNvZGUgPT09IDMyKSkge1xyXG4gICAgICB0aGlzLm1vdmVOb2RlKGV2ZW50LCBpdGVtLCBtb3ZlVXApO1xyXG4gICAgfVxyXG4gIH1cclxuICBrZXlkZWxldGUoZXZlbnQsIGl0ZW0pIHtcclxuICAgIGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcclxuICAgIGlmICgoY29kZSA9PT0gMTMpIHx8IChjb2RlID09PSAzMikpIHtcclxuXHRcdFx0dGhpcy5kZWxldGVOb2RlKGV2ZW50LCBpdGVtKTtcclxuXHRcdH1cclxuICB9XHJcbiAga2V5dG9HcmFuZFBhcmVudChldmVudCwgaXRlbSkge1xyXG4gICAgY29uc3QgY29kZSA9IGV2ZW50LndoaWNoO1xyXG4gICAgaWYgKChjb2RlID09PSAxMykgfHwgKGNvZGUgPT09IDMyKSkge1xyXG5cdFx0XHR0aGlzLnRvR3JhbmRQYXJlbnQoZXZlbnQsIGl0ZW0pO1xyXG5cdFx0fVxyXG4gIH1cclxuICBrZXlhZGQoZXZlbnQsIGl0ZW0pIHtcclxuICAgIGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcclxuICAgIGlmICgoY29kZSA9PT0gMTMpIHx8IChjb2RlID09PSAzMikpIHtcclxuXHRcdFx0dGhpcy5hZGROZXdOb2RlKGV2ZW50LCBpdGVtKTtcclxuXHRcdH1cclxuICB9XHJcbiAgY2FuQWRkTm9kZShub2RlKSB7XHJcbiAgICByZXR1cm4gKG5vZGUudHlwZSA9PT0gTm9kZVR5cGUuanNvbikgfHwgKG5vZGUudHlwZSA9PT0gTm9kZVR5cGUuYXJyYXkpO1xyXG4gIH1cclxuICBjaGFuZ2VQZXJmb3JtZWQoZXZlbnQpIHtcclxuICAgIGlmICh0aGlzLmNoaWxkcmVuKSB7XHJcbiAgICAgIGNvbnN0IHNhdmVkTm9kZSA9IHRoaXMudHJhbnNmb3JtZWRJbnRlcm5hbFN0cnVjdHVyZUJhY2tUb05vZGUodGhpcy50cmFuc2Zvcm1lZERhdGFbMF0uY2hpbGRyZW4sIE5vZGVUeXBlLmpzb24pO1xyXG4gICAgICB0aGlzLm9uY2hhbmdlLmVtaXQoe1xyXG4gICAgICAgIGRhdGE6IHNhdmVkTm9kZSxcclxuICAgICAgICByZWFzb25pbmc6IHRoaXMucmVhc29uaW5nXHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5vbmNoYW5nZS5lbWl0KHt9KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19