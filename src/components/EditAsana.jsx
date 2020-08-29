import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import Messages from './Messages'
import Errors from './Errors'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'
import { editAsana } from '../actions'
import { fetchAsana } from '../sagas/AsanaSagas'


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '7em',
  },
  paper: {
    padding: '2em'
  },
  form: {
    '& > *': {
      margin: theme.spacing(1),
    },
    width: '50ch',
    // backgroundColor: 'blue',
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.down('sm')]: {
      width: '80%',
      marginTop: '5em',
    },
    link: { color: 'grey' },
  },
}));

const EditAsana = (props) => {
  const [name, setName] = useState('')
  const [fileName, setFileName] = useState('')
  const [description, setDescription] = useState('')

  const classes = useStyles()

  useEffect(() => {
    fetchAsana(asanaId()).then(result => {
      setName(result.name)
      setFileName(result.file_name)
      setDescription(result.description)
    })
  }, [])

  const asanaId = () => {
    return window.location.href.split('/')[4]
  }

  // Remember, Redux Form passes the form values to our handler
  // In this case it will be an object with `email` and `password`
  const handleSubmit = (event) => {
    event.preventDefault()
    props.editAsana(asanaId(), { name, description, file_name: fileName })
  }

  return (
    <Container className={classes.container} >
      <Paper className={classes.paper} square>
        <Typography variant='h5'>Edit Asana</Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            name="name"
            type="text"
            id="name"
            label="Name"
            className="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            name="fileName"
            type="text"
            id="fileName"
            label="File Name"
            className="fileName"
            value={fileName}
            onChange={(event) => setFileName(event.target.value)}
          />
          <TextField
            name="description"
            type="text"
            id="description"
            label="Description"
            className="description"
            value={description}
            multiline
            onChange={(event) => setDescription(event.target.value)}
          />
          <Button variant="contained" color="primary" type="submit">Save</Button>
        </form>
      </Paper>
    </Container>
  )
}

const mapStateToProps = state => ({
  asanas: state.asanas
})

export default connect(mapStateToProps, { editAsana })(EditAsana)
