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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZnJlZS1qc29uLyIsInNvdXJjZXMiOlsic3JjL2FwcC9mcmVlLWpzb24vaW5qZWN0YWJsZXMvbm9kZS1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBUSxRQUFRLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUdoRSxNQUFNO0lBR0o7S0FDQzs7OztJQUVELGNBQWM7O1FBQ1osTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDOztRQUNkLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQTtRQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0tBQzFEOzs7O0lBRUQsZUFBZTtRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO0tBQzFCOzs7OztJQUVELFVBQVUsQ0FBQyxJQUFVOztRQUNuQixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDakMsTUFBTSxDQUFDO1lBQ0wsRUFBRSxFQUFFLEVBQUU7WUFDTixJQUFJLEVBQUUsTUFBTTtZQUNaLEtBQUssRUFBRSxPQUFPO1lBQ2QsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2pCLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLElBQUksRUFBRSxRQUFRLENBQUMsT0FBTztZQUN0QixRQUFRLEVBQUUsRUFBRTtZQUNaLFFBQVEsRUFBRSxLQUFLO1NBQ2hCLENBQUM7S0FDSDs7Ozs7SUFFRCxlQUFlLENBQUMsSUFBSTtRQUNsQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztLQUMxQjs7O1lBakNGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBOb2RlLCBOb2RlVHlwZSB9IGZyb20gJy4vLi4vaW50ZXJmYWNlcy9ub2RlLmludGVyZmFjZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOb2RlTWFuYWdlciB7XHJcbiAgZmlsdGVyZWRUZXh0OiBTdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gIH1cclxuXHJcbiAgZ2VuZXJhdGVOb2RlSWQoKSB7XHJcbiAgICBjb25zdCBtaW4gPSAxO1xyXG4gICAgY29uc3QgbWF4ID0gMTAwMDBcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xyXG4gIH1cclxuXHJcbiAgZ2V0RmlsdGVyZWRUZXh0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyZWRUZXh0O1xyXG4gIH1cclxuXHJcbiAgZ2V0TmV3Tm9kZShub2RlOiBOb2RlKTogTm9kZSB7XHJcbiAgICBjb25zdCBpZCA9IHRoaXMuZ2VuZXJhdGVOb2RlSWQoKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGlkOiBpZCxcclxuICAgICAgbmFtZTogJ25hbWUnLCBcclxuICAgICAgdmFsdWU6ICd2YWx1ZScsXHJcbiAgICAgIHBhcmVudDogbm9kZS50eXBlLFxyXG4gICAgICBwYXJlbnROb2RlOiBub2RlLFxyXG4gICAgICB0eXBlOiBOb2RlVHlwZS5saXRlcmFsLFxyXG4gICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgIGV4cGFuZGVkOiBmYWxzZVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHNldEZpbHRlcmVkVGV4dCh0ZXh0KSB7XHJcbiAgICB0aGlzLmZpbHRlcmVkVGV4dCA9IHRleHQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==