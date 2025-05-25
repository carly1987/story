import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, Box, Stack, Typography } from '@mui/material';
import { Input } from '../components/Input';
import StageRow from './StageRow';

export default function Stage({ dataSource, edit = true, plot }: any) {
  const [list, setList] = useState<any>([]);

  function doAdd() {
    setList((res: any) => res.concat([[
      {
        id: uuidv4(),
        value: '',
        type: '+'
      },
      {
        id: uuidv4(),
        value: '',
        type: '-'
      }
    ]]))
  }

  function doChange(data: any, index: number) {
    
    list[index] = data;
    setList([...list]);
  }

  useEffect(() => {
    if(dataSource){
      setList(dataSource);
    }
  }, [dataSource])

  return (
    <Box>
      {
        edit ? (
          <Stack direction="row" spacing={2}>
        <Button onClick={doAdd} variant="contained" sx={{width: 110}}>添加场景</Button>
        <Input label="主要情节" name="plot" edit={true} fullWidth>{plot}</Input>
      </Stack>
        ) : (
          <Typography variant="h6" gutterBottom>{plot}</Typography>
        )
      }
      
      {
        list.map((data: any, index: number) => edit ? (
        <StageRow key={uuidv4()} dataSource={data} onChange={(v: any) => doChange(v, index)} />
      ) : (<Box key={uuidv4()} sx={{p: 2}}>
      {
        data.map((item: any) => <Typography key={item.id} variant="subtitle1" gutterBottom>{item.value}</Typography>)
      }
      </Box>))
      }
      {
        edit ? <input type="text" name="list" value={JSON.stringify(list)} hidden readOnly /> : null
      }
      
    </Box>
  );
}