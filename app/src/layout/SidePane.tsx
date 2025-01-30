import Box from '@mui/material/Box';

export default function SidePane({children}: any) {

  return (
    <Box
      sx={[
        {
          bgcolor: 'background.surface',
          borderLeft: '1px solid',
          borderColor: 'divider',
          display: {
            xs: 'none',
            md: 'initial',
          },
          minHeight: '100vh',
        },
      ]}
    >{children}</Box>
  );
}
