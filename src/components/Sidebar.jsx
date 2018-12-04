import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCompass, faGripHorizontal, faHome } from '@fortawesome/free-solid-svg-icons'
import Avatar from './Avatar'
import '../styles/Sidebar.css'

class Sidebar extends Component {
  state = {
    selectedIndex: 1,
  };

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };
  render() {
    return (
      <div className='sidebar'>
        <div className='sidebar-opac'>
          <Avatar />
          <div style={{ backgroundColor: '#41b3a3' }} className='sidebar-item'>
            <FontAwesomeIcon icon={faHome} />
            <span className='sidebar-item-label'>Home</span>
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
        </div>
      </div>
    )
  }
}

export default Sidebar
