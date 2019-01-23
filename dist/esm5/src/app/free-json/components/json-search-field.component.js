/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { NodeManager } from '../injectables/node-manager';
var FreeJsonSearchField = /** @class */ (function () {
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
        { type: Component, args: [{
                    selector: 'json-search-field',
                    template: "<input type='text' [(ngModel)]='val' (ngModelChange)='filter(val)'>"
                }] }
    ];
    /** @nocollapse */
    FreeJsonSearchField.ctorParameters = function () { return [
        { type: NodeManager }
    ]; };
    FreeJsonSearchField.propDecorators = {
        val: [{ type: Input, args: ["val",] }]
    };
    return FreeJsonSearchField;
}());
export { FreeJsonSearchField };
if (false) {
    /** @type {?} */
    FreeJsonSearchField.prototype.val;
    /** @type {?} */
    FreeJsonSearchField.prototype.manager;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1zZWFyY2gtZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL2ZyZWUtanNvbi8iLCJzb3VyY2VzIjpbInNyYy9hcHAvZnJlZS1qc29uL2NvbXBvbmVudHMvanNvbi1zZWFyY2gtZmllbGQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7O0lBVXhELDZCQUNVO1FBQUEsWUFBTyxHQUFQLE9BQU87S0FDYjs7Ozs7SUFFSixvQ0FBTTs7OztJQUFOLFVBQU8sS0FBSztRQUNWLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3JDOztnQkFkRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFDLHFFQUFxRTtpQkFDL0U7Ozs7Z0JBTFEsV0FBVzs7O3NCQU9qQixLQUFLLFNBQUMsS0FBSzs7OEJBUmQ7O1NBT2EsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOb2RlTWFuYWdlciB9IGZyb20gJy4uL2luamVjdGFibGVzL25vZGUtbWFuYWdlcic7XHJcblxyXG5AQ29tcG9uZW50KHsgXHJcbiAgc2VsZWN0b3I6ICdqc29uLXNlYXJjaC1maWVsZCcsIFxyXG4gIHRlbXBsYXRlOmA8aW5wdXQgdHlwZT0ndGV4dCcgWyhuZ01vZGVsKV09J3ZhbCcgKG5nTW9kZWxDaGFuZ2UpPSdmaWx0ZXIodmFsKSc+YFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRnJlZUpzb25TZWFyY2hGaWVsZHtcclxuICBASW5wdXQoXCJ2YWxcIilcclxuICB2YWw6IHN0cmluZztcclxuICBcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbWFuYWdlcjogTm9kZU1hbmFnZXJcclxuICApIHt9XHJcblxyXG4gIGZpbHRlcih2YWx1ZSkge1xyXG4gICAgdGhpcy5tYW5hZ2VyLnNldEZpbHRlcmVkVGV4dCh2YWx1ZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==