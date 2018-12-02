import React, { Component } from 'react'
import Navbar from './Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
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
          <FontAwesomeIcon icon={faCoffee} />
        </div>
      </div>
    )
  }
}

export default Sidebar
