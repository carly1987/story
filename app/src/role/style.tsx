import { styled } from '@mui/material/styles';

export const FlowContainer = styled('div', {})(() => ({
  width: 1000,
  height: 800,
  paddingRight: '2%',
  '>div': {
    width: '98%',
    height: '100%',
  }
}));