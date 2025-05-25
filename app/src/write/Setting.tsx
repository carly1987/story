import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import * as R from 'ramda';
import { v4 as uuidv4 } from 'uuid';
import Section from '../components/Section';
import Stage from '../story/Stage';
import useArc from '../hook/useArc';
import { Stack, Typography } from '@mui/material';

const requiredTypes = ['主角', '正面', '反面', '中性'];

const Setting = forwardRef(({ dataSource, folderPath }: any, ref) => {
  const { acts, doSaveStage } = useArc(folderPath, dataSource.act);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if (dataSource.role_node?.nodes) {
      const list: any = R.pipe(
        R.groupBy((role: any) => role.data.type || '其他'),
        groups => requiredTypes.map(type => ({
          type,
          list: groups[type] || []
        }))
      )(dataSource.role_node.nodes);
      console.log('list', list)
      setRoles(list);
    }

  }, [dataSource.role_node]);

  useImperativeHandle(ref, () => {
    return {

    };
  }, []);

  return (
    <>
      {
        acts.map((data: any) => (
          <Section
            key={data.name}
            title={data.text}
          >
            <Stage dataSource={data.stage} edit={false} plot={data.plot} />
          </Section>
        ))
      }
      {
        roles.map((data: any) => (
          <Section
            key={uuidv4()}
            title={data.type}
          >
            {
              data.list.map((role: any) => (
                <Stack direction="row" key={role.id}>
                  <Typography>{role.data.name || role.data.label}</Typography>
                  <Typography>{role.data.job}</Typography>
                </Stack>
              ))
            }
          </Section>
        ))
      }
    </>
  );
});

export default Setting;
