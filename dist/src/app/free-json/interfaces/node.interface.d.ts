export declare enum NodeType {
    literal = 1,
    pair = 2,
    json = 3,
    array = 4,
}
export interface Node {
    id: number;
    name: string;
    value: string;
    parent: NodeType;
    parentNode?: Node;
    type: NodeType;
    children: Node[];
    expanded?: boolean;
    isRoot?: boolean;
}
export declare enum ActionType {
    add = 1,
    remove = 2,
    move = 3,
    modified = 4,
}
export interface Reasoning {
    code: string;
    description: string;
    action: ActionType;
    node: string;
}
