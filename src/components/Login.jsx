import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';

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


const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    label={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)
// If you were testing, you'd want to export this component
// so that you can test your custom made component and not
// test whether or not Redux and Redux Form are doing their jobs
const Login = (props) => {
  // Pass the correct proptypes in for validation
  const propTypes = {
    handleSubmit: PropTypes.func,
    loginRequest: PropTypes.func,
    login: PropTypes.shape({
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array,
    }),
  }

  // Remember, Redux Form passes the form values to our handler
  // In this case it will be an object with `email` and `password`
  const submit = (values) => {
    props.loginRequest(values)
  }

    const {
      handleSubmit, // remember, Redux Form injects this into our props
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
        <form className={classes.form} onSubmit={handleSubmit(submit)}>
          <h1>LOGIN</h1>
          {/*
            Our Redux Form Field components that bind email and password
            to our Redux state's form -> login piece of state.
          */}
          <Field
            name="email"
            type="text"
            id="email"
            label="Email"
            className="email"
            component={renderTextField}
          />
          <Field
            name="password"
            type="password"
            label="Password"
            id="password"
            className="password"
            component={renderTextField}
          />
          <Button type="submit" variant="contained" color="primary">LOGIN</Button>
        </form>
        <div className="auth-messages">
          {/* As in the signup, we're just using the message and error helpers */}
          {!requesting && !!errors.length && (
            <Errors message="Failure to login due to:" errors={errors} />
          )}
          {!requesting && !!messages.length && (
            <Messages messages={messages} />
          )}
          {requesting && <div>Logging in...</div>}
          {!requesting && !successful && (
            <Link to="/signup">
              <span style={{ color: useTheme().palette.text.primary }}>
                Need to Signup? Click Here »
              </span>
            </Link>
          )}
        </div>
      </div>
    )
}

const mapStateToProps = state => ({
  login: state.login,
})

// make Redux state piece of `login` and our action `loginRequest`
// available in props within our component
const connected = connect(mapStateToProps, { loginRequest })(Login)

// in our Redux's state, this form will be available in 'form.login'
const formed = reduxForm({
  form: 'login',
})(connected)

export default formed
