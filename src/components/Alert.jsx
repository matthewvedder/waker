import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';


export default function Alert(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      display: props.message ? 'flex' : 'none',
      justifyContent: 'center',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
      ...props.style
    },
    outlinedSuccess: {
      '& div': {
        color: `${theme.palette.primary.main} !important`
      },
      border: `1px solid ${theme.palette.primary.main}`
    },
  }));

  const classes = useStyles();
  const [open, setOpen] = useState(true);
  // const alertClass = (props.variant === 'outlined' && props.severity === 'success') ?  classes.outlinedSuccess : null

  useEffect(() => {
    setOpen(true)
  }, [props.message])
  return (
    <div className={classes.root}>
      <div style={{ width: props.width }}>
        <Collapse in={open}>
          <MuiAlert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            {...props}
          >
            { props.message }
          </MuiAlert>
        </Collapse>
      </div>
    </div>
  );
}
