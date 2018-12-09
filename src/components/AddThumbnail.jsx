import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import '../styles/AddThumbnail.css'

class Thumbnail extends Component {
  render() {
    return (
      <div className='add-thumbnail'>
        <FontAwesomeIcon icon={faPlus} />
      </div>
    )
  }
}

export default Thumbnail
