import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { NodeManager } from '../injectables/node-manager';
var FreeJsonSearchField = /** @class */ (function () {
    function FreeJsonSearchField(manager) {
        this.manager = manager;
    }
    FreeJsonSearchField.prototype.filter = function (value) {
        this.manager.setFilteredText(value);
    };
    FreeJsonSearchField.ctorParameters = function () { return [
        { type: NodeManager }
    ]; };
    tslib_1.__decorate([
        Input("val")
    ], FreeJsonSearchField.prototype, "val", void 0);
    FreeJsonSearchField = tslib_1.__decorate([
        Component({
            selector: 'json-search-field',
            template: "<input type='text' [(ngModel)]='val' (ngModelChange)='filter(val)'>"
        })
    ], FreeJsonSearchField);
    return FreeJsonSearchField;
}());
export { FreeJsonSearchField };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1zZWFyY2gtZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL2ZyZWUtanNvbi8iLCJzb3VyY2VzIjpbInNyYy9hcHAvZnJlZS1qc29uL2NvbXBvbmVudHMvanNvbi1zZWFyY2gtZmllbGQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFNMUQ7SUFJRSw2QkFDVSxPQUFvQjtRQUFwQixZQUFPLEdBQVAsT0FBTyxDQUFhO0lBQzNCLENBQUM7SUFFSixvQ0FBTSxHQUFOLFVBQU8sS0FBSztRQUNWLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUM7O2dCQUxrQixXQUFXOztJQUg5QjtRQURDLEtBQUssQ0FBQyxLQUFLLENBQUM7b0RBQ0Q7SUFGRCxtQkFBbUI7UUFKL0IsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixRQUFRLEVBQUMscUVBQXFFO1NBQy9FLENBQUM7T0FDVyxtQkFBbUIsQ0FXL0I7SUFBRCwwQkFBQztDQUFBLEFBWEQsSUFXQztTQVhZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTm9kZU1hbmFnZXIgfSBmcm9tICcuLi9pbmplY3RhYmxlcy9ub2RlLW1hbmFnZXInO1xyXG5cclxuQENvbXBvbmVudCh7IFxyXG4gIHNlbGVjdG9yOiAnanNvbi1zZWFyY2gtZmllbGQnLCBcclxuICB0ZW1wbGF0ZTpgPGlucHV0IHR5cGU9J3RleHQnIFsobmdNb2RlbCldPSd2YWwnIChuZ01vZGVsQ2hhbmdlKT0nZmlsdGVyKHZhbCknPmBcclxufSlcclxuZXhwb3J0IGNsYXNzIEZyZWVKc29uU2VhcmNoRmllbGR7XHJcbiAgQElucHV0KFwidmFsXCIpXHJcbiAgdmFsOiBzdHJpbmc7XHJcbiAgXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG1hbmFnZXI6IE5vZGVNYW5hZ2VyXHJcbiAgKSB7fVxyXG5cclxuICBmaWx0ZXIodmFsdWUpIHtcclxuICAgIHRoaXMubWFuYWdlci5zZXRGaWx0ZXJlZFRleHQodmFsdWUpO1xyXG4gIH1cclxufVxyXG4iXX0=