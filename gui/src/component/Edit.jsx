import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AuthService from '../services/authService';

export default function Edit({ auth, setAuth }) {
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState('')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setEdit(e.target.value)

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuth({ ...auth, email: edit })
    AuthService.emailEdit(auth.id, edit)
    setOpen(false)
  }

  return (
    <div className='edit'>
      <Button variant="outlined" onClick={handleClickOpen}>
        Editer
      </Button>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Editer votre email</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={auth.email}
            type="email"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleSubmit}>Modifier</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
