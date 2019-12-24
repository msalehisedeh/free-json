import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { NodeManager } from '../injectables/node-manager';
var FreeJsonSearch = /** @class */ (function () {
    function FreeJsonSearch(manager) {
        this.manager = manager;
    }
    FreeJsonSearch.prototype.isBlank = function (obj) {
        return obj === undefined || obj === null;
    };
    FreeJsonSearch.prototype.transform = function (value) {
        var filteredText = this.manager.getFilteredText();
        if (this.isBlank(filteredText)) {
            return value;
        }
        else {
            return value.filter(function (node) { return node.text.indexOf(filteredText) > -1; });
        }
    };
    FreeJsonSearch.ctorParameters = function () { return [
        { type: NodeManager }
    ]; };
    FreeJsonSearch = tslib_1.__decorate([
        Pipe({
            name: 'nodeSearch',
            pure: false
        })
    ], FreeJsonSearch);
    return FreeJsonSearch;
}());
export { FreeJsonSearch };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1zZWFyY2guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvZnJlZS1qc29uLyIsInNvdXJjZXMiOlsic3JjL2FwcC9mcmVlLWpzb24vcGlwZXMvanNvbi1zZWFyY2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQU0xRDtJQUNFLHdCQUNVLE9BQW9CO1FBQXBCLFlBQU8sR0FBUCxPQUFPLENBQWE7SUFFOUIsQ0FBQztJQUVELGdDQUFPLEdBQVAsVUFBUSxHQUFRO1FBQ2QsT0FBTyxHQUFHLEtBQUssU0FBUyxJQUFJLEdBQUcsS0FBSyxJQUFJLENBQUM7SUFDM0MsQ0FBQztJQUVELGtDQUFTLEdBQVQsVUFBVSxLQUFLO1FBQ2IsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQTtRQUNqRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDOUIsT0FBTyxLQUFLLENBQUE7U0FDYjthQUFNO1lBQ0wsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUMsSUFBSSxJQUFLLE9BQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQXBDLENBQW9DLENBQUMsQ0FBQztTQUNyRTtJQUNILENBQUM7O2dCQWZrQixXQUFXOztJQUZuQixjQUFjO1FBSjFCLElBQUksQ0FBQztZQUNKLElBQUksRUFBRSxZQUFZO1lBQ2xCLElBQUksRUFBRSxLQUFLO1NBQ1osQ0FBQztPQUNXLGNBQWMsQ0FrQjFCO0lBQUQscUJBQUM7Q0FBQSxBQWxCRCxJQWtCQztTQWxCWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOb2RlTWFuYWdlciB9IGZyb20gJy4uL2luamVjdGFibGVzL25vZGUtbWFuYWdlcic7XHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ25vZGVTZWFyY2gnLFxyXG4gIHB1cmU6IGZhbHNlXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGcmVlSnNvblNlYXJjaCBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtYW5hZ2VyOiBOb2RlTWFuYWdlclxyXG4gICl7XHJcbiAgfVxyXG5cclxuICBpc0JsYW5rKG9iajogYW55KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gb2JqID09PSB1bmRlZmluZWQgfHwgb2JqID09PSBudWxsO1xyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtKHZhbHVlKSB7XHJcbiAgICB2YXIgZmlsdGVyZWRUZXh0ID0gdGhpcy5tYW5hZ2VyLmdldEZpbHRlcmVkVGV4dCgpXHJcbiAgICBpZiAodGhpcy5pc0JsYW5rKGZpbHRlcmVkVGV4dCkpIHsgXHJcbiAgICAgIHJldHVybiB2YWx1ZVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHZhbHVlLmZpbHRlcigobm9kZSkgPT4gbm9kZS50ZXh0LmluZGV4T2YoZmlsdGVyZWRUZXh0KSA+IC0xKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19