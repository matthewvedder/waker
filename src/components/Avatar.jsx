import React, { Component } from 'react'
import iyengar from '../images/bks1.jpg'
import '../styles/Avatar.css'

class Avatar extends Component {
  render() {
    return (
      <div className='avatar'>
        <img className='avatar-image' src={iyengar}/>
        <div>B.K.S. Iyengar</div>
      </div>
    )
  }
}

export default Avatar
