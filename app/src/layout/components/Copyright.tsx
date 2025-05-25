import Link from '@mui/material/Link';
import {CopyrightUI} from './styles';

export default function Copyright(props: any) {
  return (
    <CopyrightUI
      variant="body2"
      align="center"
      {...props}
      sx={[
        {
          color: 'text.secondary',
          borderTop: '1px solid',
          borderColor: 'divider',
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Sitemark
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </CopyrightUI>
  );
}
