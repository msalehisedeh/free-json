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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9mcmVlLWpzb24vIiwic291cmNlcyI6WyJzcmMvYXBwL2ZyZWUtanNvbi9jb21wb25lbnRzL2pzb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUcvRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFHMUQsT0FBTyxFQUFRLFFBQVEsRUFBeUIsTUFBTSw4QkFBOEIsQ0FBQzs7SUFrRW5GLDJCQUNTO1FBQUEsWUFBTyxHQUFQLE9BQU87OEJBaERXLEVBQUU7eUJBd0NqQixJQUFJLFlBQVksRUFBRTt3QkFHbkIsSUFBSSxZQUFZLEVBQUU7S0FRNUI7SUFqREQsc0JBQ0ksbUNBQUk7Ozs7UUFxQlI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUN4Qjs7Ozs7UUF4QkQsVUFDUyxJQUFXO1lBQ2xCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztpQkFDckI7O2dCQUNELElBQU0sUUFBTSxHQUFTO29CQUNuQixFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUU7b0JBQ2pDLElBQUksRUFBRSxNQUFNO29CQUNaLEtBQUssRUFBRSxRQUFRO29CQUNmLE1BQU0sRUFBRSxRQUFRLENBQUMsS0FBSztvQkFDdEIsSUFBSSxFQUFFLFFBQVEsQ0FBQyxLQUFLO29CQUNwQixRQUFRLEVBQUUsSUFBSTtvQkFDZCxRQUFRLEVBQUUsU0FBUztvQkFDbkIs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OzJCQUdsQixNQUFNLFNBQUMsVUFBVTs7NEJBbkVwQjs7U0FjYSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERyb3BFdmVudCwgRHJhZ0V2ZW50IH0gZnJvbSAnZHJhZy1lbmFibGVkJztcclxuXHJcbmltcG9ydCB7IE5vZGVNYW5hZ2VyIH0gZnJvbSAnLi4vaW5qZWN0YWJsZXMvbm9kZS1tYW5hZ2VyJztcclxuaW1wb3J0IHsgRnJlZUpzb25TZWFyY2ggfSBmcm9tICcuLi9waXBlcy9qc29uLXNlYXJjaCc7XHJcbmltcG9ydCB7IEZyZWVKc29uTGFiZWwgfSBmcm9tICcuL2pzb24tbGFiZWwuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTm9kZSwgTm9kZVR5cGUsIFJlYXNvbmluZywgQWN0aW9uVHlwZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvbm9kZS5pbnRlcmZhY2UnO1xyXG4vL2ltcG9ydCB7IEZyZWVKc29uRGlhbG9nIH0gZnJvbSAnLi9qc29uLWRpYWxvZy5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdmcmVlLWpzb24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9qc29uLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9qc29uLmNvbXBvbmVudC5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGcmVlSnNvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIGNoaWxkcmVuO1xyXG4gIFxyXG4gIEBJbnB1dChcInRyYW5zZm9ybWVkRGF0YVwiKVxyXG4gIHRyYW5zZm9ybWVkRGF0YTtcclxuICBcclxuICBASW5wdXQoXCJyZWFzb25pbmdcIilcclxuICByZWFzb25pbmc6IFJlYXNvbmluZ1tdO1xyXG5cclxuICBASW5wdXQoXCJyZWFzb25pbmdDb2Rlc1wiKVxyXG4gIHJlYXNvbmluZ0NvZGVzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCByb290KG5vZGUgOiBOb2RlICl7XHJcbiAgICBpZiAobm9kZSkge1xyXG4gICAgICB0aGlzLmNoaWxkcmVuID0gbm9kZTtcclxuICAgICAgaWYgKHRoaXMucmVhc29uaW5nKSB7XHJcbiAgICAgICAgdGhpcy5yZWFzb25pbmcgPSBbXTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBwYXJlbnQ6IE5vZGUgPSB7XHJcbiAgICAgICAgaWQ6IHRoaXMubWFuYWdlci5nZW5lcmF0ZU5vZGVJZCgpLFxyXG4gICAgICAgIG5hbWU6IFwiUm9vdFwiLFxyXG4gICAgICAgIHZhbHVlOiBcIk9iamVjdFwiLFxyXG4gICAgICAgIHBhcmVudDogTm9kZVR5cGUuYXJyYXksXHJcbiAgICAgICAgdHlwZTogTm9kZVR5cGUuYXJyYXksXHJcbiAgICAgICAgZXhwYW5kZWQ6IHRydWUsXHJcbiAgICAgICAgY2hpbGRyZW46IHVuZGVmaW5lZCxcclxuICAgICAgICBpc1Jvb3Q6IHRydWVcclxuICAgICAgfVxyXG4gICAgICBwYXJlbnQuY2hpbGRyZW4gPSB0aGlzLnRyYW5zZm9ybU5vZGVUb0ludGVybmFsU3RydWN0aW9uKHRoaXMuY2hpbGRyZW4sIHBhcmVudClcclxuXHJcbiAgICAgIHRoaXMudHJhbnNmb3JtZWREYXRhID0gWyBwYXJlbnQgXTtcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0IHJvb3QoKTogTm9kZXtcclxuICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW47XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBzYXZlKGZsYWcgOiBib29sZWFuICl7XHJcbiAgICAgIGlmIChmbGFnKSB7XHJcbiAgICAgICAgY29uc3Qgc2F2ZWROb2RlID0gdGhpcy50cmFuc2Zvcm1lZEludGVybmFsU3RydWN0dXJlQmFja1RvTm9kZSh0aGlzLnRyYW5zZm9ybWVkRGF0YVswXS5jaGlsZHJlbiwgTm9kZVR5cGUuanNvbik7XHJcbiAgICAgICAgdGhpcy5vbnB1Ymxpc2guZW1pdChzYXZlZE5vZGUpXHJcbiAgICAgIH1cclxuICB9XHJcbiAgZ2V0IHNhdmUoKXtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgQE91dHB1dChcIm9ucHVibGlzaFwiKVxyXG4gIG9ucHVibGlzaCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBcclxuICBAT3V0cHV0KFwib25jaGFuZ2VcIilcclxuICBvbmNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBcclxuICBleHBhbmRlZDpCb29sZWFuO1xyXG4gIFxyXG4gIGNvbnN0cnVjdG9yKFxyXG5cdCAgcHJpdmF0ZSBtYW5hZ2VyOk5vZGVNYW5hZ2VyXHJcblx0KSB7XHJcblx0ICBcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdHJhbnNmb3JtZWRJbnRlcm5hbFN0cnVjdHVyZUJhY2tUb05vZGUoIHJvb3QsIHBhcmVudCApIHtcclxuICAgIGxldCBqc29uID0ge307XHJcbiAgICBsZXQgYXJyYXkgPSBbXTtcclxuXHJcbiAgICByb290Lm1hcCggKGl0ZW06IE5vZGUpID0+IHtcclxuICAgICAgaWYgKHBhcmVudCA9PT0gTm9kZVR5cGUuanNvbikgeyAgICAgICAgXHJcbiAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gTm9kZVR5cGUubGl0ZXJhbCkge1xyXG4gICAgICAgICAgYXJyYXkucHVzaChpdGVtLnZhbHVlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gTm9kZVR5cGUucGFpcikge1xyXG4gICAgICAgICAganNvbltpdGVtLm5hbWVdID0gaXRlbS52YWx1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gTm9kZVR5cGUuYXJyYXkpIHtcclxuICAgICAgICAgIGpzb25baXRlbS5uYW1lXSA9IHRoaXMudHJhbnNmb3JtZWRJbnRlcm5hbFN0cnVjdHVyZUJhY2tUb05vZGUoaXRlbS5jaGlsZHJlbiwgaXRlbS5wYXJlbnQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSBOb2RlVHlwZS5qc29uKSB7XHJcbiAgICAgICAgICBqc29uW2l0ZW0ubmFtZV0gPSB0aGlzLnRyYW5zZm9ybWVkSW50ZXJuYWxTdHJ1Y3R1cmVCYWNrVG9Ob2RlKGl0ZW0uY2hpbGRyZW4sIGl0ZW0ucGFyZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAocGFyZW50ID09PSBOb2RlVHlwZS5hcnJheSl7XHJcbiAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gTm9kZVR5cGUubGl0ZXJhbCkge1xyXG4gICAgICAgICAgYXJyYXkucHVzaChpdGVtLnZhbHVlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gTm9kZVR5cGUuanNvbikge1xyXG4gICAgICAgICAgYXJyYXkucHVzaCh0aGlzLnRyYW5zZm9ybWVkSW50ZXJuYWxTdHJ1Y3R1cmVCYWNrVG9Ob2RlKGl0ZW0sIGl0ZW0ucGFyZW50KSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09IE5vZGVUeXBlLmFycmF5KSB7XHJcbiAgICAgICAgICBhcnJheS5wdXNoKHRoaXMudHJhbnNmb3JtZWRJbnRlcm5hbFN0cnVjdHVyZUJhY2tUb05vZGUoaXRlbS5jaGlsZHJlbiwgaXRlbS5wYXJlbnQpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGFycmF5Lmxlbmd0aCA/IGFycmF5IDoganNvbjtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdHJhbnNmb3JtTm9kZVRvSW50ZXJuYWxTdHJ1Y3Rpb24obm9kZSwgcGFyZW50OiBOb2RlKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gbm9kZTtcclxuICAgIGlmIChub2RlIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgY29uc3QgY2hpbGRyZW46IE5vZGVbXSA9IFtdO1xyXG4gICAgICBub2RlLm1hcCggKGl0ZW0pID0+IHtcclxuICAgICAgICBjb25zdCBzdWJOb2RlOiBOb2RlID0ge1xyXG4gICAgICAgICAgaWQ6IHRoaXMubWFuYWdlci5nZW5lcmF0ZU5vZGVJZCgpLFxyXG4gICAgICAgICAgbmFtZTogXCJcIixcclxuICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgcGFyZW50OiBOb2RlVHlwZS5hcnJheSxcclxuICAgICAgICAgIHBhcmVudE5vZGU6IHBhcmVudCxcclxuICAgICAgICAgIHR5cGU6IE5vZGVUeXBlLmFycmF5LFxyXG4gICAgICAgICAgY2hpbGRyZW46IFtdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGpzb25WYWx1ZTogYW55ID0gdGhpcy50cmFuc2Zvcm1Ob2RlVG9JbnRlcm5hbFN0cnVjdGlvbihpdGVtLCBzdWJOb2RlKTtcclxuICAgICAgICBpZiAoanNvblZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgIHN1Yk5vZGUuY2hpbGRyZW4gPSBqc29uVmFsdWU7XHJcbiAgICAgICAgICBjaGlsZHJlbi5wdXNoKHN1Yk5vZGUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzdWJOb2RlLnZhbHVlID0ganNvblZhbHVlO1xyXG4gICAgICAgICAgc3ViTm9kZS50eXBlID0gTm9kZVR5cGUubGl0ZXJhbDtcclxuICAgICAgICAgIGNoaWxkcmVuLnB1c2goc3ViTm9kZSk7XHJcbiAgICAgICAgfSAgICAgIFxyXG4gICAgICB9KTtcclxuICAgICAgcmVzdWx0ID0gY2hpbGRyZW47XHJcbiAgICB9IGVsc2UgaWYgKG5vZGUgaW5zdGFuY2VvZiBPYmplY3QpIHtcclxuICAgICAgY29uc3QgbGlzdCA9IE9iamVjdC5rZXlzKG5vZGUpO1xyXG4gICAgICBjb25zdCBjaGlsZHJlbjogTm9kZVtdID0gW107XHJcbiAgICAgIGxpc3QubWFwKCAoaXRlbSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHN1Yk5vZGU6IE5vZGUgPSB7XHJcbiAgICAgICAgICBpZDogdGhpcy5tYW5hZ2VyLmdlbmVyYXRlTm9kZUlkKCksXHJcbiAgICAgICAgICBuYW1lOiBpdGVtLFxyXG4gICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICBwYXJlbnQ6IE5vZGVUeXBlLmpzb24sXHJcbiAgICAgICAgICBwYXJlbnROb2RlOiBwYXJlbnQsXHJcbiAgICAgICAgICB0eXBlOiBOb2RlVHlwZS5hcnJheSxcclxuICAgICAgICAgIGNoaWxkcmVuOiBbXVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBqc29uVmFsdWU6IGFueSA9IHRoaXMudHJhbnNmb3JtTm9kZVRvSW50ZXJuYWxTdHJ1Y3Rpb24obm9kZVtpdGVtXSwgc3ViTm9kZSk7XHJcbiAgICAgICAgaWYgKGpzb25WYWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICBzdWJOb2RlLmNoaWxkcmVuID0ganNvblZhbHVlO1xyXG4gICAgICAgICAgY2hpbGRyZW4ucHVzaChzdWJOb2RlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3ViTm9kZS52YWx1ZSA9IGpzb25WYWx1ZTtcclxuICAgICAgICAgIHN1Yk5vZGUudHlwZSA9IE5vZGVUeXBlLnBhaXI7XHJcbiAgICAgICAgICBjaGlsZHJlbi5wdXNoKHN1Yk5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHJlc3VsdCA9IGNoaWxkcmVuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuXHJcbiAgYWRkTmV3Tm9kZShldmVudCwgbm9kZSkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIGlmKHRoaXMucmVhc29uaW5nKSB7XHJcbiAgICAgIC8vIGxldCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKEZyZWVKc29uRGlhbG9nLCB7XHJcbiAgICAgIC8vICAgZGF0YTogeyBcclxuICAgICAgLy8gICAgIGFjdGlvbjogJ2FkZCcsXHJcbiAgICAgIC8vICAgICBub2RlOiBub2RlLFxyXG4gICAgICAvLyAgICAgcmVhc29uaW5nOiB0aGlzLnJlYXNvbmluZyxcclxuICAgICAgLy8gICAgIGNvZGVzOiB0aGlzLnJlYXNvbmluZ0NvZGVzXHJcbiAgICAgIC8vICAgfSxcclxuICAgICAgLy8gfSk7XHJcbiAgICAgIC8vIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICAvLyAgIGlmIChyZXN1bHQub2spIHtcclxuICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiVE9ETzogcG9wdXAgd2lsbCBzZXQgbm9kZSB0eXBlXCIpO1xyXG4gICAgICAvLyAgICAgY29uc3QgdHlwZSA9IHJlc3VsdC5ub3RlVHlwZTtcclxuICAgICAgLy8gICAgIG5vZGUuY2hpbGRyZW4gPSBbLi4ubm9kZS5jaGlsZHJlbiwgdGhpcy5tYW5hZ2VyLmdldE5ld05vZGUobm9kZSldO1xyXG4gICAgICAvLyAgICAgbm9kZS5leHBhbmRlZCA9IHRydWU7XHJcbiAgICAgIC8vICAgICB0aGlzLmNoYW5nZVBlcmZvcm1lZCh7fSk7XHJcbiAgICAgIC8vICAgfVxyXG4gICAgICAvLyB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG5vZGUuY2hpbGRyZW4gPSBbLi4ubm9kZS5jaGlsZHJlbiwgdGhpcy5tYW5hZ2VyLmdldE5ld05vZGUobm9kZSldO1xyXG4gICAgICBub2RlLmV4cGFuZGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5jaGFuZ2VQZXJmb3JtZWQoe30pO1xyXG4gICAgfVxyXG4gIH1cclxuICBtb3ZlTm9kZShldmVudCwgbm9kZSwgbW92ZVVwKSB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgaWYodGhpcy5yZWFzb25pbmcpIHtcclxuICAgICAgLy8gbGV0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oRnJlZUpzb25EaWFsb2csIHtcclxuICAgICAgLy8gICBkYXRhOiB7IFxyXG4gICAgICAvLyAgICAgYWN0aW9uOiAnbW92ZScsXHJcbiAgICAgIC8vICAgICBmcm9tOiB0aGlzLnRyYW5zZm9ybWVkRGF0YS5pbmRleE9mKG5vZGUpLFxyXG4gICAgICAvLyAgICAgZGlyZWN0aW9uOiBtb3ZlVXAsXHJcbiAgICAgIC8vICAgICBub2RlOiBub2RlLFxyXG4gICAgICAvLyAgICAgcmVhc29uaW5nOiB0aGlzLnJlYXNvbmluZyxcclxuICAgICAgLy8gICAgIGNvZGVzOiB0aGlzLnJlYXNvbmluZ0NvZGVzXHJcbiAgICAgIC8vICAgfSxcclxuICAgICAgLy8gfSk7XHJcbiAgICAgIC8vIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICAvLyAgIGlmIChyZXN1bHQub2spIHtcclxuICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiVE9ETzogcG9wdXAgd2lsbCBnaXZlIGluZGV4IHRvIGdvIHRvXCIpO1xyXG4gICAgICAvLyAgICAgbGV0IGZyb20gPSByZXN1bHQuZnJvbTtcclxuICAgICAgLy8gICAgIGxldCB0byA9IG1vdmVVcCA/IFxyXG4gICAgICAvLyAgICAgICAgICAgICAgIChmcm9tID4gMCA/IGZyb20gLSAxIDogZnJvbSkgOiBcclxuICAgICAgLy8gICAgICAgICAgICAgICAoZnJvbSA8ICh0aGlzLnRyYW5zZm9ybWVkRGF0YS5sZW5ndGggLSAxKSA/IGZyb20gKyAxIDogZnJvbSk7XHJcbiAgICAgIFxyXG4gICAgICAvLyAgICAgdGhpcy50cmFuc2Zvcm1lZERhdGEuc3BsaWNlKHRvLCAwLCB0aGlzLnRyYW5zZm9ybWVkRGF0YS5zcGxpY2UoZnJvbSwgMSlbMF0pO1xyXG4gICAgICAvLyAgICAgdGhpcy5jaGFuZ2VQZXJmb3JtZWQoe30pO1xyXG4gICAgICAvLyAgIH1cclxuICAgICAgLy8gfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgZnJvbSA9IHRoaXMudHJhbnNmb3JtZWREYXRhLmluZGV4T2Yobm9kZSk7XHJcbiAgICAgIGxldCB0byA9IG1vdmVVcCA/IFxyXG4gICAgICAgICAgICAgICAgKGZyb20gPiAwID8gZnJvbSAtIDEgOiBmcm9tKSA6IFxyXG4gICAgICAgICAgICAgICAgKGZyb20gPCAodGhpcy50cmFuc2Zvcm1lZERhdGEubGVuZ3RoIC0gMSkgPyBmcm9tICsgMSA6IGZyb20pO1xyXG4gIFxyXG4gICAgICB0aGlzLnRyYW5zZm9ybWVkRGF0YS5zcGxpY2UodG8sIDAsIHRoaXMudHJhbnNmb3JtZWREYXRhLnNwbGljZShmcm9tLCAxKVswXSk7XHJcbiAgICAgIHRoaXMuY2hhbmdlUGVyZm9ybWVkKHt9KTtcclxuICAgIH1cclxuICB9XHJcbiAgZGVsZXRlTm9kZShldmVudCwgbm9kZSkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgaWYodGhpcy5yZWFzb25pbmcpIHtcclxuICAgICAgLy8gbGV0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oRnJlZUpzb25EaWFsb2csIHtcclxuICAgICAgLy8gICBkYXRhOiB7IFxyXG4gICAgICAvLyAgICAgYWN0aW9uOiAncmVtb3ZlJyxcclxuICAgICAgLy8gICAgIG5vZGU6IG5vZGUsXHJcbiAgICAgIC8vICAgICByZWFzb25pbmc6IHRoaXMucmVhc29uaW5nLFxyXG4gICAgICAvLyAgICAgY29kZXM6IHRoaXMucmVhc29uaW5nQ29kZXNcclxuICAgICAgLy8gICB9LFxyXG4gICAgICAvLyB9KTtcclxuICAgICAgLy8gZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgIC8vICAgaWYgKHJlc3VsdC5vaykge1xyXG4gICAgICAvLyAgICAgY29uc29sZS5sb2coXCJUT0RPOiBwcm9tcHQgcmVhc29uIGFkIHNhdmUgaXQgaW4gYSBjb25zdHJ1Y3RcIik7XHJcbiAgICAgIC8vICAgICB0aGlzLnRyYW5zZm9ybWVkRGF0YS5zcGxpY2UodGhpcy50cmFuc2Zvcm1lZERhdGEuaW5kZXhPZihub2RlKSwgMSk7XHJcbiAgICAgIC8vICAgICB0aGlzLmNoYW5nZVBlcmZvcm1lZCh7fSk7XHJcbiAgICAgIC8vICAgfVxyXG4gICAgICAvLyB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudHJhbnNmb3JtZWREYXRhLnNwbGljZSh0aGlzLnRyYW5zZm9ybWVkRGF0YS5pbmRleE9mKG5vZGUpLCAxKTtcclxuICAgICAgdGhpcy5jaGFuZ2VQZXJmb3JtZWQoe30pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGFzQ2hldnJvbkRvd24oY2hpbGQpe1xyXG4gICAgcmV0dXJuIGNoaWxkICYmIGNoaWxkLmNoaWxkcmVuICYmIGNoaWxkLmNoaWxkcmVuLmxlbmd0aCA+IDAgJiYgY2hpbGQuZXhwYW5kZWRcclxuICB9XHJcblxyXG4gIGhhc0NoZXZyb25SaWdodChjaGlsZCkge1xyXG4gICAgcmV0dXJuIGNoaWxkICYmIGNoaWxkLmNoaWxkcmVuICYmIGNoaWxkLmNoaWxkcmVuLmxlbmd0aCAhPSAwICYmICFjaGlsZC5leHBhbmRlZFxyXG4gIH1cclxuXHJcblx0ZHJhZ0VuYWJsZWQoZXZlbnQ6IERyYWdFdmVudCkge1xyXG5cdFx0cmV0dXJuICFldmVudC5tZWRpdW0uaXNSb290ICYmIChldmVudC5tZWRpdW0ubmFtZS5sZW5ndGggfHwgZXZlbnQubWVkaXVtLnZhbHVlLmxlbmd0aCk7XHJcblx0fVxyXG5cdGRyb3BFbmFibGVkKGV2ZW50OiBEcm9wRXZlbnQpIHtcclxuXHRcdHJldHVybiAhZXZlbnQuZGVzdGluYXRpb24ubWVkaXVtLmlzUm9vdDtcclxuXHR9XHJcbiAgb25EcmFnU3RhcnQoZXZlbnQpIHtcclxuICAgIC8vIHRoaXMubWFuYWdlci5zZXRTZWxlY3RlZE5vZGUoZXZlbnQubWVkaXVtKTtcclxuICB9XHJcblxyXG4gIG9uRHJhZ0VuZChldmVudDogRHJvcEV2ZW50KSB7XHJcbiAgICBpZiAoZXZlbnQuZGVzdGluYXRpb24gJiYgZXZlbnQuc291cmNlLm1lZGl1bSAhPT0gZXZlbnQuZGVzdGluYXRpb24ubWVkaXVtKSB7XHJcbiAgICAgIGNvbnN0IHNvdXJjZUluZGV4ID0gdGhpcy50cmFuc2Zvcm1lZERhdGEuaW5kZXhPZihldmVudC5zb3VyY2UubWVkaXVtKTtcclxuXHJcbiAgICAgIGlmKHRoaXMucmVhc29uaW5nKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJhZHNhZGFzXCIpXHJcbiAgICAgICAgLy8gbGV0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oRnJlZUpzb25EaWFsb2csIHtcclxuICAgICAgICAvLyAgIGRhdGE6IHsgXHJcbiAgICAgICAgLy8gICAgIGFjdGlvbjogJ2RyYWcnLFxyXG4gICAgICAgIC8vICAgICBmcm9tOiBzb3VyY2VJbmRleCxcclxuICAgICAgICAvLyAgICAgcmVhc29uaW5nOiB0aGlzLnJlYXNvbmluZyxcclxuICAgICAgICAvLyAgICAgY29kZXM6IHRoaXMucmVhc29uaW5nQ29kZXNcclxuICAgICAgICAvLyAgIH0sXHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgLy8gZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgLy8gICBpZiAocmVzdWx0Lm9rKSB7XHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiVE9ETzogcHJvbXB0IHJlYXNvbiBhZCBzYXZlIGl0IGluIGEgY29uc3RydWN0XCIpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLnRyYW5zZm9ybWVkRGF0YS5zcGxpY2Uoc291cmNlSW5kZXgsIDEpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLmNoYW5nZVBlcmZvcm1lZCh7fSk7XHJcbiAgICAgICAgLy8gICB9XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm1lZERhdGEuc3BsaWNlKHNvdXJjZUluZGV4LCAxKTtcclxuICAgICAgICB0aGlzLmNoYW5nZVBlcmZvcm1lZCh7fSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uRHJvcChldmVudCl7XHJcbiAgICBpZiAoZXZlbnQuZGVzdGluYXRpb24gJiYgZXZlbnQuc291cmNlICYmIGV2ZW50LnNvdXJjZS5tZWRpdW0gIT09IGV2ZW50LmRlc3RpbmF0aW9uLm1lZGl1bSkge1xyXG4gICAgICBjb25zdCBzb3VyY2VOb2RlID0gZXZlbnQuc291cmNlLm1lZGl1bTtcclxuICAgICAgY29uc3QgZGVzdGluYXRpb25Ob2RlID0gZXZlbnQuZGVzdGluYXRpb24ubWVkaXVtO1xyXG4gIFxyXG4gICAgICBkZXN0aW5hdGlvbk5vZGUuY2hpbGRyZW4gPSBbLi4uZGVzdGluYXRpb25Ob2RlLmNoaWxkcmVuLCBzb3VyY2VOb2RlXTtcclxuICAgICAgaWYgKGRlc3RpbmF0aW9uTm9kZS5jaGlsZHJlbi5sZW5ndGgpIHtcclxuICAgICAgICBkZXN0aW5hdGlvbk5vZGUuZXhwYW5kZWQgPSB0cnVlO1xyXG4gICAgICB9ICAgIFxyXG4gICAgICBpZiAoZGVzdGluYXRpb25Ob2RlLnR5cGUgPT09IE5vZGVUeXBlLmxpdGVyYWwpIHtcclxuICAgICAgICBkZXN0aW5hdGlvbk5vZGUudHlwZSA9IE5vZGVUeXBlLmpzb247XHJcbiAgICAgICAgZGVzdGluYXRpb25Ob2RlLnZhbHVlPSBcIlwiO1xyXG4gICAgICB9IGVsc2UgaWYgKGRlc3RpbmF0aW9uTm9kZS50eXBlID09PSBOb2RlVHlwZS5wYWlyKSB7XHJcbiAgICAgICAgZGVzdGluYXRpb25Ob2RlLnR5cGUgPSBOb2RlVHlwZS5qc29uO1xyXG4gICAgICB9IGVsc2UgaWYgKGRlc3RpbmF0aW9uTm9kZS50eXBlID09PSBOb2RlVHlwZS5hcnJheSkge1xyXG4gICAgICAgIGlmIChkZXN0aW5hdGlvbk5vZGUucGFyZW50ID09PSBOb2RlVHlwZS5hcnJheSAmJiBzb3VyY2VOb2RlLnR5cGUgPT09IE5vZGVUeXBlLnBhaXIpIHtcclxuICAgICAgICAgIHNvdXJjZU5vZGUudHlwZSA9IE5vZGVUeXBlLmpzb247XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHNvdXJjZU5vZGUucGFyZW50ID0gZGVzdGluYXRpb25Ob2RlLnR5cGU7XHJcblxyXG4gICAgICBjb25zdCBpID0gc291cmNlTm9kZS5wYXJlbnROb2RlLmNoaWxkcmVuLmluZGV4T2Yoc291cmNlTm9kZSk7XHJcbiAgICAgIHNvdXJjZU5vZGUucGFyZW50Tm9kZS5jaGlsZHJlbi5zcGxpY2UoaSwgMSk7XHJcbiAgICAgIHNvdXJjZU5vZGUucGFyZW50Tm9kZSA9IGRlc3RpbmF0aW9uTm9kZTtcclxuICAgICAgdGhpcy5jaGFuZ2VQZXJmb3JtZWQoe30pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdG9HcmFuZFBhcmVudChldmVudCwgY2hpbGQpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBjb25zdCBwYXJlbnQgPSAgY2hpbGQucGFyZW50Tm9kZTtcclxuICAgIGNvbnN0IGdyYW5kUGFyZW50ID0gIGNoaWxkLnBhcmVudE5vZGUucGFyZW50Tm9kZTtcclxuICAgIGNvbnN0IGkgPSBwYXJlbnQuY2hpbGRyZW4uaW5kZXhPZihjaGlsZCk7XHJcbiAgICBjb25zdCBwID0gZ3JhbmRQYXJlbnQuY2hpbGRyZW4uaW5kZXhPZihwYXJlbnQpO1xyXG5cclxuICAgIHBhcmVudC5jaGlsZHJlbi5zcGxpY2UoaSwgMSk7XHJcblxyXG4gICAgaWYgKHBhcmVudC5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcclxuICAgICAgaWYgKCFwYXJlbnQubmFtZS5sZW5ndGggJiYgIXBhcmVudC52YWx1ZS5sZW5ndGgpIHtcclxuICAgICAgICBncmFuZFBhcmVudC5jaGlsZHJlbi5zcGxpY2UocCwgMSk7XHJcbiAgICAgICAgZ3JhbmRQYXJlbnQuY2hpbGRyZW4uc3BsaWNlKHAsIDAsIGNoaWxkKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBwYXJlbnQudHlwZSA9IE5vZGVUeXBlLnBhaXI7XHJcbiAgICAgICAgZ3JhbmRQYXJlbnQuY2hpbGRyZW4uc3BsaWNlKHAgKyAxLCAwLCBjaGlsZCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGdyYW5kUGFyZW50LmNoaWxkcmVuLnNwbGljZShwICsgMSwgMCwgY2hpbGQpO1xyXG4gICAgfVxyXG4gICAgY2hpbGQucGFyZW50Tm9kZSA9IGdyYW5kUGFyZW50O1xyXG4gICAgdGhpcy5jaGFuZ2VQZXJmb3JtZWQoe30pO1xyXG4gIH1cclxuXHJcbiAgZ2V0RmlsdGVyZWRUZXh0KCl7XHJcbiAgICB0aGlzLm1hbmFnZXIuZ2V0RmlsdGVyZWRUZXh0KCk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGUoZXZlbnQsIGNoaWxkKSB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjaGlsZC5leHBhbmRlZCA9ICFjaGlsZC5leHBhbmRlZDtcclxuICB9XHJcblxyXG4gIGtleWRvd24oZXZlbnQsIGl0ZW0pIHtcclxuICAgIGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcclxuICAgIGlmICgoY29kZSA9PT0gMTMpIHx8IChjb2RlID09PSAzMikpIHtcclxuXHRcdFx0dGhpcy50b2dnbGUoZXZlbnQsIGl0ZW0pO1xyXG5cdFx0fVxyXG4gIH1cclxuICBrZXltb3ZlKGV2ZW50LCBpdGVtLCBtb3ZlVXApIHtcclxuICAgIGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcclxuICAgIGlmICgoY29kZSA9PT0gMTMpIHx8IChjb2RlID09PSAzMikpIHtcclxuICAgICAgdGhpcy5tb3ZlTm9kZShldmVudCwgaXRlbSwgbW92ZVVwKTtcclxuICAgIH1cclxuICB9XHJcbiAga2V5ZGVsZXRlKGV2ZW50LCBpdGVtKSB7XHJcbiAgICBjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcbiAgICBpZiAoKGNvZGUgPT09IDEzKSB8fCAoY29kZSA9PT0gMzIpKSB7XHJcblx0XHRcdHRoaXMuZGVsZXRlTm9kZShldmVudCwgaXRlbSk7XHJcblx0XHR9XHJcbiAgfVxyXG4gIGtleXRvR3JhbmRQYXJlbnQoZXZlbnQsIGl0ZW0pIHtcclxuICAgIGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcclxuICAgIGlmICgoY29kZSA9PT0gMTMpIHx8IChjb2RlID09PSAzMikpIHtcclxuXHRcdFx0dGhpcy50b0dyYW5kUGFyZW50KGV2ZW50LCBpdGVtKTtcclxuXHRcdH1cclxuICB9XHJcbiAga2V5YWRkKGV2ZW50LCBpdGVtKSB7XHJcbiAgICBjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcbiAgICBpZiAoKGNvZGUgPT09IDEzKSB8fCAoY29kZSA9PT0gMzIpKSB7XHJcblx0XHRcdHRoaXMuYWRkTmV3Tm9kZShldmVudCwgaXRlbSk7XHJcblx0XHR9XHJcbiAgfVxyXG4gIGNhbkFkZE5vZGUobm9kZSkge1xyXG4gICAgcmV0dXJuIChub2RlLnR5cGUgPT09IE5vZGVUeXBlLmpzb24pIHx8IChub2RlLnR5cGUgPT09IE5vZGVUeXBlLmFycmF5KTtcclxuICB9XHJcbiAgY2hhbmdlUGVyZm9ybWVkKGV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5jaGlsZHJlbikge1xyXG4gICAgICBjb25zdCBzYXZlZE5vZGUgPSB0aGlzLnRyYW5zZm9ybWVkSW50ZXJuYWxTdHJ1Y3R1cmVCYWNrVG9Ob2RlKHRoaXMudHJhbnNmb3JtZWREYXRhWzBdLmNoaWxkcmVuLCBOb2RlVHlwZS5qc29uKTtcclxuICAgICAgdGhpcy5vbmNoYW5nZS5lbWl0KHtcclxuICAgICAgICBkYXRhOiBzYXZlZE5vZGUsXHJcbiAgICAgICAgcmVhc29uaW5nOiB0aGlzLnJlYXNvbmluZ1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMub25jaGFuZ2UuZW1pdCh7fSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==