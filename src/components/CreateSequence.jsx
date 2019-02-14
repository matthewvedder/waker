import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { createSequence } from '../actions'
import '../styles/CreateSequence.css'

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
          <h1>Create Sequence</h1>
          <label htmlFor="name">Name</label>
          <Field
            name="name"
            type="text"
            id="name"
            className="name"
            component="input"
          />
          <label htmlFor="level">Level</label>
          <Field
            name="level"
            type="text"
            id="level"
            className="level"
            component="select"
          >
            <option></option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </Field>
          <button action="submit">Create</button>
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
