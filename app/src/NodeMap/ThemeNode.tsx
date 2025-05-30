import { memo, useState } from 'react';


import { Handle, Position, useConnection, NodeToolbar, useReactFlow, useInternalNode } from '@xyflow/react';
import { Card, Typography, Box, ToggleButtonGroup, ToggleButton, TextField } from '@mui/material';
import { useDialogPlot, useDialogQuestion } from '../hook/useDialog';
import {PlotText} from './styles';

function ThemeNode({ data, id }: any) {
  const { SetPlot, doOpen: doOpenSetPlot } = useDialogPlot(data.plots, (plots: any) => {
    setNodes((nodes) => nodes.map((node) => node.id === id ? {
      ...node,
      data: { ...node.data, plots }
    } : node));
  });
  const { SetQ, doOpen: doOpenSetQ } = useDialogQuestion(data.qs, (qs: any) => {
    setNodes((nodes) => nodes.map((node) => node.id === id ? {
      ...node,
      data: { ...node.data, qs }
    } : node));
  })
  const { setNodes } = useReactFlow();
  const internalNode = useInternalNode<any>(id);
  const [value, setValue] = useState<any>(data.label || '');
  const [type, setType] = useState<any>(data.type || '');
  const connection = useConnection();
  const isTarget = connection.inProgress && connection.fromNode.id !== id;


  function doChangeType(_: React.MouseEvent<HTMLElement>, newType: string,) {
    if (newType) {
      switch (newType) {
        case '情节': {
          doOpenSetPlot();
          break;
        }
        case '问题': {
          doOpenSetQ();
          break;
        }
        case 'topic': {
          setType('topic');
          setNodes((nodes) => nodes.map((node) => node.id === id ? {
            ...node,
            data: { ...node.data, type: 'topic' }
          } : node));
          break;
        }
      }
    }
  }

  function doChangeLabel(event: any) {
    setValue(event.target.value);
    setNodes((nodes) => nodes.map((node) => node.id === id ? {
      ...node,
      data: { ...node.data, label: event.target.value }
    } : node));
  }

  return (
    <>
      <NodeToolbar
        isVisible={internalNode && internalNode.selected && !internalNode.dragging}
        position={data.toolbarPosition}
      >
        <ToggleButtonGroup
          value={type}
          exclusive
          onChange={doChangeType}
          aria-label="Platform"
        >
          <ToggleButton value="情节">添加情节</ToggleButton>
          <ToggleButton value="问题">添加问题</ToggleButton>
          <ToggleButton value="topic">设置为主主题</ToggleButton>
        </ToggleButtonGroup>
      </NodeToolbar>
      {SetPlot}
      {SetQ}
      <Card variant="outlined" sx={{ maxWidth: 360, position: 'relative', borderColor: type === 'topic' ? 'primary.main' : null}}>
        <Box>
          {
            internalNode && internalNode.selected && !internalNode.dragging ? (
              <TextField
                value={value}
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
                  {value}
                </Typography>
                {
                  data.plots ? Object.keys(data.plots).map((key: string) => (<PlotText variant="h6" key={key}>{data.plots[key]}</PlotText>)) : null
                }
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

export default memo(ThemeNode);


