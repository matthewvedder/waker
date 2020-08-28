import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export default (props) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleConfirmDelete = () => {
    setDialogOpen(false)
    props.handleConfirmDelete()
  }

  return (
    <div>
      <IconButton edge="end" aria-label="delete" onClick={() => setDialogOpen(true)}>
        <DeleteIcon style={{ color: '#E27D60' }} />
      </IconButton>

      <Dialog
         open={dialogOpen}
         onClose={() => setDialogOpen(false)}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
       >
         <DialogTitle id="alert-dialog-title">Are you sure you want to delete this?</DialogTitle>
         <DialogActions>
           <Button onClick={() => setDialogOpen(false)} color="primary">
             Nevermind
           </Button>
           <Button onClick={handleConfirmDelete} color="primary" autoFocus>
             Yes
           </Button>
         </DialogActions>
       </Dialog>
     </div>
  )
}
