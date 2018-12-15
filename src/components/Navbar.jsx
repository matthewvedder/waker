import React, { Component } from 'react'
import { logOut } from '../Auth'
import '../styles/Navbar.css'

class Canvas extends Component {
  render() {
    return (
      <div className='navbar'>
        <div className='logout' onClick={logOut}>Log Out</div>
      </div>
    )
  }
}

export default Canvas
