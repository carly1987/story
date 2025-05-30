import { memo, useState } from 'react';
import { Handle, Position, useConnection, useReactFlow, useInternalNode } from '@xyflow/react';
import { Card, Typography, Box, TextField } from '@mui/material';

function PlotNode({ data, id }: any) {
  const { setNodes } = useReactFlow();
  const internalNode = useInternalNode<any>(id);
  const [value, setValue] = useState<any>(data.label || '');
  const connection = useConnection();
  const isTarget = connection.inProgress && connection.fromNode.id !== id;

  function doChangeLabel(event: any) {
    setValue(event.target.value);
    setNodes((nodes) => nodes.map((node) => node.id === id ? {
      ...node,
      data: { ...node.data, label: event.target.value }
    } : node));
  }

  return (
    <>
      <Card variant="outlined" sx={{ maxWidth: 360, position: 'relative'}}>
        <Box>
          {
            internalNode.selected && !internalNode.dragging ? (
              <TextField
                value={value}
                multiline
                maxRows={3}
                onChange={doChangeLabel}
                sx={{ "position": "relative", "zIndex": '1', "width": "100px" }} />
            ) : (
              <Box>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ "position": "relative", "zIndex": '1' }}
                >
                  {value || '请输入...'}
                </Typography>
              </Box>
            )
          }

        </Box>
        {!connection.inProgress && (
          <Handle
            className="customHandle"
            position={Position.Right}
            type="source"
            style={{ "zIndex": '0' }}
          />
        )}
        {/* We want to disable the target handle, if the connection was started from this node */}
        {(!connection.inProgress || isTarget) && (
          <Handle
            className="customHandle"
            position={Position.Left}
            type="target"
            isConnectableStart={false}
            style={{ "zIndex": '0' }}
          />
        )}

      </Card>
    </>
  );
}

export default memo(PlotNode);


