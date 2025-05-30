import { memo, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Handle, Position, useConnection, NodeProps, NodeToolbar, useReactFlow, useInternalNode } from '@xyflow/react';
import {
  Card,
  Divider,
  Typography,
  Box,
  Stack,
  Chip,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton
} from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import RoleEdit from '../role/Role'
import {useDrawer} from '../hook/useDrawer';

function RoleNode({ data, id }: NodeProps) {
  const {doOpen: doOpenRoleEdit, renderDrawer: renderDrawerRoleEdit} = useDrawer();
  const { setNodes } = useReactFlow();
  const internalNode = useInternalNode<any>(id);
  const [value, setValue] = useState<any>(data.label || '');
  const [type, setType] = useState<any>(data.type || '');
  const [categorySelete, setCategorySelete] = useState<any>(data.category || []);
  const connection = useConnection();
  const isTarget = connection.inProgress && connection.fromNode.id !== id;
  const category = useMemo(() => {
    switch (type) {
      case '主角': {
        return [{ type: 'primary', label: '主角' }];
      }
      case '正面': {
        return [
          { type: 'default', label: '导师' },
          { type: 'default', label: '伙伴' },
          { type: 'default', label: '爱人' },
          { type: 'default', label: '对照盟友' },
          { type: 'default', label: '喜剧盟友' },
          { type: 'default', label: '追随盟友' },
          { type: 'default', label: '助威盟友' },
          { type: 'default', label: '无辜盟友' },
          { type: 'default', label: '救星盟友' },
          { type: 'default', label: '悲剧盟友' },
          { type: 'default', label: '保护者' },
          { type: 'default', label: '复仇者' },
          { type: 'default', label: '信使' },
          { type: 'default', label: '边界护卫' }
        ];
      }
      case '反面': {
        return [
          { type: 'default', label: '反派' },
          { type: 'default', label: '恶人' },
          { type: 'default', label: '对立者' },
          { type: 'default', label: '反派代理人' },
          { type: 'default', label: '反派小弟' },
          { type: 'default', label: '小丑' },
          { type: 'default', label: '独立麻烦制造者' },
          { type: 'default', label: '复仇者' },
          { type: 'default', label: '信使' },
          { type: 'default', label: '边界护卫' }
        ];
      }
      case '中性': {
        return [
          { type: 'default', label: '炮灰' },
          { type: 'default', label: '信使' },
          { type: 'default', label: '边界护卫' }
        ];
      }
      default: {
        return [];
      }
    }
  }, [type]);

  function changeType(newType: string) {
    setType(newType);
    setNodes((nodes) => nodes.map((node) => node.id === id ? {
      ...node,
      data: { ...node.data, type: newType }
    } : node));
    if (newType === '主角') {
      setCategorySelete([{ label: '主角' }]);
    }

  }

  function doChangeType(_: React.MouseEvent<HTMLElement>, newType: string,) {
    if (newType) {
      changeType(newType);
    }
  }

  function doChangeLabel(event: any) {
    setValue(event.target.value);
    setNodes((nodes) => nodes.map((node) => node.id === id ? {
      ...node,
      data: { ...node.data, label: event.target.value }
    } : node));
  }

  function toggleSelect(role: any) {
    setCategorySelete((list: any[]) => {
      if (list.find((item: any) => item.label === role.label)) {
        return list.filter((item: any) => item.label !== role.label);
      } else {
        list.push(role);
        return [...list];
      }
    });
  }

  const roleColor = useMemo(() => {
    switch (type) {
      case '主角': {
        return 'primary.main';
      }
      case '正面': {
        return 'secondary.main';
      }
      case '反面': {
        return 'error.main';
      }
      case '中性': {
        return 'warning.main';
      }
      default: {
        return null;
      }
    }
  }, [type]);

  function isSelect(role: any) {
    return categorySelete.find((item: any) => item.label === role.label) || role.label === '主角'
  }

  function doSave(role: any) {
    setNodes((nodes) => nodes.map((node) => node.id === id ? {
      ...node,
      data: { ...node.data, ...role }
    } : node));
  }

  useEffect(() => {
    if (internalNode.selected) {

      setType(internalNode.data.type);
    }
  }, [internalNode.selected]);

  useEffect(() => {
    setNodes((nodes) => nodes.map((node) => node.id === id ? {
      ...node,
      data: { ...node.data, category: categorySelete }
    } : node));
  }, [categorySelete]);

  return (
    <>
      <NodeToolbar
        isVisible={internalNode.selected && !internalNode.dragging}
        position={data.toolbarPosition as any}
      >
        <ToggleButtonGroup
          color="primary"
          value={type}
          exclusive
          onChange={doChangeType}
          aria-label="Platform"
        >
          <ToggleButton value="主角" color="primary">主角</ToggleButton>
          <ToggleButton value="正面" color="secondary">正面</ToggleButton>
          <ToggleButton value="反面" color="error">反面</ToggleButton>
          <ToggleButton value="中性" color="warning">中性</ToggleButton>
        </ToggleButtonGroup>
      </NodeToolbar>
      <Card variant="outlined" sx={{ maxWidth: 360, borderColor: roleColor, position: 'relative' }}>
        <Box>
          {
            internalNode.selected && !internalNode.dragging ? (
              // <TextField 
              //   value={value}
              //   onChange={doChangeLabel}
              //   sx={{"position": "relative", "zIndex": '1', "width":"100px"}} />
              <FormControl sx={{ m: 1, width: '25ch', "position": "relative", "zIndex": '1' }} variant="standard">
                <OutlinedInput
                  type="text"
                  value={value}
                  onChange={doChangeLabel}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton edge="end" onClick={doOpenRoleEdit}>
                        <Edit />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
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
                {categorySelete.map((item: any) => (
                  <Chip
                    key={uuidv4()}
                    label={item.label}
                    size="small"
                    color={isSelect(item) ? 'primary' : 'default'}
                  />))
                }
              </Box>
            )
          }

        </Box>
        {
          internalNode.selected && !internalNode.dragging ? (
            <>
              <Divider sx={{ mb: 1 }} />
              <Box sx={{ "position": "relative", "zIndex": '1' }}>
                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  sx={{ flexWrap: 'wrap' }}
                >
                  {
                    category.map((item: any) => (
                      <Chip
                        key={uuidv4()}
                        label={item.label}
                        size="small"
                        color={isSelect(item) ? 'primary' : 'default'}
                        onClick={() => toggleSelect(item)}
                      />))
                  }
                </Stack>
              </Box>
            </>
          ) : null
        }
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
      {renderDrawerRoleEdit(<RoleEdit onSave={doSave} dataSource={data} />)}
    </>
  );
}

export default memo(RoleNode);


