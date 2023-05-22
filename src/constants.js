import MessegeNode from './Components/nodesTypes/MessegeNodeFlow';
export const nodeTypes = {
  messegeNode: 'messegeNode',
};
export const nodeTypesMap = {
  [nodeTypes.messegeNode]: MessegeNode,
};
/*
to add new node type
1  add this type in nodeTypes  constant
2  design a component in nodeTypes folder which will be mapped to this  
nodetype 
3 add a draggable component for this node type in Nodepanel 
*/
