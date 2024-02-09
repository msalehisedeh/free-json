import { Component, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

import { Reasoning, ReasonCreatorInterface } from '@sedeh/free-json';
import { FreeJsonDialog } from './component/json-dialog.component';
import { AppService } from './app.service';

class ReasonProvider implements ReasonCreatorInterface {
  public enabled = false;
  constructor(private dialog: MatDialog){}

  provideReasoning(data: Reasoning): Observable<Reasoning> {
    if (this.enabled) {
      const subject = new Subject<Reasoning>();
      let dialogRef = this.dialog.open(FreeJsonDialog, {
        data: {reason: '', code: ''},
      });
      dialogRef.afterClosed().subscribe((result: any) => {
        data.description = result.reason;
        data.code = result.code;
        subject.next(data)
      });
      return subject;
    }
    return new BehaviorSubject<Reasoning>(data);
  }
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Free JSON';
  save = false;
  tree: any = {};
  lastVersion!: number;
  currentVersion!: number;
  leftJSONtree: any;
  rightJSONtree: any;
  logger!: ReasonProvider;
  decisionMakingResoning: any[] = [];
  counter = 1;
  selectedIndex = 0;
  dataSet = [
    {
      version: 0,
      tree: {
        firstname: "masoud",
        lastname: "salehi",
        address: {
          street: "2345 blagio dr",
          city: "Los Angeles",
          contries: ["US","BS","CS"]
        },
        data: [
          [
            "brakes"
          ]
        ]
      }
    }
  ];

  constructor(
    private dialog: MatDialog,
    private appservice: AppService, 
    private zone: NgZone
  ) {
    this.selectedIndex = 0;
    this.logger = new ReasonProvider(this.dialog);
    this.tree = this.dataSet[this.selectedIndex].tree;
    this.currentVersion = this.selectedIndex;
    this.rightJSONtree = this.tree;
    let newTree: any;
     this.appservice.getFullQB().subscribe(
       (response: any)=>{
        this.zone.run(() => {
          newTree = response;
          this.dataSet.push({
            version: this.counter++,
            tree: newTree
          });
        });
       }
     );
  }
  saveChanges() {
    this.save = true;
    setTimeout(()=>{this.save = false;},66);
  }

  resetTo(event: any) {
    this.zone.run(() => {
      this.selectedIndex = event.srcElement.selectedIndex;
      this.tree = this.dataSet[this.selectedIndex].tree;
      this.lastVersion = this.currentVersion;
      this.currentVersion = this.selectedIndex;
      this.leftJSONtree = this.rightJSONtree;
      this.rightJSONtree = this.tree;  
    });
  }

  delete(){
    if (this.dataSet.length > 1) {
      this.zone.run(() => {
        this.dataSet.splice(this.selectedIndex, 1);
        this.selectedIndex = this.selectedIndex>0 ? this.selectedIndex - 1 : this.selectedIndex;
        this.tree = this.dataSet[this.selectedIndex].tree;
        this.lastVersion = this.currentVersion;
        this.currentVersion = this.selectedIndex;
        this.leftJSONtree = this.rightJSONtree;
        this.rightJSONtree = this.tree;
      });
    }
  }

  objectChanged(event: any) {
    this.zone.run(() => {
      this.leftJSONtree = this.tree;
      this.rightJSONtree = event.data;
      this.decisionMakingResoning.push({
        reason: event.reasoning.description, 
        action: this.verbal(event.reasoning.action), 
        code: event.reasoning.code,
        time: (new Date()).toString()
      });
    });
  }

  getLatest(event: any) {
    this.dataSet.push({
      version: this.counter++,
      tree: event
    });
    
    this.zone.run(() => {
      // keep it in a list to allow reverting to any version.
      this.tree = event;
      this.selectedIndex = this.dataSet.length - 1; 
      this.lastVersion = this.currentVersion;
      this.currentVersion = this.selectedIndex;
      this.leftJSONtree = this.rightJSONtree;
      this.rightJSONtree = this.tree;
    });
  }
  private verbal(value: number) {
    const c: any = {
      1: 'add',
      2: 'remove',
      3: 'move',
      4: 'modified'
    }
    return c[value];
  }
}
