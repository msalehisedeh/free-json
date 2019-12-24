import * as tslib_1 from "tslib";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@sedeh/drag-enabled';
import { NodeManager } from './injectables/node-manager';
import { FreeJsonSearchField } from './components/json-search-field.component';
import { FreeJsonComponent } from './components/json.component';
import { FreeJsonLabel } from './components/json-label.component';
import { FreeJsonSearch } from './pipes/json-search';
var FreeJsonModule = /** @class */ (function () {
    function FreeJsonModule() {
    }
    FreeJsonModule = tslib_1.__decorate([
        NgModule({
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
        })
    ], FreeJsonModule);
    return FreeJsonModule;
}());
export { FreeJsonModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJlZS1qc29uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzZWRlaC9mcmVlLWpzb24vIiwic291cmNlcyI6WyJzcmMvYXBwL2ZyZWUtanNvbi9mcmVlLWpzb24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXJELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBMEJyRDtJQUFBO0lBQTZCLENBQUM7SUFBakIsY0FBYztRQXhCMUIsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLFlBQVk7Z0JBQ1osY0FBYztnQkFDZCxXQUFXO2FBQ1o7WUFDRCxZQUFZLEVBQUU7Z0JBQ1osaUJBQWlCO2dCQUNqQixhQUFhO2dCQUNiLGNBQWM7Z0JBQ2QsbUJBQW1CO2FBQ3BCO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLGlCQUFpQjthQUNsQjtZQUNELGVBQWUsRUFBRSxFQUNoQjtZQUNELFNBQVMsRUFBRTtnQkFDVCxjQUFjO2dCQUNkLFdBQVc7YUFDWjtZQUNELE9BQU8sRUFBRSxDQUFDLHNCQUFzQixDQUFDO1NBQ2xDLENBQUM7T0FFVyxjQUFjLENBQUc7SUFBRCxxQkFBQztDQUFBLEFBQTlCLElBQThCO1NBQWpCLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IERyYWdEcm9wTW9kdWxlIH0gZnJvbSAnQHNlZGVoL2RyYWctZW5hYmxlZCc7XHJcblxyXG5pbXBvcnQgeyBOb2RlTWFuYWdlciB9IGZyb20gJy4vaW5qZWN0YWJsZXMvbm9kZS1tYW5hZ2VyJztcclxuaW1wb3J0IHsgRnJlZUpzb25TZWFyY2hGaWVsZCB9IGZyb20gJy4vY29tcG9uZW50cy9qc29uLXNlYXJjaC1maWVsZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGcmVlSnNvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9qc29uLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZyZWVKc29uTGFiZWwgfSBmcm9tICcuL2NvbXBvbmVudHMvanNvbi1sYWJlbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGcmVlSnNvblNlYXJjaCB9IGZyb20gJy4vcGlwZXMvanNvbi1zZWFyY2gnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBEcmFnRHJvcE1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEZyZWVKc29uQ29tcG9uZW50LFxyXG4gICAgRnJlZUpzb25MYWJlbCxcclxuICAgIEZyZWVKc29uU2VhcmNoLFxyXG4gICAgRnJlZUpzb25TZWFyY2hGaWVsZFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgRnJlZUpzb25Db21wb25lbnRcclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1xyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBGcmVlSnNvblNlYXJjaCxcclxuICAgIE5vZGVNYW5hZ2VyXHJcbiAgXSxcclxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQV1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBGcmVlSnNvbk1vZHVsZSB7fVxyXG4iXX0=