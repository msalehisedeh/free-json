

# Welcome to Free JSON!

Have you ever wanted to have a way of generating and manipulating a complex JSON structure through graphical means?

This library provides Angular 4 components that enables you to create / modify JSON structures through drag/drop, or click/edit just by adding FreeJsonModule into your AppModule.

**NOTE:** If your project still is angular 2, 4, or 5; please luck-down your version reference to flexible table to 1.1.1 version by removing ^ from the version dependency in your package json. Otherwise for Angular 6+, please use 1.1.2 version or higher.

**NOTE:** Starting with version 1.2.1 you need to import this library through @sedeh/free-json.

[Live Demo](https://free-json.stackblitz.io)  | [Source code](https://github.com/msalehisedeh/free-json/tree/master/src/app) | [Comments/Requests](https://github.com/msalehisedeh/free-json/issues)

## Dependencies

```
MODULE: 
		FreeJsonModule

DEPENDENCIES: 
    "@sedeh/drag-enabled": "^2.1.0",
    "font-awesome": "^4.7.0",
```

## Interfaces

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

## Sample code

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

| Version  |Description                                                                                                                                  |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
|1.2.2     |updated dependencies to fix IE drag/drop problem.                                                                                            |
|1.2.1     |updated dependencies.                                                                                                                        |
|1.2.0     |It was brought to my attention that some users have trouble using my components in their angular 6 environment. Since I had only updated few dependencies when moved to Angular 6, I am thinking dependencies are causing issues. So, for this release, I am updating all dependencies to what Angular 6 applications are expecting to have. Please let me know if this is fixing or not fixing any issues you are facing. |
|1.1.2     |rolling to angular 6+ after fixing the dependency issue.                                                                                     |
|1.1.1     |Temporary roll-back to angular 5. I forgot to luck-down the dependencies for angular 5 before upgrading to angular 6. this will cause problem if you are still using angular 5.  |
|1.1.0     |Updated libraries to become compatible with Angular 6+.                                                                                      |
|1.0.0     |Compiled with AOT option and resolved issues.                                                                                                |
|0.0.2     |updated dependencies.                                                                                                                        |
|0.0.0     |Initial release.                                                                                                                             |


Sample of code in Action:

![alt text](https://raw.githubusercontent.com/msalehisedeh/free-json/master/sample.png  "What you would see when a free JSON is used")

