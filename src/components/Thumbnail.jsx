import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import '../styles/Thumbnail.css'

class Thumbnail extends Component {
  render() {
    if (this.props.img) {
      return (
        <img crossorigin="anonymous" className='thumbnail-img' src={this.props.img}/>
      )
    } else {
      return <div className='thumbnail-img'/>
    }
  }
}

export default Thumbnail
