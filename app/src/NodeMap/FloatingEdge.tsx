import { useState, useRef, useEffect } from 'react';
import {EdgeLabelRenderer, getStraightPath, useInternalNode, useReactFlow } from '@xyflow/react';
import { getEdgeParams } from './initialElements';
import {Input, Label} from './styles';

function FloatingEdge({ id, source, target, markerEnd, style, ...props }: any) {
  const { setEdges } = useReactFlow();
  const [isAdd, setIsAdd] = useState(false);
  const [label, setLabel] = useState(props.label || '');
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);
  const input = useRef<any>(null);

  if (!sourceNode || !targetNode) {
    return null;
  }
 
  const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);
 
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty,
  });

  function doAddLabel() {
    setIsAdd(true);
    input.current?.focus();
  }

  function closeAddLabel() {
    setIsAdd(false);
  }

  function doChangeLabel(e: any) {
    const value = e.target.value;
    setLabel(value);
    setEdges((edges) => edges.map((edge) => edge.id === id ? edge = {...edge, label: value} : edge));
  }

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        style={style}
        markerEnd={markerEnd}
        fill="none"
        onDoubleClick={doAddLabel}
      />
      <path 
        d={edgePath} 
        fill="none" 
        strokeOpacity="0" 
        strokeWidth="20" 
        className="react-flow__edge-interaction" 
        onDoubleClick={doAddLabel}
      />
      <EdgeLabelRenderer>
        <div
          className="button-edge__label nodrag nopan"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
        >
          {isAdd ? (
            <Input 
              ref={input}
              type="text"
              onBlur={closeAddLabel} 
              onChange={doChangeLabel} 
              value={label || ''}
              autoFocus 
            />) : (<Label onClick={doAddLabel}>{label}</Label>)}          
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export default FloatingEdge;
