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
import TagFilter from './TagFilter'
import Thumbnail from './Thumbnail'
import { makeStyles } from '@material-ui/core/styles'
import { editAsana } from '../actions'
import { updateUser } from '../services/UserService'
import { currentUser, setCurrentUser } from '../lib/Auth'
import LinearProgress from '@material-ui/core/LinearProgress'
import Alert from './Alert'


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '7em',
  },
  innerContainer: {
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

const UserSettings = (props) => {
  const [username, setUsername] = useState(currentUser().username)
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const classes = useStyles()

  const handleSubmit = (event) => {
    event.preventDefault()
    setTimeout(1000, () => {
      setLoading(true)
    })
    setSuccessMessage('')
    updateUser({ username }).then(result => {
      setCurrentUser(result)
      setLoading(false)
      setSuccessMessage('Settings updated')
    })
  }

  return (
    <Container className={classes.container} >
      <Paper square>
          <Container className={classes.innerContainer}>
            <Typography variant='h5'>Settings</Typography>
            <form onSubmit={handleSubmit} className={classes.form}>
              <TextField
                name="username"
                type="text"
                id="username"
                label="Username"
                className="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <Button variant="outlined" color="primary" type="submit">Save</Button>
              <Alert width='100%' severity="success" message={successMessage} />
            </form>
          </Container>
        <LinearProgress style={{ display: loading ? 'flex' : 'none' }} />
      </Paper>
    </Container>
  )
}

const mapStateToProps = state => ({
  asanas: state.asanas,
  tags: state.asanas.tags
})

export default connect(mapStateToProps, { editAsana })(UserSettings)
