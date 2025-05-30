import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";

export const VHalfPaneBox = styled(Box, {})(({theme}) => ({
  display: "grid",
  gridTemplateRows: "auto auto",
  gap: 2,
  
  "> div:last-child": {
    bgcolor: theme.palette.background.paper,
    borderTop: '1px solid',
    borderColor: theme.palette.divider,
  }
}));

export const HHalfPaneBox = styled(Box, {})(({theme}) => ({
  
  "> div:last-child": {
    bgcolor: theme.palette.background.paper,
    borderLeft: '1px solid',
    borderColor: theme.palette.divider,
  }
}));