import { Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
import Copyright from './components/Copyright';

export default function MainGrid() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Outlet />
      <Copyright />
    </Box>
  );
}
