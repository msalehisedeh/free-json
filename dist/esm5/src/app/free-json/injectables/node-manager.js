import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { NodeType } from './../interfaces/node.interface';
var NodeManager = /** @class */ (function () {
    function NodeManager() {
    }
    NodeManager.prototype.generateNodeId = function () {
        var min = 1;
        var max = 10000;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    NodeManager.prototype.getFilteredText = function () {
        return this.filteredText;
    };
    NodeManager.prototype.getNewNode = function (node) {
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
    NodeManager.prototype.setFilteredText = function (text) {
        this.filteredText = text;
    };
    NodeManager = tslib_1.__decorate([
        Injectable()
    ], NodeManager);
    return NodeManager;
}());
export { NodeManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL2ZyZWUtanNvbi8iLCJzb3VyY2VzIjpbInNyYy9hcHAvZnJlZS1qc29uL2luamVjdGFibGVzL25vZGUtbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQVEsUUFBUSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFHaEU7SUFHRTtJQUNBLENBQUM7SUFFRCxvQ0FBYyxHQUFkO1FBQ0UsSUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsSUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFBO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQzNELENBQUM7SUFFRCxxQ0FBZSxHQUFmO1FBQ0UsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFFRCxnQ0FBVSxHQUFWLFVBQVcsSUFBVTtRQUNuQixJQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDakMsT0FBTztZQUNMLEVBQUUsRUFBRSxFQUFFO1lBQ04sSUFBSSxFQUFFLE1BQU07WUFDWixLQUFLLEVBQUUsT0FBTztZQUNkLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNqQixVQUFVLEVBQUUsSUFBSTtZQUNoQixJQUFJLEVBQUUsUUFBUSxDQUFDLE9BQU87WUFDdEIsUUFBUSxFQUFFLEVBQUU7WUFDWixRQUFRLEVBQUUsS0FBSztTQUNoQixDQUFDO0lBQ0osQ0FBQztJQUVELHFDQUFlLEdBQWYsVUFBZ0IsSUFBSTtRQUNsQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDO0lBaENVLFdBQVc7UUFEdkIsVUFBVSxFQUFFO09BQ0EsV0FBVyxDQWlDdkI7SUFBRCxrQkFBQztDQUFBLEFBakNELElBaUNDO1NBakNZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBOb2RlLCBOb2RlVHlwZSB9IGZyb20gJy4vLi4vaW50ZXJmYWNlcy9ub2RlLmludGVyZmFjZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOb2RlTWFuYWdlciB7XHJcbiAgZmlsdGVyZWRUZXh0OiBTdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gIH1cclxuXHJcbiAgZ2VuZXJhdGVOb2RlSWQoKSB7XHJcbiAgICBjb25zdCBtaW4gPSAxO1xyXG4gICAgY29uc3QgbWF4ID0gMTAwMDBcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xyXG4gIH1cclxuXHJcbiAgZ2V0RmlsdGVyZWRUZXh0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyZWRUZXh0O1xyXG4gIH1cclxuXHJcbiAgZ2V0TmV3Tm9kZShub2RlOiBOb2RlKTogTm9kZSB7XHJcbiAgICBjb25zdCBpZCA9IHRoaXMuZ2VuZXJhdGVOb2RlSWQoKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGlkOiBpZCxcclxuICAgICAgbmFtZTogJ25hbWUnLCBcclxuICAgICAgdmFsdWU6ICd2YWx1ZScsXHJcbiAgICAgIHBhcmVudDogbm9kZS50eXBlLFxyXG4gICAgICBwYXJlbnROb2RlOiBub2RlLFxyXG4gICAgICB0eXBlOiBOb2RlVHlwZS5saXRlcmFsLFxyXG4gICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgIGV4cGFuZGVkOiBmYWxzZVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHNldEZpbHRlcmVkVGV4dCh0ZXh0KSB7XHJcbiAgICB0aGlzLmZpbHRlcmVkVGV4dCA9IHRleHQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==