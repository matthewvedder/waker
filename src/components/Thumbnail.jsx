import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import '../styles/Thumbnail.css'

class Thumbnail extends Component {
  render() {
    return (
      <img crossorigin="anonymous" className='thumbnail-img' src={this.props.img}/>
    )
  }
}

export default Thumbnail
