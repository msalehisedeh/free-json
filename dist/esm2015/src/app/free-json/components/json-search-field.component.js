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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1zZWFyY2gtZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL2ZyZWUtanNvbi8iLCJzb3VyY2VzIjpbInNyYy9hcHAvZnJlZS1qc29uL2NvbXBvbmVudHMvanNvbi1zZWFyY2gtZmllbGQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFNMUQsTUFBTTs7OztJQUlKLFlBQ1U7UUFBQSxZQUFPLEdBQVAsT0FBTztLQUNiOzs7OztJQUVKLE1BQU0sQ0FBQyxLQUFLO1FBQ1YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDckM7OztZQWRGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixRQUFRLEVBQUMscUVBQXFFO2FBQy9FOzs7O1lBTFEsV0FBVzs7O2tCQU9qQixLQUFLLFNBQUMsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTm9kZU1hbmFnZXIgfSBmcm9tICcuLi9pbmplY3RhYmxlcy9ub2RlLW1hbmFnZXInO1xyXG5cclxuQENvbXBvbmVudCh7IFxyXG4gIHNlbGVjdG9yOiAnanNvbi1zZWFyY2gtZmllbGQnLCBcclxuICB0ZW1wbGF0ZTpgPGlucHV0IHR5cGU9J3RleHQnIFsobmdNb2RlbCldPSd2YWwnIChuZ01vZGVsQ2hhbmdlKT0nZmlsdGVyKHZhbCknPmBcclxufSlcclxuZXhwb3J0IGNsYXNzIEZyZWVKc29uU2VhcmNoRmllbGR7XHJcbiAgQElucHV0KFwidmFsXCIpXHJcbiAgdmFsOiBzdHJpbmc7XHJcbiAgXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG1hbmFnZXI6IE5vZGVNYW5hZ2VyXHJcbiAgKSB7fVxyXG5cclxuICBmaWx0ZXIodmFsdWUpIHtcclxuICAgIHRoaXMubWFuYWdlci5zZXRGaWx0ZXJlZFRleHQodmFsdWUpO1xyXG4gIH1cclxufVxyXG4iXX0=