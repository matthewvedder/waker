import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateAsanaInstance } from '../actions'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import '../styles/InstanceNotesEdit.css'

const useStyles = makeStyles((theme) => {
return ({
  root: {
    marginTop: ".5em",
    '& > *': {
      ...theme.typography.body2,
      color: theme.palette.text.secondary,
      padding: ".5em",
    }
  },
  textField: {
    borderColor: theme.palette.background.paper,
  },
})});

const InstanceNotesEdit = ((props) => {
  const { notes, id } = props
  const classes = useStyles()
  return (
    <div>
      <TextField
        id={`${id}-notes`}
        margin="normal"
        variant="outlined"
        className={classes.root}
        InputProps={{
          classes: {
            notchedOutline: classes.textField,
          }
        }}
        multiline
        size="small"
        onBlur={(event) => props.updateAsanaInstance(id, { notes: event.target.value })}
        defaultValue={notes}
      />
    </div>
  )
})


const mapStateToProps = state => ({
  asanas: state.asanas
})


export default connect(mapStateToProps, { updateAsanaInstance })(InstanceNotesEdit)
