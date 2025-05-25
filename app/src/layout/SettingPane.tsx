import Box from '@mui/material/Box';

export default function SettingPane({children, ...props}: any) {

  return (
    <Box
      sx={[
        {
          bgcolor: 'background.appBody',
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'minmax(64px, 200px) 1fr',
            md: 'minmax(160px, 100px) 1fr',
          },
          minHeight: '100vh',
        },
      ]}
      {...props}
    >{children}</Box>
  );
}
