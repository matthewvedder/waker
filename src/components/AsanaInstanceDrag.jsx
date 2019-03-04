import React, { Component } from 'react'
import Thumbnail from './Thumbnail'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faEye } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import '../styles/AsanaInstanceDrag.css'

class AsanaInstanceDrag extends Component {
  constructor(props) {
    super(props)
    this.state = { hovering: false }
  }

  render() {
    const { image, asana, onDelete, handleEditClick } = this.props
    const propsFromGrid = _.omit(this.props, ['image', 'asana', 'onDelete', 'handleEditClick'])
    return (
      <div {...propsFromGrid}>
        <div
          className='instance'
          onMouseEnter={() => this.setState({ hovering: true })}
          onMouseLeave={() => this.setState({ hovering: false })}
        >
          <div className='instance-image-drag'>
            <Thumbnail img={image}/>
          </div>
          <div className='instance-drag-icons'>
            <FontAwesomeIcon
              className='instance-drag-pen instance-drag-icon'
              icon={faPen}
              onClick={handleEditClick}
              style={{ display: this.state.hovering ? 'inherit' : 'none' }}
            />
            <FontAwesomeIcon
              className='instance-drag-eye instance-drag-icon'
              icon={faEye}
              style={{ display: this.state.hovering ? 'inherit' : 'none' }}
            />
            <FontAwesomeIcon
              className='instance-drag-trash instance-drag-icon'
              icon={faTrash}
              onClick={onDelete}
              style={{ display: this.state.hovering ? 'inherit' : 'none' }}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default AsanaInstanceDrag
