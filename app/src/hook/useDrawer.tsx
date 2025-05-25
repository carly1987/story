import { useState } from "react";
import {Drawer, Box} from '@mui/material';

export function useDrawer() {
  const [open, setOpen] = useState(false);
  function doOpen() {
    setOpen(true);
  }
  function doClose() {
    setOpen(false);
  }
  const renderDrawer = (children: any) => {
    return (
      <Drawer
        anchor="right"
        open={open}
        onClose={doClose}
      >
        <Box
          sx={{ width: 1000, paddingTop: '56px', paddingBottom: '20px' }}
          role="presentation"
        >
        {children}</Box>
      </Drawer>
    )
  }
  return {doOpen, renderDrawer} 
}