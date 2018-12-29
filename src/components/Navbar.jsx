import React, { Component } from 'react'
import { connect } from 'react-redux'
import { unsetClient } from '../actions'
import '../styles/Navbar.css'

class NavBar extends Component {
  render() {
    return (
      <div className='navbar'>
        <div className='logout' onClick={this.props.unsetClient}>Log Out</div>
      </div>
    )
  }
}

export default connect(null, { unsetClient })(NavBar)
