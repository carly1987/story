import Box from '@mui/material/Box';

export default function MenuPane({children}: any) {

  return (
    <Box
      sx={[
        {
          bgcolor: 'background.surface',
          borderRight: '1px solid',
          borderColor: 'divider',
          display: {
            xs: 'none',
            md: 'initial',
          },
          minHeight: '100vh',
          p: 2
        },
      ]}
    >{children}</Box>
  );
}
