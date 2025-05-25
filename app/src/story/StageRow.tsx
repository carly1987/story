import { useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { TextInput } from '../components/Input';

export default function StageRow({ dataSource, onChange }: any) {
  const [list, setList] = useState<any>([]);

  function doChange(event: any, index: number) {
    list[index].value = event.target.value;
    setList(list);
    onChange?.([...list]);
  }

  useEffect(() => {
    setList(dataSource);
  }, []);

  return (
    <>
      {
        list.map((data: any, index: number) => (
          <Stack direction="row" spacing={2} key={data.id}>
            <Typography sx={{ width: 110 }}>{data.type}</Typography>
            <TextInput onBlur={(event: any) => doChange(event, index)} edit={true} fullWidth defaultValue={data.value} />
          </Stack>
        ))
      }
    </>
  );
}