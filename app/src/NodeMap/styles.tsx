import { styled } from '@mui/material/styles';
import {Chip, Typography} from '@mui/material';

export const flowContainer = styled('div', {})(() => ({
  width: '100%',
  height: '500px',
}));

export const RoleType = styled(Chip, {})(() => ({
  position: 'absolute',
  top: 0,
  right: 0,
  scale: 0.5
}));

export const Input = styled('input', {})(() => ({
  width: '50px',
  background: '#F7F9FB',
}));

 export const Label = styled(Typography, {})(() => ({
  background: '#F7F9FB',
  maxWidth: '80px',
  wordBreak: 'break-all',
  lineBreak: 'loose',
  whiteSpace: 'normal'
}));

export const PlotText = styled(Typography, {})(() => ({
  borderBottom: '1px solid #eee',
  marginBottom: 6
}));