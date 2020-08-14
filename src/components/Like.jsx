import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import pluralize from 'pluralize'
import { useTheme, makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const LikeIcon = ({ isActive, classes }) => {
  const theme = useTheme()

  if (isActive) {
    return <FavoriteIcon style={{ color: theme.palette.secondary.main }} />
  } else {
    return <FavoriteBorderOutlinedIcon />
  }
}

const Like = ({ like_by_current_user, likes, onClick }) => {
  const [isActive, setIsActive] = useState(!_.isEmpty(like_by_current_user))
  const [numLikes, setNumLikes] = useState(likes.length)
  const classes = useStyles()

  const handleLikeClick = () => {
    onClick()
    setIsActive(!isActive)

    if (isActive) {
      setNumLikes(numLikes - 1)
    } else {
      setNumLikes(numLikes + 1)
    }
  }

  return (
    <div className={classes.root}>
      <IconButton edge="end" aria-label="delete" onClick={handleLikeClick}>
        <LikeIcon isActive={isActive} classes={classes} />
      </IconButton>
      <Typography variant="caption" style={{ display: numLikes > 0 ? 'flex' : 'none' }}>
        {numLikes} {pluralize('likes', numLikes)}
      </Typography>
    </div>
  )
}

export default Like
