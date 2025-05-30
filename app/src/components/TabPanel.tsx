import {Box} from '@mui/material';

export default function TabPanel({isActive, children}: any) {
  return (
    <div
      role="tabpanel"
      hidden={!isActive}
    >
      {isActive && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}