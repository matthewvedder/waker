import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, submit, Field } from 'redux-form'
import { connect } from 'react-redux'
import { createSequence } from '../actions'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class CreateSequence extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    createAsana: PropTypes.func,
    login: PropTypes.shape({
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array,
    }),
  }

  submit = (values) => {
    this.props.createSequence(values)
    this.props.onCreate()
  }

  renderTextField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <TextField
      autoFocus
      margin="dense"
      id="name"
      label={label}
      fullWidth
      {...input}
      {...custom}
    />
  )

  render () {
    const {
      handleSubmit,
      sequence: {
        requesting,
        successful,
        messages,
        errors,
      },
    } = this.props

    return (
      <div className="create-sequence">
        <form className="create-sequence-form" onSubmit={handleSubmit(this.submit.bind(this))}>
          <label htmlFor="name">Name</label>
          <Field
            name="name"
            type="text"
            id="name"
            className="name"
            component={this.renderTextField}
          />
          <Button type="submit">Create</Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  sequence: state.sequence
})

const connected = connect(mapStateToProps, { createSequence })(CreateSequence)

const formed = reduxForm({
  form: 'login',
})(connected)

export default formed
