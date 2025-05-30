import { getStraightPath } from '@xyflow/react';

export function CustomConnectionLine({ fromX, fromY, toX, toY, connectionLineStyle }: any) {
  const [edgePath] = getStraightPath({
    sourceX: fromX,
    sourceY: fromY,
    targetX: toX,
    targetY: toY,
  });

  return (
    <g>
      <path style={connectionLineStyle} fill="none" d={edgePath} />
    </g>
  );
}

export const connectionLineStyle = {
  stroke: '#b1b1b7',
};
