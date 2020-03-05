import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ResponsiveDrawer from './ResponsiveDrawer'
import {
  faUser,
  faCompass,
  faGripHorizontal,
  faHome,
  faPlus
} from '@fortawesome/free-solid-svg-icons'
import Avatar from './Avatar'

class Sidebar extends Component {
  className(route) {
    return route === window.location.pathname ? 'sidebar-item selected' : 'sidebar-item'
  }



  render() {
    return (
      <ResponsiveDrawer open={true} >
      <List>
        <Link to='/sequences'>
          <ListItem button key={'My Sequences'}>
            <ListItemIcon>{<MailIcon />}</ListItemIcon>
            <ListItemText primary={'My Sequences'} />
          </ListItem>
        </Link>
      </List>
    </ResponsiveDrawer>
    )
  }
}

export default Sidebar
