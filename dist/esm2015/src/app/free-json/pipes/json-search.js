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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1zZWFyY2guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvZnJlZS1qc29uLyIsInNvdXJjZXMiOlsic3JjL2FwcC9mcmVlLWpzb24vcGlwZXMvanNvbi1zZWFyY2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQU0xRCxNQUFNOzs7O0lBQ0osWUFDVTtRQUFBLFlBQU8sR0FBUCxPQUFPO0tBRWhCOzs7OztJQUVELE9BQU8sQ0FBQyxHQUFRO1FBQ2QsTUFBTSxDQUFDLEdBQUcsS0FBSyxTQUFTLElBQUksR0FBRyxLQUFLLElBQUksQ0FBQztLQUMxQzs7Ozs7SUFFRCxTQUFTLENBQUMsS0FBSzs7UUFDYixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFBO1FBQ2pELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxLQUFLLENBQUE7U0FDYjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDckU7S0FDRjs7O1lBckJGLElBQUksU0FBQztnQkFDSixJQUFJLEVBQUUsWUFBWTtnQkFDbEIsSUFBSSxFQUFFLEtBQUs7YUFDWjs7OztZQUxRLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5vZGVNYW5hZ2VyIH0gZnJvbSAnLi4vaW5qZWN0YWJsZXMvbm9kZS1tYW5hZ2VyJztcclxuXHJcbkBQaXBlKHtcclxuICBuYW1lOiAnbm9kZVNlYXJjaCcsXHJcbiAgcHVyZTogZmFsc2VcclxufSlcclxuZXhwb3J0IGNsYXNzIEZyZWVKc29uU2VhcmNoIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG1hbmFnZXI6IE5vZGVNYW5hZ2VyXHJcbiAgKXtcclxuICB9XHJcblxyXG4gIGlzQmxhbmsob2JqOiBhbnkpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBvYmogPT09IHVuZGVmaW5lZCB8fCBvYmogPT09IG51bGw7XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm0odmFsdWUpIHtcclxuICAgIHZhciBmaWx0ZXJlZFRleHQgPSB0aGlzLm1hbmFnZXIuZ2V0RmlsdGVyZWRUZXh0KClcclxuICAgIGlmICh0aGlzLmlzQmxhbmsoZmlsdGVyZWRUZXh0KSkgeyBcclxuICAgICAgcmV0dXJuIHZhbHVlXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdmFsdWUuZmlsdGVyKChub2RlKSA9PiBub2RlLnRleHQuaW5kZXhPZihmaWx0ZXJlZFRleHQpID4gLTEpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=