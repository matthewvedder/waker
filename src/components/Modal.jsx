import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import '../styles/Modal.css'

class Modal extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { visible, title, children, onClose } = this.props
    const display = visible ? 'absolute' : 'none'
    return (
      <div style={{ display }} className='modal'>
        <div className='modal-content'>
          <div className='modal-header'>
            <div className='modal-title'>{ title }</div>
            <FontAwesomeIcon onClick={onClose} className='close-modal' icon={faTimes} />
          </div>
          <div className='modal-body'>
            { children }
          </div>
        </div>
      </div>
    )
  }
}

export default Modal
