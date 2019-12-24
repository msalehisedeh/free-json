import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { NodeManager } from '../injectables/node-manager';
let FreeJsonSearch = class FreeJsonSearch {
    constructor(manager) {
        this.manager = manager;
    }
    isBlank(obj) {
        return obj === undefined || obj === null;
    }
    transform(value) {
        var filteredText = this.manager.getFilteredText();
        if (this.isBlank(filteredText)) {
            return value;
        }
        else {
            return value.filter((node) => node.text.indexOf(filteredText) > -1);
        }
    }
};
FreeJsonSearch.ctorParameters = () => [
    { type: NodeManager }
];
FreeJsonSearch = tslib_1.__decorate([
    Pipe({
        name: 'nodeSearch',
        pure: false
    })
], FreeJsonSearch);
export { FreeJsonSearch };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1zZWFyY2guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvZnJlZS1qc29uLyIsInNvdXJjZXMiOlsic3JjL2FwcC9mcmVlLWpzb24vcGlwZXMvanNvbi1zZWFyY2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQU0xRCxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0lBQ3pCLFlBQ1UsT0FBb0I7UUFBcEIsWUFBTyxHQUFQLE9BQU8sQ0FBYTtJQUU5QixDQUFDO0lBRUQsT0FBTyxDQUFDLEdBQVE7UUFDZCxPQUFPLEdBQUcsS0FBSyxTQUFTLElBQUksR0FBRyxLQUFLLElBQUksQ0FBQztJQUMzQyxDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQUs7UUFDYixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFBO1FBQ2pELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUM5QixPQUFPLEtBQUssQ0FBQTtTQUNiO2FBQU07WUFDTCxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDckU7SUFDSCxDQUFDO0NBQ0YsQ0FBQTs7WUFoQm9CLFdBQVc7O0FBRm5CLGNBQWM7SUFKMUIsSUFBSSxDQUFDO1FBQ0osSUFBSSxFQUFFLFlBQVk7UUFDbEIsSUFBSSxFQUFFLEtBQUs7S0FDWixDQUFDO0dBQ1csY0FBYyxDQWtCMUI7U0FsQlksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTm9kZU1hbmFnZXIgfSBmcm9tICcuLi9pbmplY3RhYmxlcy9ub2RlLW1hbmFnZXInO1xyXG5cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICdub2RlU2VhcmNoJyxcclxuICBwdXJlOiBmYWxzZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRnJlZUpzb25TZWFyY2ggaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbWFuYWdlcjogTm9kZU1hbmFnZXJcclxuICApe1xyXG4gIH1cclxuXHJcbiAgaXNCbGFuayhvYmo6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkIHx8IG9iaiA9PT0gbnVsbDtcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybSh2YWx1ZSkge1xyXG4gICAgdmFyIGZpbHRlcmVkVGV4dCA9IHRoaXMubWFuYWdlci5nZXRGaWx0ZXJlZFRleHQoKVxyXG4gICAgaWYgKHRoaXMuaXNCbGFuayhmaWx0ZXJlZFRleHQpKSB7IFxyXG4gICAgICByZXR1cm4gdmFsdWVcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB2YWx1ZS5maWx0ZXIoKG5vZGUpID0+IG5vZGUudGV4dC5pbmRleE9mKGZpbHRlcmVkVGV4dCkgPiAtMSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==