import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Link } from "react-router-dom";
import LinkMUI from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function StoryCard({
  dataSource,
}: any) {

  return (
    <Card variant="outlined" sx={{ height: '100%', flexGrow: 1 }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          {dataSource.name}
        </Typography>
        <LinkMUI 
          component={Link} 
          color="primary" 
          to={`/write/${dataSource.id}/${dataSource.name}`} 
          sx={{ mt: 3 }}
        >
          编辑
        </LinkMUI>
      </CardContent>
    </Card>
  );
}
