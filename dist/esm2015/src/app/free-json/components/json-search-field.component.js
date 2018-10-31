/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { NodeManager } from '../injectables/node-manager';
export class FreeJsonSearchField {
    /**
     * @param {?} manager
     */
    constructor(manager) {
        this.manager = manager;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    filter(value) {
        this.manager.setFilteredText(value);
    }
}
FreeJsonSearchField.decorators = [
    { type: Component, args: [{
                selector: 'json-search-field',
                template: `<input type='text' [(ngModel)]='val' (ngModelChange)='filter(val)'>`
            }] }
];
/** @nocollapse */
FreeJsonSearchField.ctorParameters = () => [
    { type: NodeManager }
];
FreeJsonSearchField.propDecorators = {
    val: [{ type: Input, args: ["val",] }]
};
if (false) {
    /** @type {?} */
    FreeJsonSearchField.prototype.val;
    /** @type {?} */
    FreeJsonSearchField.prototype.manager;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1zZWFyY2gtZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vZnJlZS1qc29uLyIsInNvdXJjZXMiOlsic3JjL2FwcC9mcmVlLWpzb24vY29tcG9uZW50cy9qc29uLXNlYXJjaC1maWVsZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQU0xRCxNQUFNOzs7O0lBSUosWUFDVTtRQUFBLFlBQU8sR0FBUCxPQUFPO0tBQ2I7Ozs7O0lBRUosTUFBTSxDQUFDLEtBQUs7UUFDVixJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNyQzs7O1lBZEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLFFBQVEsRUFBQyxxRUFBcUU7YUFDL0U7Ozs7WUFMUSxXQUFXOzs7a0JBT2pCLEtBQUssU0FBQyxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOb2RlTWFuYWdlciB9IGZyb20gJy4uL2luamVjdGFibGVzL25vZGUtbWFuYWdlcic7XHJcblxyXG5AQ29tcG9uZW50KHsgXHJcbiAgc2VsZWN0b3I6ICdqc29uLXNlYXJjaC1maWVsZCcsIFxyXG4gIHRlbXBsYXRlOmA8aW5wdXQgdHlwZT0ndGV4dCcgWyhuZ01vZGVsKV09J3ZhbCcgKG5nTW9kZWxDaGFuZ2UpPSdmaWx0ZXIodmFsKSc+YFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRnJlZUpzb25TZWFyY2hGaWVsZHtcclxuICBASW5wdXQoXCJ2YWxcIilcclxuICB2YWw6IHN0cmluZztcclxuICBcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbWFuYWdlcjogTm9kZU1hbmFnZXJcclxuICApIHt9XHJcblxyXG4gIGZpbHRlcih2YWx1ZSkge1xyXG4gICAgdGhpcy5tYW5hZ2VyLnNldEZpbHRlcmVkVGV4dCh2YWx1ZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==