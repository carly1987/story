import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import MuiDrawer from '@mui/material/Drawer';

export const FlowContainer = styled('div', {})(() => ({
  width: '100%',
  height: 'calc(100vh - 120px)',
  paddingRight: '2%',
  '>div': {
    width: '98%',
    height: '100%',
  }
}));


export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })({
  height: '100vh',
});      


export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    '*': {
      color: theme.palette.common.white,
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  'button':{
    display: 'none'
  },
  '&:hover button': {
    display: 'block'
  }
}));
