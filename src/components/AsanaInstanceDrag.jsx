import React, { Component } from 'react'
import Thumbnail from './Thumbnail'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import '../styles/AsanaInstanceDrag.css'

class AsanaInstanceDrag extends Component {
  constructor(props) {
    super(props)
    this.state = { hovering: false }
  }

  render() {
    const { image, asana, onDelete } = this.props
    const propsFromGrid = _.omit(this.props, ['image', 'asana', 'onDelete'])
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
