/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { NodeType } from './../interfaces/node.interface';
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
export { NodeManager };
if (false) {
    /** @type {?} */
    NodeManager.prototype.filteredText;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL2ZyZWUtanNvbi8iLCJzb3VyY2VzIjpbInNyYy9hcHAvZnJlZS1qc29uL2luamVjdGFibGVzL25vZGUtbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQVEsUUFBUSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7O0lBTTlEO0tBQ0M7Ozs7SUFFRCxvQ0FBYzs7O0lBQWQ7O1FBQ0UsSUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDOztRQUNkLElBQU0sR0FBRyxHQUFHLEtBQUssQ0FBQTtRQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0tBQzFEOzs7O0lBRUQscUNBQWU7OztJQUFmO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7S0FDMUI7Ozs7O0lBRUQsZ0NBQVU7Ozs7SUFBVixVQUFXLElBQVU7O1FBQ25CLElBQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNqQyxNQUFNLENBQUM7WUFDTCxFQUFFLEVBQUUsRUFBRTtZQUNOLElBQUksRUFBRSxNQUFNO1lBQ1osS0FBSyxFQUFFLE9BQU87WUFDZCxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDakIsVUFBVSxFQUFFLElBQUk7WUFDaEIsSUFBSSxFQUFFLFFBQVEsQ0FBQyxPQUFPO1lBQ3RCLFFBQVEsRUFBRSxFQUFFO1lBQ1osUUFBUSxFQUFFLEtBQUs7U0FDaEIsQ0FBQztLQUNIOzs7OztJQUVELHFDQUFlOzs7O0lBQWYsVUFBZ0IsSUFBSTtRQUNsQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztLQUMxQjs7Z0JBakNGLFVBQVU7Ozs7c0JBSlg7O1NBS2EsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IE5vZGUsIE5vZGVUeXBlIH0gZnJvbSAnLi8uLi9pbnRlcmZhY2VzL25vZGUuaW50ZXJmYWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE5vZGVNYW5hZ2VyIHtcclxuICBmaWx0ZXJlZFRleHQ6IFN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgfVxyXG5cclxuICBnZW5lcmF0ZU5vZGVJZCgpIHtcclxuICAgIGNvbnN0IG1pbiA9IDE7XHJcbiAgICBjb25zdCBtYXggPSAxMDAwMFxyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XHJcbiAgfVxyXG5cclxuICBnZXRGaWx0ZXJlZFRleHQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maWx0ZXJlZFRleHQ7XHJcbiAgfVxyXG5cclxuICBnZXROZXdOb2RlKG5vZGU6IE5vZGUpOiBOb2RlIHtcclxuICAgIGNvbnN0IGlkID0gdGhpcy5nZW5lcmF0ZU5vZGVJZCgpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaWQ6IGlkLFxyXG4gICAgICBuYW1lOiAnbmFtZScsIFxyXG4gICAgICB2YWx1ZTogJ3ZhbHVlJyxcclxuICAgICAgcGFyZW50OiBub2RlLnR5cGUsXHJcbiAgICAgIHBhcmVudE5vZGU6IG5vZGUsXHJcbiAgICAgIHR5cGU6IE5vZGVUeXBlLmxpdGVyYWwsXHJcbiAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgZXhwYW5kZWQ6IGZhbHNlXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgc2V0RmlsdGVyZWRUZXh0KHRleHQpIHtcclxuICAgIHRoaXMuZmlsdGVyZWRUZXh0ID0gdGV4dDtcclxuICB9XHJcbn1cclxuIl19