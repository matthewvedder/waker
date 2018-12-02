import React, { Component } from 'react'
import Navbar from './Navbar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

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
        <div className='sidebar-opac' />
      </div>
    )
  }
}

export default Sidebar
