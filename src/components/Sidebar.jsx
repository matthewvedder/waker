import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Drawer from '@material-ui/core/Drawer';
import {
  faUser,
  faCompass,
  faGripHorizontal,
  faHome,
  faPlus
} from '@fortawesome/free-solid-svg-icons'
import Avatar from './Avatar'
import '../styles/Sidebar.css'

class Sidebar extends Component {
  className(route) {
    return route === window.location.pathname ? 'sidebar-item selected' : 'sidebar-item'
  }

  render() {
    return (
      <Drawer open={true}>
          <Avatar />
          <div className={this.className('/sequences')}>
            <Link to='/sequences'>
              <FontAwesomeIcon className='sidebar-icon' icon={faGripHorizontal} />
              <span className='sidebar-item-label'>My Sequences</span>
            </Link>
          </div>
          <div style={{ display: 'none' }} className={this.className('/asanas/new')}>
            <Link to='/asanas/new'>
              <FontAwesomeIcon className='sidebar-icon' icon={faPlus} />
              <span className='sidebar-item-label'>New Asana</span>
            </Link>
          </div>
        </Drawer>
    )
  }
}

export default Sidebar
