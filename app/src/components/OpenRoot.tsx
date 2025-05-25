import * as React from 'react';
import { Stack, Avatar as MuiAvatar, Typography } from '@mui/material';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { styled } from '@mui/material/styles';
import {getStore} from '../store';

const Avatar = styled(MuiAvatar)(({ theme }) => ({
  width: 28,
  height: 28,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.divider}`,
}));

export default function OpenRoot() {
  const [root, setRoot] = React.useState('未选定根目录')
  async function init() {
    const root: any = await getStore('story_root');
    if(root.value) {
      setRoot(root.value);
    }
    
  }

  React.useEffect(() => {
    init();
  }, []);

  return (
    <Stack
      direction="row"
      sx={{
        maxHeight: 56,
        width: 215,
        position: 'relative',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '8px 32px 8px 16px', // 留出右侧箭头空间
        cursor: 'pointer',
        '&:hover': {
          borderColor: '#000',
        },
        '&:focus': {
          borderColor: '#3f51b5',
        },
      }}
    >
      <Avatar alt="Sitemark web">
            <DevicesRoundedIcon sx={{ fontSize: '1rem' }} />
          </Avatar>
          <Typography sx={{padding: '2px 6px'}}>{root}</Typography>
          <ArrowDropDownIcon
        sx={{
          position: 'absolute',
          right: '8px',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none', // 防止箭头干扰点击事件
        }}
      />
    </Stack>
  );
}
