import React, { Component } from 'react'
import { Manager, Reference, Popper } from 'react-popper'
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
      <Manager>
        <Reference>
          {({ ref }) => (
            <div {...propsFromGrid} ref={ref}>
              <div
                className='instance'
                onMouseEnter={() => this.setState({ hovering: true })}
                onMouseLeave={() => this.setState({ hovering: false })}
              >
                <div className='instance-image-drag'>
                  <Thumbnail img={image}/>
                </div>
              </div>
            </div>
          )}
        </Reference>
        <Popper placement="bottom">
        {({ ref, style, placement, arrowProps, scheduleUpdate }) => {
          scheduleUpdate()
          return (
            <div ref={ref} style={{ zIndex: 100, ...style }} data-placement={placement}>
              <div style={{ display: this.state.hovering ? 'inherit' : 'none' }}>
                Popper element
              </div>
              <div ref={arrowProps.ref} style={arrowProps.style} />
            </div>
        )
      }}
      </Popper>
      </Manager>
    )
  }
}

export default AsanaInstanceDrag
