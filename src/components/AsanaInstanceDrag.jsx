import React, { Component } from 'react'
import Thumbnail from './Thumbnail'
import '../styles/AsanaInstanceDrag.css'

class AsanaInstanceDrag extends Component {
  render() {
    const { image, asana, style } = this.props
    return (
      <div style={style} className='instance' {...this.props}>
        <Thumbnail img={image}/>
      </div>
    )
  }
}

export default AsanaInstanceDrag
