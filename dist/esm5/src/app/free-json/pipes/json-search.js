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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1zZWFyY2guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvZnJlZS1qc29uLyIsInNvdXJjZXMiOlsic3JjL2FwcC9mcmVlLWpzb24vcGlwZXMvanNvbi1zZWFyY2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7SUFPeEQsd0JBQ1U7UUFBQSxZQUFPLEdBQVAsT0FBTztLQUVoQjs7Ozs7SUFFRCxnQ0FBTzs7OztJQUFQLFVBQVEsR0FBUTtRQUNkLE1BQU0sQ0FBQyxHQUFHLEtBQUssU0FBUyxJQUFJLEdBQUcsS0FBSyxJQUFJLENBQUM7S0FDMUM7Ozs7O0lBRUQsa0NBQVM7Ozs7SUFBVCxVQUFVLEtBQUs7O1FBQ2IsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQTtRQUNqRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixNQUFNLENBQUMsS0FBSyxDQUFBO1NBQ2I7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUMsSUFBSSxJQUFLLE9BQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQXBDLENBQW9DLENBQUMsQ0FBQztTQUNyRTtLQUNGOztnQkFyQkYsSUFBSSxTQUFDO29CQUNKLElBQUksRUFBRSxZQUFZO29CQUNsQixJQUFJLEVBQUUsS0FBSztpQkFDWjs7OztnQkFMUSxXQUFXOzt5QkFEcEI7O1NBT2EsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTm9kZU1hbmFnZXIgfSBmcm9tICcuLi9pbmplY3RhYmxlcy9ub2RlLW1hbmFnZXInO1xyXG5cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICdub2RlU2VhcmNoJyxcclxuICBwdXJlOiBmYWxzZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRnJlZUpzb25TZWFyY2ggaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbWFuYWdlcjogTm9kZU1hbmFnZXJcclxuICApe1xyXG4gIH1cclxuXHJcbiAgaXNCbGFuayhvYmo6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkIHx8IG9iaiA9PT0gbnVsbDtcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybSh2YWx1ZSkge1xyXG4gICAgdmFyIGZpbHRlcmVkVGV4dCA9IHRoaXMubWFuYWdlci5nZXRGaWx0ZXJlZFRleHQoKVxyXG4gICAgaWYgKHRoaXMuaXNCbGFuayhmaWx0ZXJlZFRleHQpKSB7IFxyXG4gICAgICByZXR1cm4gdmFsdWVcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB2YWx1ZS5maWx0ZXIoKG5vZGUpID0+IG5vZGUudGV4dC5pbmRleE9mKGZpbHRlcmVkVGV4dCkgPiAtMSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==