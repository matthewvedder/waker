import React, { Component } from 'react'
import { Link } from "react-router-dom"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ViewListIcon from '@material-ui/icons/ViewList';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import { makeStyles } from '@material-ui/core/styles';
import ResponsiveDrawer from './ResponsiveDrawer'

const useStyles = makeStyles(theme => ({
  listItem: {
    color: theme.palette.text.primary
  }
}));

export default function Sidebar() {
  const classes = useStyles()
  return (
    <ResponsiveDrawer open={true} >
    <List className={classes.root}>
      <Link to='/sequences'>
        <ListItem button key={'My Sequences'} className={classes.listItem}>
          <ListItemIcon>{<ViewListIcon className={classes.listItem} />}</ListItemIcon>
          <ListItemText primary={'My Sequences'} />
        </ListItem>
      </Link>
    </List>
  </ResponsiveDrawer>
  )
}
