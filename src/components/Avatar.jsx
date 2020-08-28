import React from 'react'
import { useTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';


export default (props) => {
  const { user: { username, id } } = props
  const theme = useTheme()
  const colors = ['primary', 'secondary', 'error', 'warning', 'info']
  const color = colors[id % colors.length]
  const avatarStyle = {
    color: theme.palette.getContrastText(theme.palette.secondary.main),
    backgroundColor: (theme.palette[color].main),
  }
  const avatarText = username ? username[0] : null

  return (
    <Avatar
      style={avatarStyle}
      alt={username}
    >
      { avatarText }
    </Avatar>
  )
}
