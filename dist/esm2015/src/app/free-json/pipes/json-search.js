/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { NodeManager } from '../injectables/node-manager';
export class FreeJsonSearch {
    /**
     * @param {?} manager
     */
    constructor(manager) {
        this.manager = manager;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    isBlank(obj) {
        return obj === undefined || obj === null;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    transform(value) {
        /** @type {?} */
        var filteredText = this.manager.getFilteredText();
        if (this.isBlank(filteredText)) {
            return value;
        }
        else {
            return value.filter((node) => node.text.indexOf(filteredText) > -1);
        }
    }
}
FreeJsonSearch.decorators = [
    { type: Pipe, args: [{
                name: 'nodeSearch',
                pure: false
            },] }
];
/** @nocollapse */
FreeJsonSearch.ctorParameters = () => [
    { type: NodeManager }
];
if (false) {
    /** @type {?} */
    FreeJsonSearch.prototype.manager;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1zZWFyY2guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9mcmVlLWpzb24vIiwic291cmNlcyI6WyJzcmMvYXBwL2ZyZWUtanNvbi9waXBlcy9qc29uLXNlYXJjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBTTFELE1BQU07Ozs7SUFDSixZQUNVO1FBQUEsWUFBTyxHQUFQLE9BQU87S0FFaEI7Ozs7O0lBRUQsT0FBTyxDQUFDLEdBQVE7UUFDZCxNQUFNLENBQUMsR0FBRyxLQUFLLFNBQVMsSUFBSSxHQUFHLEtBQUssSUFBSSxDQUFDO0tBQzFDOzs7OztJQUVELFNBQVMsQ0FBQyxLQUFLOztRQUNiLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUE7UUFDakQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsTUFBTSxDQUFDLEtBQUssQ0FBQTtTQUNiO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNyRTtLQUNGOzs7WUFyQkYsSUFBSSxTQUFDO2dCQUNKLElBQUksRUFBRSxZQUFZO2dCQUNsQixJQUFJLEVBQUUsS0FBSzthQUNaOzs7O1lBTFEsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTm9kZU1hbmFnZXIgfSBmcm9tICcuLi9pbmplY3RhYmxlcy9ub2RlLW1hbmFnZXInO1xyXG5cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICdub2RlU2VhcmNoJyxcclxuICBwdXJlOiBmYWxzZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRnJlZUpzb25TZWFyY2ggaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbWFuYWdlcjogTm9kZU1hbmFnZXJcclxuICApe1xyXG4gIH1cclxuXHJcbiAgaXNCbGFuayhvYmo6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkIHx8IG9iaiA9PT0gbnVsbDtcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybSh2YWx1ZSkge1xyXG4gICAgdmFyIGZpbHRlcmVkVGV4dCA9IHRoaXMubWFuYWdlci5nZXRGaWx0ZXJlZFRleHQoKVxyXG4gICAgaWYgKHRoaXMuaXNCbGFuayhmaWx0ZXJlZFRleHQpKSB7IFxyXG4gICAgICByZXR1cm4gdmFsdWVcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB2YWx1ZS5maWx0ZXIoKG5vZGUpID0+IG5vZGUudGV4dC5pbmRleE9mKGZpbHRlcmVkVGV4dCkgPiAtMSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==