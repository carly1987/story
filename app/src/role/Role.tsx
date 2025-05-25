import { useState } from 'react';
import {Box, Grid2, Typography, TextField} from '@mui/material';
import RoleArc from './Arc';
import Section from '../components/Section';

function Input(props: any) {
  return (
    <TextField 
      defaultValue={props.defaultValue} 
      label={props.label} 
      name={props.name} 
      variant="standard" 
      fullWidth 
      multiline={props.multiline}
      maxRows={5}
    />
  )
}


export default function Role({dataSource, onSave}: any) {
  const [form, setForm] = useState(dataSource);
  function doChangeArc(arc: any) {
    setForm({...form, arc});
    onSave?.({...form, arc});
  }
  function doChangeField(_: string, data: any) {
    setForm({...form, ...data});
    onSave?.({...form, ...data});
  }
  return (
    <Box>
      <Section title="基础信息" onChange={doChangeField}>
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.name} label="中文名" name="name"  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.ename} label="外文名" name="ename"  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.wname} label="网名" name="wname"  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.zname} label="表字" name="zname"  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.hname} label="号" name="hname"  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.tname} label="他人称" name="tname"  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.sname} label="自称" name="sname"  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.age} label="年龄" name="age"  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.birth} label="生日" name="birth"  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.sex} label="性别" name="sex"  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.star} label="星座" name="star"  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.tblood} label="血型" name="tblood"  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.blood} label="血统" name="blood"  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.trole} label="类型" name="trole"  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.height} label="身高" name="height"  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.weight} label="体重" name="weight"  />
          </Grid2>
          <Grid2 size={12}>
            <Input defaultValue={dataSource.body} label="外貌特征" name="body"  multiline  />
          </Grid2>
          <Grid2 size={12}>
            <Input defaultValue={dataSource.body} label="衣着特征" name="cloth"  multiline  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.rwords} label="口头禅" name="rwords"  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.like} label="喜好/怪癖" name="like"  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.scation} label="习惯小动作" name="scation"  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.tface} label="习惯表情" name="tface"  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.gap} label="底线" name="gap"  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.skill} label="技能/优势" name="skill"  />
          </Grid2>
        </Grid2>
      </Section>
      <Section title="社会环境" onChange={doChangeField}>
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.country} label="国籍" name="country"  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.nation} label="民族" name="nation"  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.religion} label="宗教" name="religion"  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.group} label="党派" name="group"  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.fb} label="出身背景" name="fb"  multiline  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.job} label="身份/职业" name="job"  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.money} label="经济情况" name="money"  multiline  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.pbirth} label="出生场景" name="pbirth"  multiline  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.home} label="住所" name="home"  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.education} label="教育" name="education"  multiline  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.hjob} label="工作经历" name="hjob"  multiline  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.family} label="家庭关系" name="family"  multiline  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.partner} label="伴侣" name="partner"  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.lover} label="情人" name="lover"  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.cs} label="青梅竹马" name="cs"  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.unget} label="得不到的人" name="unget"  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.friend} label="好友" name="friend"  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.idol} label="偶像" name="idol"  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.respect} label="尊敬的人" name="respect"  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.enemy} label="宿敌" name="enemy"  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.rival} label="对手" name="rival"  />
          </Grid2>
          <Grid2 size={6}>
            <Input defaultValue={dataSource.eother} label="他人评价" name="eother"  multiline  />
          </Grid2>
        </Grid2>
      </Section>
      <Typography variant="h6" gutterBottom>
        人物弧线
      </Typography>
      <RoleArc onChange={doChangeArc} dataSource={dataSource.arc} />
    </Box>

  );
}
