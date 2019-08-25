import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateAsanaInstance } from '../actions'
import '../styles/InstanceNotesEdit.css'

// const listener = (event) => {
//     const specifiedElement = document.getElementById(`${this.props.id}-notes`)
//     const isClickInside = specifiedElement.contains(event.target)
//
//     if (!isClickInside && specifiedElement.style.display !== 'none') {
//       specifiedElement.blur()
//     }
//     this.input.focus()
//     this.input.setSelectionRange(this.input.value.length,this.input.value.length);
//     this.input.scrollTop = this.input.scrollHeight
// }

class InstanceNotesEdit extends Component {
  constructor(props) {
    super(props)
    this.state = { element: 'paragraph' }
    this.toTextField = this.toTextField.bind(this)
    this.toParagraph = this.toParagraph.bind(this)
    this.listener = this.listener.bind(this)
  }

  componentDidMount() {
    document.addEventListener('click', this.listener)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.listener)
  }

  listener(event) {
      const specifiedElement = document.getElementById(`${this.props.id}-notes`)
      const isClickInside = specifiedElement.contains(event.target)
      if (!isClickInside) {
        specifiedElement.blur()
        this.input.focus()
        this.input.setSelectionRange(this.input.value.length,this.input.value.length);
        this.input.scrollTop = this.input.scrollHeight
      }
  }


  toTextField() {
    this.setState({ element: 'textField'})
    // this.input.focus()
  }

  toParagraph(){
    this.props.updateAsanaInstance(this.props.id, { notes: this.input.value })
    this.setState({ element: 'paragraph'})
  }


  render() {
    const { notes, id } = this.props
    const { element } = this.state
    const pDisplay = element === 'paragraph' ? 'block' : 'none'
    return (
      <div>
        <p className='instance-drag-notes' onClick={this.toTextField} style={{ display: pDisplay }}>{notes}</p>
        <textarea
          id={`${id}-notes`}
          ref={input => this.input = input}
          className='instance-drag-notes-input'
          onBlur={this.toParagraph}
          defaultValue={notes}
          style={{ display: element === 'textField' ? 'block' : 'none' }}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  asanas: state.asanas
})


export default connect(mapStateToProps, { updateAsanaInstance })(InstanceNotesEdit)
