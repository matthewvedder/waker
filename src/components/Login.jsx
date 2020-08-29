import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


import Messages from './Messages'
import Errors from './Errors'
import { loginRequest } from '../actions'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    // backgroundColor: 'red',
  },
  authMessages: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    '& > *': {
      margin: theme.spacing(1),
    },
    width: '50ch',
    // backgroundColor: 'blue',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '15em',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
      marginTop: '5em',
    },
    link: { color: 'grey' },
  },
}));

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    props.loginRequest({ email, password })
  }

    const {
      login: {
        requesting,
        successful,
        messages,
        errors,
      },
    } = props

    const classes = useStyles()

    return (
      <div className={classes.container}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Typography variant="h4">Log In</Typography >
          {/*
            Our Redux Form Field components that bind email and password
            to our Redux state's form -> login piece of state.
          */}
          <TextField
            name="email"
            type="text"
            id="email"
            label="Email"
            className="email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            name="password"
            type="password"
            label="Password"
            id="password"
            className="password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">Log In</Button>
        </form>
        <div className={classes.authMessages}>
          {/* As in the signup, we're just using the message and error helpers */}
          {!requesting && !!errors.length && (
            <Errors message="Failure to login due to:" errors={errors} />
          )}
          {!requesting && !!messages.length && (
            <Messages messages={messages} />
          )}
          {!requesting && !successful && (
            <Link to="/signup">
              <span style={{ color: useTheme().palette.text.primary }}>
                Need to Signup? Click Here »
              </span>
            </Link>
          )}
          {requesting && <div>Logging in...</div>}
        </div>
      </div>
    )
}

const mapStateToProps = state => ({
  login: state.login,
})

// make Redux state piece of `login` and our action `loginRequest`
// available in props within our component
export default connect(mapStateToProps, { loginRequest })(Login)
