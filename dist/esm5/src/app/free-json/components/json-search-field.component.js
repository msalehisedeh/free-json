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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1zZWFyY2gtZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vZnJlZS1qc29uLyIsInNvdXJjZXMiOlsic3JjL2FwcC9mcmVlLWpzb24vY29tcG9uZW50cy9qc29uLXNlYXJjaC1maWVsZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7SUFVeEQsNkJBQ1U7UUFBQSxZQUFPLEdBQVAsT0FBTztLQUNiOzs7OztJQUVKLG9DQUFNOzs7O0lBQU4sVUFBTyxLQUFLO1FBQ1YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDckM7O2dCQWRGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixRQUFRLEVBQUMscUVBQXFFO2lCQUMvRTs7OztnQkFMUSxXQUFXOzs7c0JBT2pCLEtBQUssU0FBQyxLQUFLOzs4QkFSZDs7U0FPYSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5vZGVNYW5hZ2VyIH0gZnJvbSAnLi4vaW5qZWN0YWJsZXMvbm9kZS1tYW5hZ2VyJztcclxuXHJcbkBDb21wb25lbnQoeyBcclxuICBzZWxlY3RvcjogJ2pzb24tc2VhcmNoLWZpZWxkJywgXHJcbiAgdGVtcGxhdGU6YDxpbnB1dCB0eXBlPSd0ZXh0JyBbKG5nTW9kZWwpXT0ndmFsJyAobmdNb2RlbENoYW5nZSk9J2ZpbHRlcih2YWwpJz5gXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGcmVlSnNvblNlYXJjaEZpZWxke1xyXG4gIEBJbnB1dChcInZhbFwiKVxyXG4gIHZhbDogc3RyaW5nO1xyXG4gIFxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtYW5hZ2VyOiBOb2RlTWFuYWdlclxyXG4gICkge31cclxuXHJcbiAgZmlsdGVyKHZhbHVlKSB7XHJcbiAgICB0aGlzLm1hbmFnZXIuc2V0RmlsdGVyZWRUZXh0KHZhbHVlKTtcclxuICB9XHJcbn1cclxuIl19