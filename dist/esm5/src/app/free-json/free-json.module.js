/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DragDropModule } from 'drag-enabled';
import { NodeManager } from './injectables/node-manager';
import { FreeJsonSearchField } from './components/json-search-field.component';
import { FreeJsonComponent } from './components/json.component';
import { FreeJsonLabel } from './components/json-label.component';
import { FreeJsonSearch } from './pipes/json-search';
var FreeJsonModule = /** @class */ (function () {
    function FreeJsonModule() {
    }
    FreeJsonModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        DragDropModule,
                        FormsModule
                    ],
                    declarations: [
                        FreeJsonComponent,
                        FreeJsonLabel,
                        FreeJsonSearch,
                        FreeJsonSearchField
                    ],
                    exports: [
                        FreeJsonComponent
                    ],
                    entryComponents: [],
                    providers: [
                        FreeJsonSearch,
                        NodeManager
                    ],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA]
                },] }
    ];
    return FreeJsonModule;
}());
export { FreeJsonModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJlZS1qc29uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2ZyZWUtanNvbi8iLCJzb3VyY2VzIjpbInNyYy9hcHAvZnJlZS1qc29uL2ZyZWUtanNvbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzlDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7OztnQkFFcEQsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGNBQWM7d0JBQ2QsV0FBVztxQkFDWjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osaUJBQWlCO3dCQUNqQixhQUFhO3dCQUNiLGNBQWM7d0JBQ2QsbUJBQW1CO3FCQUNwQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsaUJBQWlCO3FCQUNsQjtvQkFDRCxlQUFlLEVBQUUsRUFDaEI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULGNBQWM7d0JBQ2QsV0FBVztxQkFDWjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztpQkFDbEM7O3lCQWpDRDs7U0FtQ2EsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgRHJhZ0Ryb3BNb2R1bGUgfSBmcm9tICdkcmFnLWVuYWJsZWQnO1xyXG5pbXBvcnQgeyBOb2RlTWFuYWdlciB9IGZyb20gJy4vaW5qZWN0YWJsZXMvbm9kZS1tYW5hZ2VyJztcclxuaW1wb3J0IHsgRnJlZUpzb25TZWFyY2hGaWVsZCB9IGZyb20gJy4vY29tcG9uZW50cy9qc29uLXNlYXJjaC1maWVsZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGcmVlSnNvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9qc29uLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZyZWVKc29uTGFiZWwgfSBmcm9tICcuL2NvbXBvbmVudHMvanNvbi1sYWJlbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGcmVlSnNvblNlYXJjaCB9IGZyb20gJy4vcGlwZXMvanNvbi1zZWFyY2gnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBEcmFnRHJvcE1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEZyZWVKc29uQ29tcG9uZW50LFxyXG4gICAgRnJlZUpzb25MYWJlbCxcclxuICAgIEZyZWVKc29uU2VhcmNoLFxyXG4gICAgRnJlZUpzb25TZWFyY2hGaWVsZFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgRnJlZUpzb25Db21wb25lbnRcclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1xyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBGcmVlSnNvblNlYXJjaCxcclxuICAgIE5vZGVNYW5hZ2VyXHJcbiAgXSxcclxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQV1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBGcmVlSnNvbk1vZHVsZSB7fVxyXG4iXX0=