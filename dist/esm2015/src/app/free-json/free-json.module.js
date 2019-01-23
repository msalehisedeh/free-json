/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@sedeh/drag-enabled';
import { NodeManager } from './injectables/node-manager';
import { FreeJsonSearchField } from './components/json-search-field.component';
import { FreeJsonComponent } from './components/json.component';
import { FreeJsonLabel } from './components/json-label.component';
import { FreeJsonSearch } from './pipes/json-search';
export class FreeJsonModule {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJlZS1qc29uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzZWRlaC9mcmVlLWpzb24vIiwic291cmNlcyI6WyJzcmMvYXBwL2ZyZWUtanNvbi9mcmVlLWpzb24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXJELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBMEJyRCxNQUFNOzs7WUF4QkwsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLGNBQWM7b0JBQ2QsV0FBVztpQkFDWjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osaUJBQWlCO29CQUNqQixhQUFhO29CQUNiLGNBQWM7b0JBQ2QsbUJBQW1CO2lCQUNwQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsaUJBQWlCO2lCQUNsQjtnQkFDRCxlQUFlLEVBQUUsRUFDaEI7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULGNBQWM7b0JBQ2QsV0FBVztpQkFDWjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQzthQUNsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgRHJhZ0Ryb3BNb2R1bGUgfSBmcm9tICdAc2VkZWgvZHJhZy1lbmFibGVkJztcclxuXHJcbmltcG9ydCB7IE5vZGVNYW5hZ2VyIH0gZnJvbSAnLi9pbmplY3RhYmxlcy9ub2RlLW1hbmFnZXInO1xyXG5pbXBvcnQgeyBGcmVlSnNvblNlYXJjaEZpZWxkIH0gZnJvbSAnLi9jb21wb25lbnRzL2pzb24tc2VhcmNoLWZpZWxkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZyZWVKc29uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2pzb24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgRnJlZUpzb25MYWJlbCB9IGZyb20gJy4vY29tcG9uZW50cy9qc29uLWxhYmVsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZyZWVKc29uU2VhcmNoIH0gZnJvbSAnLi9waXBlcy9qc29uLXNlYXJjaCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIERyYWdEcm9wTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgRnJlZUpzb25Db21wb25lbnQsXHJcbiAgICBGcmVlSnNvbkxhYmVsLFxyXG4gICAgRnJlZUpzb25TZWFyY2gsXHJcbiAgICBGcmVlSnNvblNlYXJjaEZpZWxkXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBGcmVlSnNvbkNvbXBvbmVudFxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIEZyZWVKc29uU2VhcmNoLFxyXG4gICAgTm9kZU1hbmFnZXJcclxuICBdLFxyXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEZyZWVKc29uTW9kdWxlIHt9XHJcbiJdfQ==