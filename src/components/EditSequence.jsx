import React, { useState } from 'react'
import { reduxForm, submit, Field } from 'redux-form'
import { connect } from 'react-redux'
import { updateSequence } from '../actions'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  button: {
    marginTop: '1em'
  }
}))

const EditSequence = (props) => {
  const [name, setName] = useState(props.sequence.name)
  const classes = useStyles()

  const handleSubmit = (event) => {
    event.preventDefault()
    props.updateSequence(props.sequence.id, { name })
    props.onSubmit()
  }


  return (
    <form className="create-sequence">
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Name"
        fullWidth
        onChange={(event) => setName(event.target.value)}
        value={name}
      />
      <Button
        className={classes.button}
        type="submit"
        onClick={handleSubmit}
        variant='outlined'
        color="primary"
      >
        Save
      </Button>
    </form>
  )
}

export default connect(null, { updateSequence })(EditSequence)
