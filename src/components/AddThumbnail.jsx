import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { makeStyles } from '@material-ui/core/styles';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import '../styles/AddThumbnail.css'

const useStyles = makeStyles((theme) => {
  console.log(theme)
  return {
    root: {
      color: theme.palette.primary.main
    }
  }
})

const Thumbnail = (props) => {
  const classes = useStyles()
  return (
    <div className={`add-thumbnail ${classes.root}`} onClick={props.onClick}>
      <FontAwesomeIcon icon={faPlus} />
    </div>
  )
}

export default Thumbnail
