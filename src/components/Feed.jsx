import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { indexRequest } from '../sagas/SequenceSagas'
import CreateSequence from './CreateSequence'
import EditSequence from './EditSequence'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExploreIcon from '@material-ui/icons/Explore';
import { useTheme } from "@material-ui/core/styles";
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from '@material-ui/core/Avatar';
import '../styles/sequences.css'

const Sequences = (props) => {
  const [sequences, setSequences] = useState([])

  useEffect(() => {
    fetchSequences()
  }, [])

  const fetchSequences = async () => {
    const response = await indexRequest({ feed: true })
    setSequences(response)
  }

  const handleSequenceClick = (id) => {
    props.history.push(`/sequences/${id}`)
  }

  const handleLikeClick = (sequence) => {
    console.log(sequence)
  }

  const mapSequences = () => {
    return sequences.map((sequence) => {
      const { id, name, level, created_at, user: { username} } = sequence
      const avatarText = username ? username[0] : null
      const secondaryText = `${username} - ${moment(sequence.created_at).fromNow()}`
      return (
          <ListItem
            button
            onClick={ () => handleSequenceClick(id) }
          >
            <ListItemAvatar>
              <Avatar alt={username}>{ avatarText }</Avatar>
            </ListItemAvatar>
            <ListItemText primary={name}  secondary={secondaryText} />
            <ListItemSecondaryAction>
               <IconButton edge="end" aria-label="delete" onClick={() => handleLikeClick(sequence)}>
                 <FavoriteIcon style={{ color: '#C38D9B' }} />
               </IconButton>
             </ListItemSecondaryAction>
          </ListItem>
      )
    })
  }

  return (
    <Container>
      <Paper className="sequences-container" square>
        <div className="sequences-header">
          <Typography variant="h5">
            Explore Sequences
          </Typography>
        </div>
        <Divider />
         <List component="nav">
          { mapSequences() }
         </List>
       </Paper>
      </Container>
  )
}

export default Sequences
