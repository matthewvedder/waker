import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { updateAsanaInstance } from '../actions'
import Messages from './Messages'
import Errors from './Errors'
import ImageEditor from './ImageEditor'
import '../styles/InstanceEdit.css'

class InstanceEditForm extends Component {
  // Pass the correct proptypes in for validation
  static propTypes = {
    handleSubmit: PropTypes.func,
    initialize: PropTypes.func,
    instances: PropTypes.shape({
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array,
    }),
  }

  componentWillMount() {
    const { initialize, instance_id, instances: { asanas } } = this.props
    const instance = asanas.find(a => a.id === instance_id) || {}
    const { duration_qty, duration_unit, side, notes } = instance
    this.props.initialize({ duration_qty, duration_unit, side, notes })
  }

  submit = (values) => {
    this.props.updateAsanaInstance(this.props.instance_id, values)
    this.props.onSubmit()
  }

  setEditorRef = editor => {
    if (editor) this.editor = editor
  }

  render () {
    const {
      handleSubmit, // remember, Redux Form injects this into our props
      instance_id,
      instances: {
        requesting,
        successful,
        messages,
        errors,
        asanas
      },
    } = this.props
    return (
      <div className="instance-edit">
        <h1>Notes</h1>
        <form onSubmit={handleSubmit(this.submit.bind(this))}>
          <label>Duration</label>
          <div className='edit-duration'>
            <Field
              name="duration_qty"
              type="text"
              id="duration_qty"
              className="duration-qty"
              component="input"
            />
            <Field
              name="duration_unit"
              type="text"
              id="duration_unit"
              className="duration_unit"
              component="select"
            >
              <option></option>
              <option value="breaths">Breaths</option>
              <option value="minutes">Minutes</option>
              <option value="seconds">Seconds</option>
            </Field>
          </div>
          <label htmlFor="side">Side</label>
          <Field
            name="side"
            type="text"
            id="side"
            className="side"
            component="select"
          >
            <option></option>
            <option value="left">Left</option>
            <option value="right">Right</option>
            <option value="both">Both</option>
          </Field>
          <label htmlFor="notes">Notes</label>
          <Field
            name="notes"
            type="text"
            id="notes"
            className="notes"
            component="textarea"
          />
          <button action="submit">Edit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  instances: state.asanaInstances,
  intitialValues: { duration_qty: 5, duration_unit: 'minutes' }
})

// make Redux state piece of `login` and our action `createAsana`
// available in this.props within our component
const connected = connect(mapStateToProps, { updateAsanaInstance })(InstanceEditForm)

const formed = reduxForm({
  form: 'edit_instance',
  intitialValues: { duration_qty: 5, duration_unit: 'minutes' }
})(connected)

export default formed
