(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common'), require('@sedeh/drag-enabled')) :
    typeof define === 'function' && define.amd ? define('@sedeh/free-json', ['exports', '@angular/core', '@angular/forms', '@angular/common', '@sedeh/drag-enabled'], factory) :
    (global = global || self, factory((global.sedeh = global.sedeh || {}, global.sedeh['free-json'] = {}), global.ng.core, global.ng.forms, global.ng.common, global['drag-enabled']));
}(this, (function (exports, core, forms, common, dragEnabled) { 'use strict';

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
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    (function (NodeType) {
        NodeType[NodeType["literal"] = 1] = "literal";
        NodeType[NodeType["pair"] = 2] = "pair";
        NodeType[NodeType["json"] = 3] = "json";
        NodeType[NodeType["array"] = 4] = "array";
    })(exports.NodeType || (exports.NodeType = {}));

    (function (ActionType) {
        ActionType[ActionType["add"] = 1] = "add";
        ActionType[ActionType["remove"] = 2] = "remove";
        ActionType[ActionType["move"] = 3] = "move";
        ActionType[ActionType["modified"] = 4] = "modified";
    })(exports.ActionType || (exports.ActionType = {}));

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
                type: exports.NodeType.literal,
                children: [],
                expanded: false
            };
        };
        NodeManager.prototype.setFilteredText = function (text) {
            this.filteredText = text;
        };
        NodeManager = __decorate([
            core.Injectable()
        ], NodeManager);
        return NodeManager;
    }());

    //import { FreeJsonDialog } from './json-dialog.component';
    var FreeJsonComponent = /** @class */ (function () {
        function FreeJsonComponent(manager) {
            this.manager = manager;
            this.reasoningCodes = [];
            this.onpublish = new core.EventEmitter();
            this.onchange = new core.EventEmitter();
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
                        parent: exports.NodeType.array,
                        type: exports.NodeType.array,
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
                    var savedNode = this.transformedInternalStructureBackToNode(this.transformedData[0].children, exports.NodeType.json);
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
                if (parent === exports.NodeType.json) {
                    if (item.type === exports.NodeType.literal) {
                        array.push(item.value);
                    }
                    else if (item.type === exports.NodeType.pair) {
                        json[item.name] = item.value;
                    }
                    else if (item.type === exports.NodeType.array) {
                        json[item.name] = _this.transformedInternalStructureBackToNode(item.children, item.parent);
                    }
                    else if (item.type === exports.NodeType.json) {
                        json[item.name] = _this.transformedInternalStructureBackToNode(item.children, item.parent);
                    }
                }
                else if (parent === exports.NodeType.array) {
                    if (item.type === exports.NodeType.literal) {
                        array.push(item.value);
                    }
                    else if (item.type === exports.NodeType.json) {
                        array.push(_this.transformedInternalStructureBackToNode(item, item.parent));
                    }
                    else if (item.type === exports.NodeType.array) {
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
                        parent: exports.NodeType.array,
                        parentNode: parent,
                        type: exports.NodeType.array,
                        children: []
                    };
                    var jsonValue = _this.transformNodeToInternalStruction(item, subNode);
                    if (jsonValue instanceof Array) {
                        subNode.children = jsonValue;
                        children_1.push(subNode);
                    }
                    else {
                        subNode.value = jsonValue;
                        subNode.type = exports.NodeType.literal;
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
                        parent: exports.NodeType.json,
                        parentNode: parent,
                        type: exports.NodeType.array,
                        children: []
                    };
                    var jsonValue = _this.transformNodeToInternalStruction(node[item], subNode);
                    if (jsonValue instanceof Array) {
                        subNode.children = jsonValue;
                        children_2.push(subNode);
                    }
                    else {
                        subNode.value = jsonValue;
                        subNode.type = exports.NodeType.pair;
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
                if (destinationNode.type === exports.NodeType.literal) {
                    destinationNode.type = exports.NodeType.json;
                    destinationNode.value = "";
                }
                else if (destinationNode.type === exports.NodeType.pair) {
                    destinationNode.type = exports.NodeType.json;
                }
                else if (destinationNode.type === exports.NodeType.array) {
                    if (destinationNode.parent === exports.NodeType.array && sourceNode.type === exports.NodeType.pair) {
                        sourceNode.type = exports.NodeType.json;
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
                    parent.type = exports.NodeType.pair;
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
            return (node.type === exports.NodeType.json) || (node.type === exports.NodeType.array);
        };
        FreeJsonComponent.prototype.changePerformed = function (event) {
            if (this.children) {
                var savedNode = this.transformedInternalStructureBackToNode(this.transformedData[0].children, exports.NodeType.json);
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
            core.Input("transformedData")
        ], FreeJsonComponent.prototype, "transformedData", void 0);
        __decorate([
            core.Input("reasoning")
        ], FreeJsonComponent.prototype, "reasoning", void 0);
        __decorate([
            core.Input("reasoningCodes")
        ], FreeJsonComponent.prototype, "reasoningCodes", void 0);
        __decorate([
            core.Input()
        ], FreeJsonComponent.prototype, "root", null);
        __decorate([
            core.Input()
        ], FreeJsonComponent.prototype, "save", null);
        __decorate([
            core.Output("onpublish")
        ], FreeJsonComponent.prototype, "onpublish", void 0);
        __decorate([
            core.Output("onchange")
        ], FreeJsonComponent.prototype, "onchange", void 0);
        FreeJsonComponent = __decorate([
            core.Component({
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
            core.Input("val")
        ], FreeJsonSearchField.prototype, "val", void 0);
        FreeJsonSearchField = __decorate([
            core.Component({
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
            this.onchange = new core.EventEmitter();
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
            { type: core.Renderer }
        ]; };
        __decorate([
            core.ViewChild("nameEditor", { static: false })
        ], FreeJsonLabel.prototype, "nameEditor", void 0);
        __decorate([
            core.ViewChild("valueEditor", { static: false })
        ], FreeJsonLabel.prototype, "valueEditor", void 0);
        __decorate([
            core.Input()
        ], FreeJsonLabel.prototype, "node", void 0);
        __decorate([
            core.Output("onchange")
        ], FreeJsonLabel.prototype, "onchange", void 0);
        FreeJsonLabel = __decorate([
            core.Component({
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
            core.Pipe({
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
            core.NgModule({
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
            })
        ], FreeJsonModule);
        return FreeJsonModule;
    }());

    exports.FreeJsonComponent = FreeJsonComponent;
    exports.FreeJsonModule = FreeJsonModule;
    exports.ɵa = NodeManager;
    exports.ɵb = FreeJsonLabel;
    exports.ɵc = FreeJsonSearch;
    exports.ɵd = FreeJsonSearchField;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sedeh-free-json.umd.js.map
