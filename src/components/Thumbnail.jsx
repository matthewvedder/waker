import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import '../styles/Thumbnail.css'

class Thumbnail extends Component {
  render() {
    return (
      <Paper className='thumbnail'>
          <img className='thumbnail-img' src={this.props.img}/>
      </Paper>
    )
  }
}

export default Thumbnail
