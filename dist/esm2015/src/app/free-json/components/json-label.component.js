/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ViewChild, Renderer, Input, Output, EventEmitter } from '@angular/core';
export class FreeJsonLabel {
    /**
     * @param {?} renderer
     */
    constructor(renderer) {
        this.renderer = renderer;
        this.editName = false;
        this.editValue = false;
        this.onchange = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    nameLabelKeydown(event) {
        /** @type {?} */
        const code = event.which;
        if ((code === 13) || (code === 32)) {
            this.renderer.invokeElementMethod(event.target, "click");
            setTimeout(() => {
                if (this.nameEditor) {
                    this.renderer.invokeElementMethod(this.nameEditor.nativeElement, "focus");
                }
            }, 66);
        }
        else if (code === 27) {
            this.editName = false;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    valueLabelKeydown(event) {
        /** @type {?} */
        const code = event.which;
        if ((code === 13) || (code === 32)) {
            this.renderer.invokeElementMethod(event.target, "click");
            setTimeout(() => {
                if (this.valueEditor) {
                    this.renderer.invokeElementMethod(this.valueEditor.nativeElement, "focus");
                }
            }, 66);
        }
        else if (code === 27) {
            this.editValue = false;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    clickName(event) {
        event.stopPropagation();
        event.preventDefault();
        this.editName = this.node.name !== 'Root';
        setTimeout(() => {
            this.renderer.invokeElementMethod(this.nameEditor.nativeElement, "focus");
        }, 66);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    clickValue(event) {
        event.stopPropagation();
        event.preventDefault();
        this.editValue = this.node.value !== 'Object';
        setTimeout(() => {
            this.renderer.invokeElementMethod(this.valueEditor.nativeElement, "focus");
        }, 66);
    }
}
FreeJsonLabel.decorators = [
    { type: Component, args: [{
                selector: 'json-label',
                template: "<span *ngIf=\"editName && node.name !=='Root' && node.value !=='Object'\">\r\n    <input #nameEditor\r\n        type='text' \r\n        id=\"editName\"\r\n        placeholder=\"Name\"\r\n        (blur)=\"editName = false; onchange.emit();\" \r\n        [(ngModel)]='node.name'>\r\n</span>\r\n<span *ngIf='!editName && node.type !== 1'\r\n    class='locked name' \r\n    tabindex='0' \r\n    (keydown)='nameLabelKeydown($event)'\r\n    (click)=\"clickName($event)\"\r\n    [innerHTML]=\"node.name.length ? node.name : '&nbsp;'\">\r\n</span>\r\n<span *ngIf=\"editValue && node.name !=='Root' && node.value !=='Object'\">\r\n    <input #valueEditor\r\n        type='text' \r\n        id=\"editValue\"\r\n        placeholder=\"Value\"\r\n        (blur)=\"editValue = false; onchange.emit();\" \r\n        [(ngModel)]='node.value'>\r\n</span>\r\n<span *ngIf='!editValue && (node.type === 2 || node.type === 1) && node.value!=null'\r\n    class='locked' \r\n    [class.name]=\"node.type === 4\"\r\n    tabindex='0' \r\n    (keydown)='valueLabelKeydown($event)'\r\n    (click)=\"clickValue($event)\"\r\n    [innerHTML]=\"node.value.length ? node.value : '&nbsp;'\">\r\n</span>\r\n",
                styles: [":host{margin:10px 0}span.locked{display:inline-block;cursor:pointer;min-width:30px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}span.locked.name{font-weight:700;color:#000}span input{cursor:beam}"]
            }] }
];
/** @nocollapse */
FreeJsonLabel.ctorParameters = () => [
    { type: Renderer }
];
FreeJsonLabel.propDecorators = {
    nameEditor: [{ type: ViewChild, args: ["nameEditor",] }],
    valueEditor: [{ type: ViewChild, args: ["valueEditor",] }],
    node: [{ type: Input }],
    onchange: [{ type: Output, args: ["onchange",] }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1sYWJlbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvZnJlZS1qc29uLyIsInNvdXJjZXMiOlsic3JjL2FwcC9mcmVlLWpzb24vY29tcG9uZW50cy9qc29uLWxhYmVsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBUzFGLE1BQU07Ozs7SUFLSixZQUFvQixRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO3dCQUgzQixLQUFLO3lCQUNKLEtBQUs7d0JBZ0JOLElBQUksWUFBWSxFQUFFO0tBWjVCOzs7OztJQWNELGdCQUFnQixDQUFDLEtBQUs7O1FBQ3BCLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDekIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztZQUN6RCxVQUFVLENBQUMsR0FBRSxFQUFFO2dCQUNiLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2lCQUMzRTthQUNGLEVBQUMsRUFBRSxDQUFDLENBQUM7U0FDVDtRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztTQUN2QjtLQUNGOzs7OztJQUNELGlCQUFpQixDQUFDLEtBQUs7O1FBQ3JCLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDekIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztZQUN6RCxVQUFVLENBQUMsR0FBRSxFQUFFO2dCQUNiLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2lCQUM1RTthQUNGLEVBQUMsRUFBRSxDQUFDLENBQUM7U0FDVDtRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztTQUN4QjtLQUNGOzs7OztJQUVELFNBQVMsQ0FBQyxLQUFLO1FBQ2IsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFJLE1BQU0sQ0FBQztRQUN6QyxVQUFVLENBQUMsR0FBRSxFQUFFO1lBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUMzRSxFQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ1A7Ozs7O0lBQ0QsVUFBVSxDQUFDLEtBQUs7UUFDZCxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDeEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUksUUFBUSxDQUFDO1FBQzdDLFVBQVUsQ0FBQyxHQUFFLEVBQUU7WUFDYixJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQzVFLEVBQUMsRUFBRSxDQUFDLENBQUM7S0FDUDs7O1lBcEVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsaXFDQUEwQzs7YUFFM0M7Ozs7WUFSNkIsUUFBUTs7O3lCQWtCbkMsU0FBUyxTQUFDLFlBQVk7MEJBR3RCLFNBQVMsU0FBQyxhQUFhO21CQUd2QixLQUFLO3VCQUdMLE1BQU0sU0FBQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIFZpZXdDaGlsZCwgUmVuZGVyZXIsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi8uLi9pbnRlcmZhY2VzL25vZGUuaW50ZXJmYWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnanNvbi1sYWJlbCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2pzb24tbGFiZWwuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2pzb24tbGFiZWwuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRnJlZUpzb25MYWJlbCB7XHJcblxyXG4gIGVkaXROYW1lID0gZmFsc2U7XHJcbiAgZWRpdFZhbHVlID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgQFZpZXdDaGlsZChcIm5hbWVFZGl0b3JcIilcclxuICBuYW1lRWRpdG9yO1xyXG5cclxuICBAVmlld0NoaWxkKFwidmFsdWVFZGl0b3JcIilcclxuICB2YWx1ZUVkaXRvcjtcclxuXHJcbiAgQElucHV0KClcclxuICBub2RlOiBOb2RlO1xyXG5cclxuICBAT3V0cHV0KFwib25jaGFuZ2VcIilcclxuICBvbmNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgbmFtZUxhYmVsS2V5ZG93bihldmVudCkge1xyXG4gICAgY29uc3QgY29kZSA9IGV2ZW50LndoaWNoO1xyXG4gICAgaWYgKChjb2RlID09PSAxMykgfHwgKGNvZGUgPT09IDMyKSkge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QoZXZlbnQudGFyZ2V0LCBcImNsaWNrXCIpO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpPT57XHJcbiAgICAgICAgaWYgKHRoaXMubmFtZUVkaXRvcikge1xyXG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5pbnZva2VFbGVtZW50TWV0aG9kKHRoaXMubmFtZUVkaXRvci5uYXRpdmVFbGVtZW50LCBcImZvY3VzXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSw2Nik7XHJcblx0XHR9IGVsc2UgaWYgKGNvZGUgPT09IDI3KSB7XHJcbiAgICAgIHRoaXMuZWRpdE5hbWUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbiAgdmFsdWVMYWJlbEtleWRvd24oZXZlbnQpIHtcclxuICAgIGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcclxuICAgIGlmICgoY29kZSA9PT0gMTMpIHx8IChjb2RlID09PSAzMikpIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5pbnZva2VFbGVtZW50TWV0aG9kKGV2ZW50LnRhcmdldCwgXCJjbGlja1wiKTtcclxuICAgICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICAgIGlmICh0aGlzLnZhbHVlRWRpdG9yKSB7XHJcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QodGhpcy52YWx1ZUVkaXRvci5uYXRpdmVFbGVtZW50LCBcImZvY3VzXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSw2Nik7XHJcblx0XHR9IGVsc2UgaWYgKGNvZGUgPT09IDI3KSB7XHJcbiAgICAgIHRoaXMuZWRpdFZhbHVlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjbGlja05hbWUoZXZlbnQpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIHRoaXMuZWRpdE5hbWUgPSB0aGlzLm5vZGUubmFtZSAhPT0nUm9vdCc7XHJcbiAgICBzZXRUaW1lb3V0KCgpPT57XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuaW52b2tlRWxlbWVudE1ldGhvZCh0aGlzLm5hbWVFZGl0b3IubmF0aXZlRWxlbWVudCwgXCJmb2N1c1wiKTtcclxuICAgIH0sNjYpO1xyXG4gIH1cclxuICBjbGlja1ZhbHVlKGV2ZW50KSB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB0aGlzLmVkaXRWYWx1ZSA9IHRoaXMubm9kZS52YWx1ZSAhPT0nT2JqZWN0JztcclxuICAgIHNldFRpbWVvdXQoKCk9PntcclxuICAgICAgdGhpcy5yZW5kZXJlci5pbnZva2VFbGVtZW50TWV0aG9kKHRoaXMudmFsdWVFZGl0b3IubmF0aXZlRWxlbWVudCwgXCJmb2N1c1wiKTtcclxuICAgIH0sNjYpO1xyXG4gIH1cclxufVxyXG5cclxuIl19