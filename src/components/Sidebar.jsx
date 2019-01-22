import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
      <div className='sidebar'>
        <div className='sidebar-opac'>
          <Avatar />
          <div className={this.className('/')}>
            <Link to='/'>
              <FontAwesomeIcon className='sidebar-icon' icon={faHome} />
              <span className='sidebar-item-label'>Home</span>
            </Link>
          </div>
          <div className='sidebar-item'>
            <FontAwesomeIcon icon={faUser} />
            <span className='sidebar-item-label'>User Info</span>
          </div>
          <div className='sidebar-item'>
            <FontAwesomeIcon icon={faCompass} />
            <span className='sidebar-item-label'>Explore</span>
          </div>
          <div className='sidebar-item'>
            <FontAwesomeIcon icon={faGripHorizontal} />
            <span className='sidebar-item-label'>My Sequences</span>
          </div>
          <div className={this.className('/asanas/new')}>
            <Link to='/asanas/new'>
              <FontAwesomeIcon className='sidebar-icon' icon={faPlus} />
              <span className='sidebar-item-label'>New Asana</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Sidebar
