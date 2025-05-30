import { memo, useState } from 'react';
import { Handle, Position, useConnection, useReactFlow, useInternalNode } from '@xyflow/react';
import {
  Typography,
  Box,
  TextField,
  Card
} from '@mui/material';
import {MultipleSelect} from '../components/Select';
import * as Constants from './constants';

function CharacterNode({ data, id }: any) {
  const internalNode = useInternalNode<any>(id);
  const { setNodes } = useReactFlow();
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

  function doChangeSelect(list: any[]) {
    const v = list.map((item: any) => item.label).join(',');
    setValue(v);
    setNodes((nodes) => nodes.map((node) => node.id === id ? {
      ...node,
      data: { ...node.data, label: v}
    } : node));
  }

  return (
    <>
    <Card variant="outlined" sx={{ maxWidth: 360, position: 'relative' }}>
        <Box>
        <Typography 
                  gutterBottom 
                  variant="h5" 
                  component="div" 
                  sx={{"position": "relative", "zIndex": '1'}}
                >
                  （{data.text}）
                </Typography>
                
        {
              internalNode && internalNode.selected && !internalNode.dragging ? (
                <>
                  {
                    data.dataSource ? (
                    <MultipleSelect 
                      defaultValue={value}
                      dataSource={Constants.Goods}
                      sx={{"position": "relative", "zIndex": '1', "width":"100%"}}
                      onChange={doChangeSelect}
                    />) : (<TextField 
                      value={value}
                      onChange={doChangeLabel}
                      sx={{"position": "relative", "zIndex": '1', "width":"100%"}} />)
                  }
                </>
              ) : (
                  <Typography 
                  gutterBottom 
                  variant="h5" 
                  component="div" 
                  sx={{"position": "relative", "zIndex": '1'}}
                >
                  {value}
                </Typography>
              )
            }
          <Typography 
                  gutterBottom 
                  variant="h6" 
                  component="div" 
                  sx={{"position": "relative", "zIndex": '1'}}
                >
                  {data.help}
                </Typography>
        </Box>
        {!connection.inProgress && (
            <Handle
              className="customHandle"
              position={Position.Right}
              type="source"
              style={{"zIndex": '0'}}
            />
          )}
          {/* We want to disable the target handle, if the connection was started from this node */}
          {(!connection.inProgress || isTarget) && (
            <Handle 
              className="customHandle" 
              position={Position.Left} 
              type="target" 
              isConnectableStart={false}
              style={{"zIndex": '0'}}
            />
          )}
        
      </Card>
    </>
  );
}

export default memo(CharacterNode);