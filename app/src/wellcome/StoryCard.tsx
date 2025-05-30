import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, Link as LinkMUI, Stack } from '@mui/material';

export default function StoryCard({
  dataSource,
}: any) {
  
  return (
    <Card variant="outlined" sx={{ height: '100%', flexGrow: 1 }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          {dataSource.name}
        </Typography>
              <Stack spacing={2}>
              <LinkMUI 
                  component={Link} 
                  color="primary" 
                  to={`/read/${dataSource.name}/`} 
                >
                  去读
                </LinkMUI>
                <LinkMUI 
                  component={Link} 
                  color="primary" 
                  to={`/write/${dataSource.name}/`} 
                >
                  去写
                </LinkMUI>
              </Stack>
      </CardContent>
    </Card>
  );
}
