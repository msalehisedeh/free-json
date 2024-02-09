import {Component, Inject} from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

export interface DialogData {
    reason: string;
    code: string;
}

@Component({
    templateUrl: './json-dialog.component.html',
    styleUrls: ['./json-dialog.component.scss'],
    standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class FreeJsonDialog {
  constructor(
    public dialogRef: MatDialogRef<FreeJsonDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ){
  }

  closeDialog() {
    this.dialogRef.close({});
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

