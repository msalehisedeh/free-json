/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ViewChild, Renderer, Input, Output, EventEmitter } from '@angular/core';
var FreeJsonLabel = /** @class */ (function () {
    function FreeJsonLabel(renderer) {
        this.renderer = renderer;
        this.editName = false;
        this.editValue = false;
        this.onchange = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    FreeJsonLabel.prototype.nameLabelKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        /** @type {?} */
        var code = event.which;
        if ((code === 13) || (code === 32)) {
            this.renderer.invokeElementMethod(event.target, "click");
            setTimeout(function () {
                if (_this.nameEditor) {
                    _this.renderer.invokeElementMethod(_this.nameEditor.nativeElement, "focus");
                }
            }, 66);
        }
        else if (code === 27) {
            this.editName = false;
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FreeJsonLabel.prototype.valueLabelKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        /** @type {?} */
        var code = event.which;
        if ((code === 13) || (code === 32)) {
            this.renderer.invokeElementMethod(event.target, "click");
            setTimeout(function () {
                if (_this.valueEditor) {
                    _this.renderer.invokeElementMethod(_this.valueEditor.nativeElement, "focus");
                }
            }, 66);
        }
        else if (code === 27) {
            this.editValue = false;
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FreeJsonLabel.prototype.clickName = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        event.stopPropagation();
        event.preventDefault();
        this.editName = this.node.name !== 'Root';
        setTimeout(function () {
            _this.renderer.invokeElementMethod(_this.nameEditor.nativeElement, "focus");
        }, 66);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FreeJsonLabel.prototype.clickValue = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        event.stopPropagation();
        event.preventDefault();
        this.editValue = this.node.value !== 'Object';
        setTimeout(function () {
            _this.renderer.invokeElementMethod(_this.valueEditor.nativeElement, "focus");
        }, 66);
    };
    FreeJsonLabel.decorators = [
        { type: Component, args: [{
                    selector: 'json-label',
                    template: "<span *ngIf=\"editName && node.name !=='Root' && node.value !=='Object'\">\r\n    <input #nameEditor\r\n        type='text' \r\n        id=\"editName\"\r\n        placeholder=\"Name\"\r\n        (blur)=\"editName = false; onchange.emit();\" \r\n        [(ngModel)]='node.name'>\r\n</span>\r\n<span *ngIf='!editName && node.type !== 1'\r\n    class='locked name' \r\n    tabindex='0' \r\n    (keydown)='nameLabelKeydown($event)'\r\n    (click)=\"clickName($event)\"\r\n    [innerHTML]=\"node.name.length ? node.name : '&nbsp;'\">\r\n</span>\r\n<span *ngIf=\"editValue && node.name !=='Root' && node.value !=='Object'\">\r\n    <input #valueEditor\r\n        type='text' \r\n        id=\"editValue\"\r\n        placeholder=\"Value\"\r\n        (blur)=\"editValue = false; onchange.emit();\" \r\n        [(ngModel)]='node.value'>\r\n</span>\r\n<span *ngIf='!editValue && (node.type === 2 || node.type === 1) && node.value!=null'\r\n    class='locked' \r\n    [class.name]=\"node.type === 4\"\r\n    tabindex='0' \r\n    (keydown)='valueLabelKeydown($event)'\r\n    (click)=\"clickValue($event)\"\r\n    [innerHTML]=\"node.value.length ? node.value : '&nbsp;'\">\r\n</span>\r\n",
                    styles: [":host{margin:10px 0}span.locked{display:inline-block;cursor:pointer;min-width:30px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}span.locked.name{font-weight:700;color:#000}span input{cursor:beam}"]
                }] }
    ];
    /** @nocollapse */
    FreeJsonLabel.ctorParameters = function () { return [
        { type: Renderer }
    ]; };
    FreeJsonLabel.propDecorators = {
        nameEditor: [{ type: ViewChild, args: ["nameEditor",] }],
        valueEditor: [{ type: ViewChild, args: ["valueEditor",] }],
        node: [{ type: Input }],
        onchange: [{ type: Output, args: ["onchange",] }]
    };
    return FreeJsonLabel;
}());
export { FreeJsonLabel };
if (false) {
    /** @type {?} */
    FreeJsonLabel.prototype.editName;
    /** @type {?} */
    FreeJsonLabel.prototype.editValue;
    /** @type {?} */
    FreeJsonLabel.prototype.nameEditor;
    /** @type {?} */
    FreeJsonLabel.prototype.valueEditor;
    /** @type {?} */
    FreeJsonLabel.prototype.node;
    /** @type {?} */
    FreeJsonLabel.prototype.onchange;
    /** @type {?} */
    FreeJsonLabel.prototype.renderer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1sYWJlbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9mcmVlLWpzb24vIiwic291cmNlcyI6WyJzcmMvYXBwL2ZyZWUtanNvbi9jb21wb25lbnRzL2pzb24tbGFiZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7O0lBY3hGLHVCQUFvQixRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO3dCQUgzQixLQUFLO3lCQUNKLEtBQUs7d0JBZ0JOLElBQUksWUFBWSxFQUFFO0tBWjVCOzs7OztJQWNELHdDQUFnQjs7OztJQUFoQixVQUFpQixLQUFLO1FBQXRCLGlCQVlDOztRQVhDLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDekIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztZQUN6RCxVQUFVLENBQUM7Z0JBQ1QsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQ3BCLEtBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBQzNFO2FBQ0YsRUFBQyxFQUFFLENBQUMsQ0FBQztTQUNUO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1NBQ3ZCO0tBQ0Y7Ozs7O0lBQ0QseUNBQWlCOzs7O0lBQWpCLFVBQWtCLEtBQUs7UUFBdkIsaUJBWUM7O1FBWEMsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUN6QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3pELFVBQVUsQ0FBQztnQkFDVCxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDckIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztpQkFDNUU7YUFDRixFQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ1Q7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7U0FDeEI7S0FDRjs7Ozs7SUFFRCxpQ0FBUzs7OztJQUFULFVBQVUsS0FBSztRQUFmLGlCQU9DO1FBTkMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFJLE1BQU0sQ0FBQztRQUN6QyxVQUFVLENBQUM7WUFDVCxLQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQzNFLEVBQUMsRUFBRSxDQUFDLENBQUM7S0FDUDs7Ozs7SUFDRCxrQ0FBVTs7OztJQUFWLFVBQVcsS0FBSztRQUFoQixpQkFPQztRQU5DLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN4QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSSxRQUFRLENBQUM7UUFDN0MsVUFBVSxDQUFDO1lBQ1QsS0FBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUM1RSxFQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ1A7O2dCQXBFRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFlBQVk7b0JBQ3RCLGlxQ0FBMEM7O2lCQUUzQzs7OztnQkFSNkIsUUFBUTs7OzZCQWtCbkMsU0FBUyxTQUFDLFlBQVk7OEJBR3RCLFNBQVMsU0FBQyxhQUFhO3VCQUd2QixLQUFLOzJCQUdMLE1BQU0sU0FBQyxVQUFVOzt3QkEzQnBCOztTQVNhLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgVmlld0NoaWxkLCBSZW5kZXJlciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IE5vZGUgfSBmcm9tICcuLy4uL2ludGVyZmFjZXMvbm9kZS5pbnRlcmZhY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdqc29uLWxhYmVsJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vanNvbi1sYWJlbC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vanNvbi1sYWJlbC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGcmVlSnNvbkxhYmVsIHtcclxuXHJcbiAgZWRpdE5hbWUgPSBmYWxzZTtcclxuICBlZGl0VmFsdWUgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIpIHtcclxuXHJcbiAgfVxyXG5cclxuICBAVmlld0NoaWxkKFwibmFtZUVkaXRvclwiKVxyXG4gIG5hbWVFZGl0b3I7XHJcblxyXG4gIEBWaWV3Q2hpbGQoXCJ2YWx1ZUVkaXRvclwiKVxyXG4gIHZhbHVlRWRpdG9yO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIG5vZGU6IE5vZGU7XHJcblxyXG4gIEBPdXRwdXQoXCJvbmNoYW5nZVwiKVxyXG4gIG9uY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBuYW1lTGFiZWxLZXlkb3duKGV2ZW50KSB7XHJcbiAgICBjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcbiAgICBpZiAoKGNvZGUgPT09IDEzKSB8fCAoY29kZSA9PT0gMzIpKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuaW52b2tlRWxlbWVudE1ldGhvZChldmVudC50YXJnZXQsIFwiY2xpY2tcIik7XHJcbiAgICAgIHNldFRpbWVvdXQoKCk9PntcclxuICAgICAgICBpZiAodGhpcy5uYW1lRWRpdG9yKSB7XHJcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QodGhpcy5uYW1lRWRpdG9yLm5hdGl2ZUVsZW1lbnQsIFwiZm9jdXNcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LDY2KTtcclxuXHRcdH0gZWxzZSBpZiAoY29kZSA9PT0gMjcpIHtcclxuICAgICAgdGhpcy5lZGl0TmFtZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuICB2YWx1ZUxhYmVsS2V5ZG93bihldmVudCkge1xyXG4gICAgY29uc3QgY29kZSA9IGV2ZW50LndoaWNoO1xyXG4gICAgaWYgKChjb2RlID09PSAxMykgfHwgKGNvZGUgPT09IDMyKSkge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QoZXZlbnQudGFyZ2V0LCBcImNsaWNrXCIpO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpPT57XHJcbiAgICAgICAgaWYgKHRoaXMudmFsdWVFZGl0b3IpIHtcclxuICAgICAgICAgIHRoaXMucmVuZGVyZXIuaW52b2tlRWxlbWVudE1ldGhvZCh0aGlzLnZhbHVlRWRpdG9yLm5hdGl2ZUVsZW1lbnQsIFwiZm9jdXNcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LDY2KTtcclxuXHRcdH0gZWxzZSBpZiAoY29kZSA9PT0gMjcpIHtcclxuICAgICAgdGhpcy5lZGl0VmFsdWUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNsaWNrTmFtZShldmVudCkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdGhpcy5lZGl0TmFtZSA9IHRoaXMubm9kZS5uYW1lICE9PSdSb290JztcclxuICAgIHNldFRpbWVvdXQoKCk9PntcclxuICAgICAgdGhpcy5yZW5kZXJlci5pbnZva2VFbGVtZW50TWV0aG9kKHRoaXMubmFtZUVkaXRvci5uYXRpdmVFbGVtZW50LCBcImZvY3VzXCIpO1xyXG4gICAgfSw2Nik7XHJcbiAgfVxyXG4gIGNsaWNrVmFsdWUoZXZlbnQpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIHRoaXMuZWRpdFZhbHVlID0gdGhpcy5ub2RlLnZhbHVlICE9PSdPYmplY3QnO1xyXG4gICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QodGhpcy52YWx1ZUVkaXRvci5uYXRpdmVFbGVtZW50LCBcImZvY3VzXCIpO1xyXG4gICAgfSw2Nik7XHJcbiAgfVxyXG59XHJcblxyXG4iXX0=