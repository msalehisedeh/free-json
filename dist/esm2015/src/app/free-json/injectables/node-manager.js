/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { NodeType } from './../interfaces/node.interface';
export class NodeManager {
    constructor() {
    }
    /**
     * @return {?}
     */
    generateNodeId() {
        /** @type {?} */
        const min = 1;
        /** @type {?} */
        const max = 10000;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    /**
     * @return {?}
     */
    getFilteredText() {
        return this.filteredText;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    getNewNode(node) {
        /** @type {?} */
        const id = this.generateNodeId();
        return {
            id: id,
            name: 'name',
            value: 'value',
            parent: node.type,
            parentNode: node,
            type: NodeType.literal,
            children: [],
            expanded: false
        };
    }
    /**
     * @param {?} text
     * @return {?}
     */
    setFilteredText(text) {
        this.filteredText = text;
    }
}
NodeManager.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NodeManager.ctorParameters = () => [];
if (false) {
    /** @type {?} */
    NodeManager.prototype.filteredText;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL2ZyZWUtanNvbi8iLCJzb3VyY2VzIjpbInNyYy9hcHAvZnJlZS1qc29uL2luamVjdGFibGVzL25vZGUtbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQVEsUUFBUSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFHaEUsTUFBTTtJQUdKO0tBQ0M7Ozs7SUFFRCxjQUFjOztRQUNaLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQzs7UUFDZCxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUE7UUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztLQUMxRDs7OztJQUVELGVBQWU7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztLQUMxQjs7Ozs7SUFFRCxVQUFVLENBQUMsSUFBVTs7UUFDbkIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ2pDLE1BQU0sQ0FBQztZQUNMLEVBQUUsRUFBRSxFQUFFO1lBQ04sSUFBSSxFQUFFLE1BQU07WUFDWixLQUFLLEVBQUUsT0FBTztZQUNkLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNqQixVQUFVLEVBQUUsSUFBSTtZQUNoQixJQUFJLEVBQUUsUUFBUSxDQUFDLE9BQU87WUFDdEIsUUFBUSxFQUFFLEVBQUU7WUFDWixRQUFRLEVBQUUsS0FBSztTQUNoQixDQUFDO0tBQ0g7Ozs7O0lBRUQsZUFBZSxDQUFDLElBQUk7UUFDbEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7S0FDMUI7OztZQWpDRixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTm9kZSwgTm9kZVR5cGUgfSBmcm9tICcuLy4uL2ludGVyZmFjZXMvbm9kZS5pbnRlcmZhY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTm9kZU1hbmFnZXIge1xyXG4gIGZpbHRlcmVkVGV4dDogU3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICB9XHJcblxyXG4gIGdlbmVyYXRlTm9kZUlkKCkge1xyXG4gICAgY29uc3QgbWluID0gMTtcclxuICAgIGNvbnN0IG1heCA9IDEwMDAwXHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcclxuICB9XHJcblxyXG4gIGdldEZpbHRlcmVkVGV4dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmZpbHRlcmVkVGV4dDtcclxuICB9XHJcblxyXG4gIGdldE5ld05vZGUobm9kZTogTm9kZSk6IE5vZGUge1xyXG4gICAgY29uc3QgaWQgPSB0aGlzLmdlbmVyYXRlTm9kZUlkKCk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBpZDogaWQsXHJcbiAgICAgIG5hbWU6ICduYW1lJywgXHJcbiAgICAgIHZhbHVlOiAndmFsdWUnLFxyXG4gICAgICBwYXJlbnQ6IG5vZGUudHlwZSxcclxuICAgICAgcGFyZW50Tm9kZTogbm9kZSxcclxuICAgICAgdHlwZTogTm9kZVR5cGUubGl0ZXJhbCxcclxuICAgICAgY2hpbGRyZW46IFtdLFxyXG4gICAgICBleHBhbmRlZDogZmFsc2VcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBzZXRGaWx0ZXJlZFRleHQodGV4dCkge1xyXG4gICAgdGhpcy5maWx0ZXJlZFRleHQgPSB0ZXh0O1xyXG4gIH1cclxufVxyXG4iXX0=