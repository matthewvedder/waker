import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import Messages from './Messages'
import Errors from './Errors'
import ImageEditor from './ImageEditor'
import { editAsana, fetchAsana } from '../actions'
import '../styles/CreateAsana.css'

class CreateAsana extends Component {
  // Pass the correct proptypes in for validation
  static propTypes = {
    handleSubmit: PropTypes.func,
    editAsana: PropTypes.func,
    login: PropTypes.shape({
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array,
    }),
  }

  componentWillMount() {
    const asanaId = window.location.href.split('/')[4]
    this.props.fetchAsana(asanaId)
  }

  // Remember, Redux Form passes the form values to our handler
  // In this case it will be an object with `email` and `password`
  submit = (values) => {
    const image = this.editor.getImageScaledToCanvas().toDataURL()
    this.props.editAsana({ ...values, image })
  }

  setEditorRef = editor => {
    if (editor) this.editor = editor
  }

  render () {
    const {
      handleSubmit, // remember, Redux Form injects this into our props
      asanas: {
        requesting,
        successful,
        messages,
        errors,
      },
    } = this.props

    return (
      <div className="create-asana">
        <ImageEditor setEditorRef={this.setEditorRef}/>
        <form className="create-asana-form" onSubmit={handleSubmit(this.submit.bind(this))}>
          <h1>Create Asana</h1>
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
          <label htmlFor="description">Description</label>
          <Field
            name="description"
            type="text"
            id="description"
            className="description"
            component="textarea"
          />
          <button action="submit">Create</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  asanas: state.asanas
})

const connected = connect(mapStateToProps, { editAsana, fetchAsana })(CreateAsana)

// in our Redux's state, this form will be available in 'form.login'
const formed = reduxForm({
  form: 'asana',
})(connected)

export default formed
