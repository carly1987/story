import Box from '@mui/material/Box';

export default function RootPane({children, ...props}: any) {

  return (
    <Box
      sx={[
        {
          bgcolor: 'background.appBody',
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
            md: 'minmax(160px, 100px) minmax(500px, 1fr) minmax(100px, 300px)',
          },
          minHeight: '100vh',
        },
      ]}
      {...props}
    >{children}</Box>
  );
}
