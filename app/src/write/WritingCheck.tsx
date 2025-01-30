import { forwardRef, useImperativeHandle, useState } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const list = [
  {
    id: 'le',
    label: '了'
  },
  {
    id: 'yuanlai',
    label: '原来'
  },
  {
    id: 'yixiang',
    label: '一向'
  },
  {
    id: 'de',
    label: '的'
  },
  {
    id: 'de2',
    label: '得'
  },
  {
    id: 'de4',
    label: '地'
  },
  {
    id: 'bei4',
    label: '被'
  },
  {
    id: 'zb',
    label: '这般'
  }
];
 
const WritingCheck = forwardRef(({onClick}: any, ref) => {
  const [select, setSelect] = useState('');

  function doSelect(item: any) {
    onClick(item.label);
    setSelect(item.id);
  }

  useImperativeHandle(ref, () => {
    return {
      
    };
  }, []);

  return (
    <div>
      <h3>文笔检查</h3>
      <Stack 
      spacing={{ xs: 1, sm: 2 }}
      direction="row"
      useFlexGap
      sx={{ flexWrap: 'wrap' }}
    >
        {
          list.map((item: any) => (
            <Chip label={item.label} onClick={() => doSelect(item)} color={item.id === select ? 'primary' : 'default'} key={item.id} clickable />
          ))
        }
      </Stack>
    </div>
  );
});
 
export default WritingCheck;
