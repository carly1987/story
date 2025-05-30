import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, Grid2, TextField } from '@mui/material';

import BasicSelect, {MultipleSelect} from '../components/Select';
import {Input} from '../components/Input';
import Section from '../components/Section';
import * as Constants from './constants';

const initData = {
  id: uuidv4(),
  title: '核心动机',
  outTarget: '',
  outProblem: '',
  good: [],
  bug: [],
  goodMind: [],
  bugMind: [],
  inTarget: '',
  wound: '',
  need: '',
  inProblem: ''
}

export default function RoleArc({onChange, dataSource}: any) {
  const [list, setList] = useState(dataSource || [initData]);

  function doAdd() {
    setList((res: any) => res.concat([{ ...initData, title: '阶段性动机' }]))
  }

  function doSave(id: string, data: any) {
    const newList = list.map((item: any) => item.id === id ? ({...item, ...data}) : item)
    setList(newList);
    onChange?.(newList);
  }

  return (
    <>
      {
        list.map((item: any) => (
          <Section 
            {...item}
            key={item.id} 
            title={<Input note="次要动机/阶段动机/临时动机" name="title">{item.title}</Input>}
            onChange={doSave}
          >
            <Grid2 container spacing={2}>
              <Grid2 size={6}>
                <TextField
                  defaultValue={item.outTarget}
                  label="外在动机"
                  helperText="想要实现的目标"
                  name="outTarget"
                  variant="standard"
                  fullWidth
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  defaultValue={item.outProblem}
                  label="外在冲突"
                  helperText="阻止实现目标的障碍"
                  name="outProblem"
                  variant="standard"
                  fullWidth
                />
              </Grid2>
              <Grid2 size={4}>
                <MultipleSelect
                  defaultValue={item.good}
                  label="优点"
                  name="good"
                  dataSource={Constants.Goods}
                  fullWidth
                />
              </Grid2>
              <Grid2 size={4}>
                <MultipleSelect
                  defaultValue={item.bug}
                  label="性格缺陷"
                  name="bug"
                  dataSource={Constants.Bugs} 
                  fullWidth
                />
              </Grid2>
              <Grid2 size={4}>
                <MultipleSelect
                  defaultValue={item.subbug}
                  label="次要性格缺陷"
                  name="subbug"
                  dataSource={Constants.Bugs}
                  fullWidth 
                />
              </Grid2>
              <Grid2 size={6}>
                <MultipleSelect
                  defaultValue={item.goodMind}
                  label="积极情绪"
                  name="goodMind"
                  dataSource={Constants.Goods}
                  fullWidth 
                />
              </Grid2>
              <Grid2 size={6}>
                <MultipleSelect
                  defaultValue={item.bugMind}
                  label="消极情绪"
                  name="bugMind"
                  dataSource={Constants.Goods}
                  fullWidth 
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  defaultValue={item.inTarget}
                  label="内在动机"
                  helperText="为什么要实现目标"
                  name="inTarget"
                  variant="standard"
                  fullWidth
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  defaultValue={item.wound}
                  label="情感创伤"
                  helperText="形成性格缺陷的原因"
                  name="wound"
                  variant="standard"
                  fullWidth
                />
              </Grid2>
              <Grid2 size={6}>
                <BasicSelect
                  defaultValue={item.need}
                  label="需求"
                  name="need"
                  dataSource={Constants.Need}
                  fullWidth 
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  defaultValue={item.inProblem}
                  label="内在冲突"
                  helperText="性格缺陷（谎言）"
                  name="inProblem"
                  variant="standard"
                  fullWidth
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  defaultValue={item.inProblem}
                  label="积极行动"
                  name="goodAction"
                  variant="standard"
                  fullWidth
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  defaultValue={item.inProblem}
                  label="消极行动"
                  name="bugAction"
                  variant="standard"
                  fullWidth
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  defaultValue={item.inProblem}
                  label="积极想法"
                  name="goodThink"
                  variant="standard"
                  fullWidth
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  defaultValue={item.inProblem}
                  label="消极想法"
                  name="bugThink"
                  variant="standard"
                  fullWidth
                />
              </Grid2>
            </Grid2>
          </Section>
        ))
      }
      <Button onClick={doAdd}>添加人物弧线</Button>
    </>
  );
}

