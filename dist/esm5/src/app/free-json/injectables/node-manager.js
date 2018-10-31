/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { NodeType } from './../interfaces/node.interface';
var NodeManager = /** @class */ (function () {
    function NodeManager() {
    }
    /**
     * @return {?}
     */
    NodeManager.prototype.generateNodeId = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var min = 1;
        /** @type {?} */
        var max = 10000;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    /**
     * @return {?}
     */
    NodeManager.prototype.getFilteredText = /**
     * @return {?}
     */
    function () {
        return this.filteredText;
    };
    /**
     * @param {?} node
     * @return {?}
     */
    NodeManager.prototype.getNewNode = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        /** @type {?} */
        var id = this.generateNodeId();
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
    };
    /**
     * @param {?} text
     * @return {?}
     */
    NodeManager.prototype.setFilteredText = /**
     * @param {?} text
     * @return {?}
     */
    function (text) {
        this.filteredText = text;
    };
    NodeManager.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    NodeManager.ctorParameters = function () { return []; };
    return NodeManager;
}());
export { NodeManager };
if (false) {
    /** @type {?} */
    NodeManager.prototype.filteredText;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZnJlZS1qc29uLyIsInNvdXJjZXMiOlsic3JjL2FwcC9mcmVlLWpzb24vaW5qZWN0YWJsZXMvbm9kZS1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBUSxRQUFRLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7SUFNOUQ7S0FDQzs7OztJQUVELG9DQUFjOzs7SUFBZDs7UUFDRSxJQUFNLEdBQUcsR0FBRyxDQUFDLENBQUM7O1FBQ2QsSUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFBO1FBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7S0FDMUQ7Ozs7SUFFRCxxQ0FBZTs7O0lBQWY7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztLQUMxQjs7Ozs7SUFFRCxnQ0FBVTs7OztJQUFWLFVBQVcsSUFBVTs7UUFDbkIsSUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ2pDLE1BQU0sQ0FBQztZQUNMLEVBQUUsRUFBRSxFQUFFO1lBQ04sSUFBSSxFQUFFLE1BQU07WUFDWixLQUFLLEVBQUUsT0FBTztZQUNkLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNqQixVQUFVLEVBQUUsSUFBSTtZQUNoQixJQUFJLEVBQUUsUUFBUSxDQUFDLE9BQU87WUFDdEIsUUFBUSxFQUFFLEVBQUU7WUFDWixRQUFRLEVBQUUsS0FBSztTQUNoQixDQUFDO0tBQ0g7Ozs7O0lBRUQscUNBQWU7Ozs7SUFBZixVQUFnQixJQUFJO1FBQ2xCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0tBQzFCOztnQkFqQ0YsVUFBVTs7OztzQkFKWDs7U0FLYSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTm9kZSwgTm9kZVR5cGUgfSBmcm9tICcuLy4uL2ludGVyZmFjZXMvbm9kZS5pbnRlcmZhY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTm9kZU1hbmFnZXIge1xyXG4gIGZpbHRlcmVkVGV4dDogU3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICB9XHJcblxyXG4gIGdlbmVyYXRlTm9kZUlkKCkge1xyXG4gICAgY29uc3QgbWluID0gMTtcclxuICAgIGNvbnN0IG1heCA9IDEwMDAwXHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcclxuICB9XHJcblxyXG4gIGdldEZpbHRlcmVkVGV4dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmZpbHRlcmVkVGV4dDtcclxuICB9XHJcblxyXG4gIGdldE5ld05vZGUobm9kZTogTm9kZSk6IE5vZGUge1xyXG4gICAgY29uc3QgaWQgPSB0aGlzLmdlbmVyYXRlTm9kZUlkKCk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBpZDogaWQsXHJcbiAgICAgIG5hbWU6ICduYW1lJywgXHJcbiAgICAgIHZhbHVlOiAndmFsdWUnLFxyXG4gICAgICBwYXJlbnQ6IG5vZGUudHlwZSxcclxuICAgICAgcGFyZW50Tm9kZTogbm9kZSxcclxuICAgICAgdHlwZTogTm9kZVR5cGUubGl0ZXJhbCxcclxuICAgICAgY2hpbGRyZW46IFtdLFxyXG4gICAgICBleHBhbmRlZDogZmFsc2VcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBzZXRGaWx0ZXJlZFRleHQodGV4dCkge1xyXG4gICAgdGhpcy5maWx0ZXJlZFRleHQgPSB0ZXh0O1xyXG4gIH1cclxufVxyXG4iXX0=