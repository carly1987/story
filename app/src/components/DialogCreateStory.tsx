import * as React from 'react';
import {Button} from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function DialogCreateStoryBtn({onSave}: any) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const doSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    onSave(formJson.name)
    handleClose();
  }

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
          创建小说
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: 'form',
            onSubmit: doSave,
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
    </>
  );
}
