

# Welcome to Free JSON!

Have you ever wanted to have a way of generating and manipulating a complex JSON structure through graphical means?

This library provides Angular 4 components that enables you to create / modify JSON structures through drag/drop, or click/edit just by adding FreeJsonModule into your AppModule.


# Version 0.0.0

```
MODULE: 
		FreeJsonModule

DEPENDENCIES: 
    "drag-enabled": "^0.0.1",
    "font-awesome": "^4.7.0",
```

Interfaces
```
export enum NodeType {
  literal = 1,
  pair = 2,
  json = 3,
  array = 4
}
export interface Node {
  id: number,
  name: string,
  value: string,
  parent: NodeType,
  parentNode?: Node,
  type: NodeType,
  children: Node[],
  expanded?: boolean,
  isRoot?: boolean
}
export enum ActionType {
  add = 1,
  remove = 2,
  move = 3,
  modified = 4
}
```

The following are available functionalities presented in this version:

Sample code
```
<free-json 
	[root]="JSONtree"
	[save]="save"
    (onchange)="objectChanged($event)"
    (onpublish)="getLatest($event)" ></free-json>	

	........................

myJSONtree = {
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
```

Sample of code in Action:

![alt text](https://raw.githubusercontent.com/msalehisedeh/free-json/master/sample.png  "What you would see when a free JSON is used")


[Source code](https://github.com/msalehisedeh/free-json)
