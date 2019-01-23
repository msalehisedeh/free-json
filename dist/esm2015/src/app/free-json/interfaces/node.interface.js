/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {number} */
const NodeType = {
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
const ActionType = {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvZnJlZS1qc29uLyIsInNvdXJjZXMiOlsic3JjL2FwcC9mcmVlLWpzb24vaW50ZXJmYWNlcy9ub2RlLmludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7SUFFRSxVQUFXO0lBQ1gsT0FBUTtJQUNSLE9BQVE7SUFDUixRQUFTOzs7a0JBSFQsT0FBTztrQkFDUCxJQUFJO2tCQUNKLElBQUk7a0JBQ0osS0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWNMLE1BQU87SUFDUCxTQUFVO0lBQ1YsT0FBUTtJQUNSLFdBQVk7OztzQkFIWixHQUFHO3NCQUNILE1BQU07c0JBQ04sSUFBSTtzQkFDSixRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmV4cG9ydCBlbnVtIE5vZGVUeXBlIHtcclxuICBsaXRlcmFsID0gMSxcclxuICBwYWlyID0gMixcclxuICBqc29uID0gMyxcclxuICBhcnJheSA9IDRcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIE5vZGUge1xyXG4gIGlkOiBudW1iZXIsXHJcbiAgbmFtZTogc3RyaW5nLFxyXG4gIHZhbHVlOiBzdHJpbmcsXHJcbiAgcGFyZW50OiBOb2RlVHlwZSxcclxuICBwYXJlbnROb2RlPzogTm9kZSxcclxuICB0eXBlOiBOb2RlVHlwZSxcclxuICBjaGlsZHJlbjogTm9kZVtdLFxyXG4gIGV4cGFuZGVkPzogYm9vbGVhbixcclxuICBpc1Jvb3Q/OiBib29sZWFuXHJcbn1cclxuZXhwb3J0IGVudW0gQWN0aW9uVHlwZSB7XHJcbiAgYWRkID0gMSxcclxuICByZW1vdmUgPSAyLFxyXG4gIG1vdmUgPSAzLFxyXG4gIG1vZGlmaWVkID0gNFxyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVhc29uaW5nIHtcclxuICBjb2RlOiBzdHJpbmcsXHJcbiAgZGVzY3JpcHRpb246IHN0cmluZyxcclxuICBhY3Rpb246IEFjdGlvblR5cGUsXHJcbiAgbm9kZTogc3RyaW5nXHJcbn1cclxuXHJcbiJdfQ==