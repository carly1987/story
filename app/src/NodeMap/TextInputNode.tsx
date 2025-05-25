import React, { memo } from 'react';
import { Handle, NodeResizer, Position } from '@xyflow/react';
import {Box} from '@mui/material';
import Select from '../components/Select';
import {Input} from '../components/Input';
import * as Constants from '../constants';

function getLabel(value: string, list: any) {
  if(!value){
    return ''
  }
  return list.filter((data: any) => data.value == value)[0].label;
}

export default memo(({data }: any) => {
  // const { setNodes } = useReactFlow();
  function doSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    console.log('doSave', formJson)
    // setNodes((nodes) => nodes.map((node) => node.id === id ? {...node, ...formJson} : node));
  }
  return (
    <div className='input_node_wrap'>
      <Box component="form" onSubmit={doSave}>
        <Input label="主题" name="topic" defaultValue={getLabel(data.topic, Constants.Topics)} />
        <Input label="谚语" name="topic_words" defaultValue={data.topic_words} />
        <Input label="最高目标" name="target" defaultValue={data.target} note="故事的主体事件=谁在干什么？" />
        <Select label="故事节奏" name="pacing" defaultValue={data.pacing} dataSource={Constants.Pacing} native={true} />
        <Input label="主要冲突" name="major_conflict" defaultValue={data.major_conflict} />
        <Input label="故事情节" name="plot" maxRows={5} defaultValue={data.plot} />
      </Box>
      <NodeResizer minWidth={50} minHeight={50} />
      <Handle id="left" type="target" position={Position.Left} />
      <Handle id="right" type="target" position={Position.Right} />
      <Handle id="bottom" type="source" position={Position.Bottom} />
      <Handle id="top" type="source" position={Position.Top} />
    </div>
  );
});