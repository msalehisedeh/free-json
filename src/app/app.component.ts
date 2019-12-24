import { Component } from '@angular/core';
import { AppService } from './app.service';

import { Reasoning } from './free-json/interfaces/node.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Free JSON';
  save = false;
  tree: {};
  leftJSONtree;
  rightJSONtree;
  decisionMakingResoning: Reasoning[] = undefined; //[];
  decisionMakingCodes: String[] = undefined;//[];
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

  constructor(private appservice: AppService) {
    this.selectedIndex = 0;
    this.tree = this.dataSet[this.selectedIndex].tree;
     this.appservice.getFullQB().subscribe(
       (response)=>{
         this.dataSet.push({
           version: this.counter++,
           tree: response.json()
         });
       }
     );
     this.leftJSONtree = this.tree;
     this.rightJSONtree = this.tree;
  }
 
  saveChanges() {
    this.save = true;
    setTimeout(()=>{this.save = false;},66);
  }

  resetTo(event) {
    this.selectedIndex = event.srcElement.selectedIndex;
    this.tree = this.dataSet[this.selectedIndex].tree;
  }

  delete(){
    if (this.dataSet.length > 1) {
      this.dataSet.splice(this.selectedIndex, 1);
      this.selectedIndex = this.selectedIndex>0 ? this.selectedIndex - 1 : this.selectedIndex;
      this.tree = this.dataSet[this.selectedIndex].tree;
    }
  }

  objectChanged(event) {
    this.rightJSONtree = event.data;
//    this.decisionMakingResoning = event.reasoning;
  }

  getLatest(event) {
    this.dataSet.push({
      version: this.counter++,
      tree: event
    });
    
    setTimeout(()=>{
      // keep it in a list to allow reverting to any version.
      this.tree = event;
      this.selectedIndex = this.dataSet.length - 1;
    }, 333);
  }
}
