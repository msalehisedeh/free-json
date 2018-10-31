/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { NodeManager } from '../injectables/node-manager';
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
export { FreeJsonSearch };
if (false) {
    /** @type {?} */
    FreeJsonSearch.prototype.manager;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1zZWFyY2guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9mcmVlLWpzb24vIiwic291cmNlcyI6WyJzcmMvYXBwL2ZyZWUtanNvbi9waXBlcy9qc29uLXNlYXJjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDZCQUE2QixDQUFDOztJQU94RCx3QkFDVTtRQUFBLFlBQU8sR0FBUCxPQUFPO0tBRWhCOzs7OztJQUVELGdDQUFPOzs7O0lBQVAsVUFBUSxHQUFRO1FBQ2QsTUFBTSxDQUFDLEdBQUcsS0FBSyxTQUFTLElBQUksR0FBRyxLQUFLLElBQUksQ0FBQztLQUMxQzs7Ozs7SUFFRCxrQ0FBUzs7OztJQUFULFVBQVUsS0FBSzs7UUFDYixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFBO1FBQ2pELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxLQUFLLENBQUE7U0FDYjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQyxJQUFJLElBQUssT0FBQSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQyxDQUFDO1NBQ3JFO0tBQ0Y7O2dCQXJCRixJQUFJLFNBQUM7b0JBQ0osSUFBSSxFQUFFLFlBQVk7b0JBQ2xCLElBQUksRUFBRSxLQUFLO2lCQUNaOzs7O2dCQUxRLFdBQVc7O3lCQURwQjs7U0FPYSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOb2RlTWFuYWdlciB9IGZyb20gJy4uL2luamVjdGFibGVzL25vZGUtbWFuYWdlcic7XHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ25vZGVTZWFyY2gnLFxyXG4gIHB1cmU6IGZhbHNlXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGcmVlSnNvblNlYXJjaCBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtYW5hZ2VyOiBOb2RlTWFuYWdlclxyXG4gICl7XHJcbiAgfVxyXG5cclxuICBpc0JsYW5rKG9iajogYW55KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gb2JqID09PSB1bmRlZmluZWQgfHwgb2JqID09PSBudWxsO1xyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtKHZhbHVlKSB7XHJcbiAgICB2YXIgZmlsdGVyZWRUZXh0ID0gdGhpcy5tYW5hZ2VyLmdldEZpbHRlcmVkVGV4dCgpXHJcbiAgICBpZiAodGhpcy5pc0JsYW5rKGZpbHRlcmVkVGV4dCkpIHsgXHJcbiAgICAgIHJldHVybiB2YWx1ZVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHZhbHVlLmZpbHRlcigobm9kZSkgPT4gbm9kZS50ZXh0LmluZGV4T2YoZmlsdGVyZWRUZXh0KSA+IC0xKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19