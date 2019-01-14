import React, { Component } from 'react'
import { connect } from 'react-redux'
import { unsetClient } from '../actions'
import { logOut } from '../lib/Auth'
import '../styles/Navbar.css'

class NavBar extends Component {
  render() {
    return (
      <div className='navbar'>
        <div className='logout' onClick={logOut}>Log Out</div>
      </div>
    )
  }
}

export default connect(null, { unsetClient })(NavBar)
