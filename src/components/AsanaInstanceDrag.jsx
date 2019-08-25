import React, { Component } from 'react'
import Thumbnail from './Thumbnail'
import InstanceNotesEdit from './InstanceNotesEdit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import '../styles/AsanaInstanceDrag.css'

class AsanaInstanceDrag extends Component {
  constructor(props) {
    super(props)
    this.state = { hovering: false }
  }

  render() {
    const { image, asana, onDelete, handleEditClick, id } = this.props
    return (
      <div id={id} className='asana-instance-drag'>
        <div
          className='instance'
          onMouseEnter={() => this.setState({ hovering: true })}
          onMouseLeave={() => this.setState({ hovering: false })}
        >
          <div className='instance-image-drag'>
            <Thumbnail img={image}/>
          </div>
          <div className='instance-drag-info'>
            <div className='instance-drag-name'>{asana.asana.name}</div>
            <InstanceNotesEdit notes={asana.notes} id={id} />
          </div>
          <div className='instance-drag-icons'>
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
