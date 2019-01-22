import React, { Component } from 'react'
import Thumbnail from './Thumbnail'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import '../styles/AsanaInstanceDrag.css'

class AsanaInstanceDrag extends Component {
  constructor(props) {
    super(props)
    this.state = { hovering: false }
  }

  render() {
    const { image, asana, style, onDelete } = this.props
    return (
      <div style={style} {...this.props}>
        <div
          className='instance'
          onMouseEnter={() => this.setState({ hovering: true })}
          onMouseLeave={() => this.setState({ hovering: false })}
        >
          <div className='instance-image-drag'>
            <Thumbnail img={image}/>
          </div>
          <FontAwesomeIcon
            className='instance-drag-trash'
            icon={faTrash}
            onClick={onDelete}
            style={{ display: this.state.hovering ? 'inherit' : 'none' }}
          />
        </div>
      </div>
    )
  }
}

export default AsanaInstanceDrag
