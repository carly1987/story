import * as React from 'react';
// import Grid from '@mui/material/Grid';
import {Button, Stack, Typography} from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import StoryCard from './StoryCard';
// import { useStoryStore } from '../store';

export default function StoryPage() {
  // const store: any = useStoryStore((state) => state);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const doSaveStory = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const formData = new FormData(event.currentTarget);
    // const formJson = Object.fromEntries((formData as any).entries());
    // const name = formJson.name;
    // addStory(name);
    handleClose();
  }

  return (
    <>
      <Stack direction="row" sx={{mb: 2}}>
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          所有书籍  
        </Typography>
        <Button>导入小说</Button>
        <Button variant="outlined" onClick={handleClickOpen}>
          创建小说
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: 'form',
            onSubmit: doSaveStory,
          }}
        >
          <DialogTitle>创建小说</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ...
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              name="name"
              label="小说名"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>取消</Button>
            <Button type="submit">保存</Button>
          </DialogActions>
        </Dialog>
      </Stack>

      {/* <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {state?.list?.map((item: Story) => (
          <Grid key={item.id} sx={{ mr: (theme) => theme.spacing(2),mb: (theme) => theme.spacing(2) }}>
            <StoryCard dataSource={item} />
          </Grid>
        ))}
      </Grid> */}
    </>
  );
}
