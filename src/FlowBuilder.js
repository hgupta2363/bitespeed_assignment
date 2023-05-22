import React, { useState, useRef, useCallback } from 'react';
import { Grid } from '@mui/material';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from 'reactflow';
import 'reactflow/dist/base.css';
import SideBarPanel from './Components/sidebar/SideBarPanel';
import { v4 as uuidv4 } from 'uuid';

import Header from './Components/Header';
import { toast } from 'react-toastify';
import { nodeTypesMap } from './constants';
export default function FlowBuilder() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(
    JSON.parse(localStorage.getItem('nodes')) ?? []
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState('');

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow'); //get type of node

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: uuidv4(),
        type,
        position,
        data: { label: '', setSelectedNode, selectedNode },
      }; //creating new node on drop

      setNodes((nds) => [...nds, newNode]); // add new node
    },
    [reactFlowInstance, selectedNode, setNodes]
  );
  // to  change text of selected node
  const addTextOnSelectedNode = (text) => {
    setNodes((nodes) => {
      return nodes.map((node) => {
        if (node.id === selectedNode) {
          return {
            ...node,
            data: { ...node.data, label: text },
          };
        } else return node;
      });
    });
  };
  // on back button click in setting panel
  const onBackSettings = () => {
    setSelectedNode('');
  };
  //save changes
  const onSaveChanges = () => {
    //target array of edges
    const edgeTargets = edges.map((edge) => edge.target);
    //count of Node without target
    // if node is not  available in target field of edges then increment count
    let emptyTargetNodeCount = nodes.reduce(
      (acc, node) => (!edgeTargets.includes(node.id) ? acc + 1 : acc),
      0
    );

    //
    if (nodes && nodes.length > 1 && emptyTargetNodeCount > 1) {
      // there are more than one Nodes and more than one Nodes have empty target handles
      toast.error('Can not Save');
    } else {
      localStorage.setItem('nodes', JSON.stringify(nodes));
      toast.success('Saved');
    }
  };
  console.log(
    nodes.filter((node) => node.id === selectedNode),
    'test'
  );
  return (
    <>
      <Header onSaveChanges={onSaveChanges} disable={nodes.length === 0} />
      <ReactFlowProvider>
        <Grid container justify='space-between'>
          <Grid xs={12} sm={12} md={10} sx={{}}>
            <div ref={reactFlowWrapper} style={{ height: '1000px' }}>
              {nodes.length === 0 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '10px',
                  }}
                >
                  <p style={{ fontSize: '14px' }}>
                    Drag and Drop new node from side panel{' '}
                  </p>{' '}
                </div>
              )}

              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={setReactFlowInstance}
                onDrop={onDrop}
                nodeTypes={nodeTypesMap}
                onDragOver={onDragOver}
                fitView
                onNodeClick={(node) => {}}
              >
                <Controls />
                <Background />
              </ReactFlow>
            </div>
          </Grid>
          <Grid xs={12} sm={12} md={2}>
            <SideBarPanel
              isNodeSelected={selectedNode ? true : false}
              addTextOnSelectedNode={addTextOnSelectedNode}
              onBackSettings={onBackSettings}
              selectedNodeText={
                nodes.filter((node) => node.id === selectedNode)[0]?.data?.label
              }
            />
          </Grid>
        </Grid>
      </ReactFlowProvider>
    </>
  );
}
