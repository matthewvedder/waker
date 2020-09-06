import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Redirect } from 'react-router-dom'
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
import { resetPassword } from '../services/UserService'
import { currentUser, setCurrentUser } from '../lib/Auth'
import { mapErrorMessages } from '../lib/api-errors'
import LinearProgress from '@material-ui/core/LinearProgress'
import Alert from './Alert'
import Divider from '@material-ui/core/Divider';


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

const ResetPassword = (props) => {
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState([])
  const classes = useStyles()

  const handleSubmit = (event) => {
    event.preventDefault()
    setTimeout(1000, () => {
      setLoading(true)
    })
    setErrors([])
    resetPassword({ password, password_confirmation: passwordConfirmation }).then(({ response, data }) => {
      setLoading(false)
      if (response.ok) {
        setSuccess(true)
      } else {
        setErrors(data.errors)
      }
    })
  }

  if (success) return <Redirect to="/" />

  return (
    <Container className={classes.container} >
      <Paper square>
          <Container className={classes.innerContainer}>
            <Typography variant='h6' className={classes.title}>Reset Password</Typography>
            <form onSubmit={handleSubmit} className={classes.form}>
              <TextField
                name="password"
                type="password"
                label="Password"
                id="password"
                className="password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <TextField
                name="password-confirmation"
                type="password"
                label="Password Confirmation"
                id="password-confirmation"
                onChange={(event) => setPasswordConfirmation(event.target.value)}
              />
              <Button variant="outlined" color="primary" type="submit">Reset Password</Button>
              <Errors errors={errors} />
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

export default ResetPassword
