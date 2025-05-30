import Box from '@mui/material/Box';

export default function MainPane({children, ...props}: any) {

  return (
    <Box component="main" sx={[{ 
      p: 2, 
      minHeight: '100vh',
    }]} {...props}>{children}</Box>
  );
}
