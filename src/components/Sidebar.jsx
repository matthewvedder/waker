import React, { Component } from 'react'
import Navbar from './Navbar'
import '../styles/Sidebar.css'

class Sidebar extends Component {
  render() {
    return (
      <div className='sidebar'>
        <Navbar />
        <div></div>
      </div>
    )
  }
}

export default Sidebar
