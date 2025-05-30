import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Background,
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  Controls,
  Panel,
  MarkerType
} from '@xyflow/react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@mui/material';
import RoleNode from './RoleNode';
import FloatingEdge from './FloatingEdge';
import { CustomConnectionLine, connectionLineStyle } from './CustomConnectionLine';
import PlotNode from './PlotNode';
import ThemeNode from './ThemeNode';
import CharacterNode from './CharacterNode';
import '@xyflow/react/dist/style.css';
import './mindmap.css';



const getId = () => uuidv4();
// const flowKey = 'example-flow';
const getNodeId = () => `randomnode_${+new Date()}`;

const nodeTypes = {
  role: RoleNode,
  plot: PlotNode,
  theme: ThemeNode,
  character: CharacterNode
};

const edgeTypes = {
  floating: FloatingEdge,
};

const defaultEdgeOptions = {
  type: 'floating',
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: '#b1b1b7',
  },
};

const AddNodeOnEdgeDrop = ({ onNodeClick, nodeType = 'role', dataSource, onChange }: any) => {
  let initialNodes: any = dataSource?.nodes || [{
    id: uuidv4(),
    type: nodeType,
    data: { label: 'Node' },
    position: { x: 0, y: 50 },
  }];

  let initEdges: any = [];

  const reactFlowWrapper = useRef(null);
  const { setViewport, screenToFlowPosition } = useReactFlow();
  const [rfInstance, setRfInstance] = useState<any>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>(initEdges);
  const onConnect = useCallback(
    (params: any) => {
      setEdges((eds = []) => {
        return addEdge({
          ...params,
          type: 'floating',
        }, eds);
      });
    },
    [],
  );

  const onConnectEnd = useCallback(
    (event: any, connectionState: any) => {
      if (!connectionState.isValid) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const id: any = getId();
        const { clientX, clientY } =
          'changedTouches' in event ? event.changedTouches[0] : event;
        const newNode: any = {
          id,
          position: screenToFlowPosition({
            x: clientX,
            y: clientY,
          }),
          data: { label: `Node` },
          origin: [0.5, 0.0],
          type: nodeType
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds = []) => {
          return eds.concat({
            id,
            source: connectionState.fromNode.id,
            type: 'floating',
            target: id
          })
        });
      }
    },
    [screenToFlowPosition],
  );

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow: any = rfInstance.toObject();
      console.log('onSave minde', flow)
      onChange?.(flow);
      // localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    // const restoreFlow = async () => {
    //   const flow = JSON.parse(localStorage.getItem(flowKey));

    //   if (flow) {
    //     const { x = 0, y = 0, zoom = 1 } = flow.viewport;
    //     setNodes(flow.nodes || []);
    //     setEdges(flow.edges || []);
    //     setViewport({ x, y, zoom });
    //   }
    // };

    // restoreFlow();
  }, [setNodes, setViewport]);

  const onAdd = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      data: { label: 'Added node' },
      position: {
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
      },
      type: nodeType
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  useEffect(() => {
    dataSource?.nodes && setNodes(dataSource?.nodes);
    dataSource?.edges && setEdges(dataSource?.edges);
  }, [dataSource])

  return (
    <div className="wrapper" ref={reactFlowWrapper}>
      <ReactFlow
        style={{ backgroundColor: "#F7F9FB" }}
        nodes={nodes}
        edges={edges}
        snapToGrid
        fitView
        fitViewOptions={{ padding: 2 }}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineComponent={CustomConnectionLine}
        connectionLineStyle={connectionLineStyle}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodeClick={onNodeClick}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        onInit={setRfInstance}
      >
        {/* <MiniMap nodeComponent={Input} /> */}
        <Background />
        <Controls />
        <Panel position="top-right">
          <Button onClick={onSave}>保存</Button>
          <Button onClick={onRestore}>重置</Button>
          <Button onClick={onAdd}>添加</Button>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default ({ onNodeClick, nodeType, dataSource, onChange }: any) => (
  <ReactFlowProvider>

    <AddNodeOnEdgeDrop
      onNodeClick={onNodeClick}
      nodeType={nodeType}
      dataSource={dataSource}
      onChange={onChange}
    />

  </ReactFlowProvider>
);

