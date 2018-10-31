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
export { NodeType };
NodeType[NodeType.literal] = 'literal';
NodeType[NodeType.pair] = 'pair';
NodeType[NodeType.json] = 'json';
NodeType[NodeType.array] = 'array';
/**
 * @record
 */
export function Node() { }
/** @type {?} */
Node.prototype.id;
/** @type {?} */
Node.prototype.name;
/** @type {?} */
Node.prototype.value;
/** @type {?} */
Node.prototype.parent;
/** @type {?|undefined} */
Node.prototype.parentNode;
/** @type {?} */
Node.prototype.type;
/** @type {?} */
Node.prototype.children;
/** @type {?|undefined} */
Node.prototype.expanded;
/** @type {?|undefined} */
Node.prototype.isRoot;
/** @enum {number} */
var ActionType = {
    add: 1,
    remove: 2,
    move: 3,
    modified: 4,
};
export { ActionType };
ActionType[ActionType.add] = 'add';
ActionType[ActionType.remove] = 'remove';
ActionType[ActionType.move] = 'move';
ActionType[ActionType.modified] = 'modified';
/**
 * @record
 */
export function Reasoning() { }
/** @type {?} */
Reasoning.prototype.code;
/** @type {?} */
Reasoning.prototype.description;
/** @type {?} */
Reasoning.prototype.action;
/** @type {?} */
Reasoning.prototype.node;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9mcmVlLWpzb24vIiwic291cmNlcyI6WyJzcmMvYXBwL2ZyZWUtanNvbi9pbnRlcmZhY2VzL25vZGUuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztJQUVFLFVBQVc7SUFDWCxPQUFRO0lBQ1IsT0FBUTtJQUNSLFFBQVM7OztrQkFIVCxPQUFPO2tCQUNQLElBQUk7a0JBQ0osSUFBSTtrQkFDSixLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBY0wsTUFBTztJQUNQLFNBQVU7SUFDVixPQUFRO0lBQ1IsV0FBWTs7O3NCQUhaLEdBQUc7c0JBQ0gsTUFBTTtzQkFDTixJQUFJO3NCQUNKLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZXhwb3J0IGVudW0gTm9kZVR5cGUge1xyXG4gIGxpdGVyYWwgPSAxLFxyXG4gIHBhaXIgPSAyLFxyXG4gIGpzb24gPSAzLFxyXG4gIGFycmF5ID0gNFxyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgTm9kZSB7XHJcbiAgaWQ6IG51bWJlcixcclxuICBuYW1lOiBzdHJpbmcsXHJcbiAgdmFsdWU6IHN0cmluZyxcclxuICBwYXJlbnQ6IE5vZGVUeXBlLFxyXG4gIHBhcmVudE5vZGU/OiBOb2RlLFxyXG4gIHR5cGU6IE5vZGVUeXBlLFxyXG4gIGNoaWxkcmVuOiBOb2RlW10sXHJcbiAgZXhwYW5kZWQ/OiBib29sZWFuLFxyXG4gIGlzUm9vdD86IGJvb2xlYW5cclxufVxyXG5leHBvcnQgZW51bSBBY3Rpb25UeXBlIHtcclxuICBhZGQgPSAxLFxyXG4gIHJlbW92ZSA9IDIsXHJcbiAgbW92ZSA9IDMsXHJcbiAgbW9kaWZpZWQgPSA0XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBSZWFzb25pbmcge1xyXG4gIGNvZGU6IHN0cmluZyxcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nLFxyXG4gIGFjdGlvbjogQWN0aW9uVHlwZSxcclxuICBub2RlOiBzdHJpbmdcclxufVxyXG5cclxuIl19