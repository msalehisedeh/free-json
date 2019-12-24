import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { NodeManager } from '../injectables/node-manager';
let FreeJsonSearchField = class FreeJsonSearchField {
    constructor(manager) {
        this.manager = manager;
    }
    filter(value) {
        this.manager.setFilteredText(value);
    }
};
FreeJsonSearchField.ctorParameters = () => [
    { type: NodeManager }
];
tslib_1.__decorate([
    Input("val")
], FreeJsonSearchField.prototype, "val", void 0);
FreeJsonSearchField = tslib_1.__decorate([
    Component({
        selector: 'json-search-field',
        template: `<input type='text' [(ngModel)]='val' (ngModelChange)='filter(val)'>`
    })
], FreeJsonSearchField);
export { FreeJsonSearchField };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1zZWFyY2gtZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL2ZyZWUtanNvbi8iLCJzb3VyY2VzIjpbInNyYy9hcHAvZnJlZS1qc29uL2NvbXBvbmVudHMvanNvbi1zZWFyY2gtZmllbGQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFNMUQsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUFJOUIsWUFDVSxPQUFvQjtRQUFwQixZQUFPLEdBQVAsT0FBTyxDQUFhO0lBQzNCLENBQUM7SUFFSixNQUFNLENBQUMsS0FBSztRQUNWLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUM7Q0FDRixDQUFBOztZQU5vQixXQUFXOztBQUg5QjtJQURDLEtBQUssQ0FBQyxLQUFLLENBQUM7Z0RBQ0Q7QUFGRCxtQkFBbUI7SUFKL0IsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLG1CQUFtQjtRQUM3QixRQUFRLEVBQUMscUVBQXFFO0tBQy9FLENBQUM7R0FDVyxtQkFBbUIsQ0FXL0I7U0FYWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5vZGVNYW5hZ2VyIH0gZnJvbSAnLi4vaW5qZWN0YWJsZXMvbm9kZS1tYW5hZ2VyJztcclxuXHJcbkBDb21wb25lbnQoeyBcclxuICBzZWxlY3RvcjogJ2pzb24tc2VhcmNoLWZpZWxkJywgXHJcbiAgdGVtcGxhdGU6YDxpbnB1dCB0eXBlPSd0ZXh0JyBbKG5nTW9kZWwpXT0ndmFsJyAobmdNb2RlbENoYW5nZSk9J2ZpbHRlcih2YWwpJz5gXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGcmVlSnNvblNlYXJjaEZpZWxke1xyXG4gIEBJbnB1dChcInZhbFwiKVxyXG4gIHZhbDogc3RyaW5nO1xyXG4gIFxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtYW5hZ2VyOiBOb2RlTWFuYWdlclxyXG4gICkge31cclxuXHJcbiAgZmlsdGVyKHZhbHVlKSB7XHJcbiAgICB0aGlzLm1hbmFnZXIuc2V0RmlsdGVyZWRUZXh0KHZhbHVlKTtcclxuICB9XHJcbn1cclxuIl19