import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Link } from 'react-router-dom'
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
import { sendPasswordResetEmail } from '../services/UserService'
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
  title: {
    textAlign: 'center',
    marginBottom: '.3em',
    maxWidth: '50ch'
  },
  hr: {
    // margin: '1em',
    textAlign: 'center'
  },
  button: {
    width: '50ch',
    marginBottom: '1em'
  }
}));

const ForgotPassword = (props) => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errors, setErrors] = useState([])
  const classes = useStyles()

  const handleSubmit = (event) => {
    event.preventDefault()
    setTimeout(1000, () => {
      setLoading(true)
    })
    setSuccessMessage('')
    setErrors([])
    sendPasswordResetEmail({ email }).then(({ response, data }) => {
      setLoading(false)
      if (response.ok) {
        setSuccessMessage('Password reset link sent! Please check your email.')
      } else {
        setErrors(data.errors)
      }
    })
  }

  return (
    <Container className={classes.container} >
      <Paper square>
          <Container className={classes.innerContainer}>
            <Typography variant='h6' className={classes.title}>Trouble Logging In?</Typography>
            <Typography variant='subtitle2' className={classes.title} color='textSecondary'>
              Type in your email and we'll send you a link to reset your password.
            </Typography>
            <form onSubmit={handleSubmit} className={classes.form}>
              <TextField
                name="email"
                type="text"
                id="email"
                label="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Button variant="outlined" color="primary" type="submit">Send Reset Link</Button>
              <Alert width='100%' severity="success" message={successMessage} />
              <Errors errors={errors} />
              <Divider className={classes.hr} />
              <Link to="/signup">
                <Button className={classes.button} color='secondary' size='small'>Sign Up »</Button>
              </Link>
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

export default ForgotPassword
