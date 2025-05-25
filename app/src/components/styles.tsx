import { styled } from '@mui/material/styles';
import {Typography, Select, Box} from '@mui/material';
import { Position } from '@xyflow/react';

export const Title = styled(Typography, {})(() => ({
  fontWeight: 'bold',
  minWidth: '90px',
  '&::after': {
    content: '":"'
  }
}));

export const MuiSelect = styled(Select, {})(() => ({
  '.MuiSelect-standard': {
    paddingLeft: '10px'
  }
}));

export const MultipleSelectBox = styled(Box, {})(() => ({
  border: '1px solid #ccc',
  width:'100%',
  minHeight: 30,
  position: 'relative',
  borderRadius: 10,
  'select': {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
  },
  '.MuiChip-root': {
    maxWidth: 'auto'
  }
}));