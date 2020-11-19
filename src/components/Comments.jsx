import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Paper from'@material-ui/core/Paper'
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { fetchComments, createComment, destroyComment } from '../services/CommentService'
import DeleteButton from './DeleteButton'
import Avatar from './Avatar'
import { currentUser } from '../lib/Auth'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2em'
  },
  addComment: {
    padding: '1.3em'
  },
  postButton: {
    marginTop: '1em'
  }
}));

export default function Comments(props) {
  const classes = useStyles();
  const [inputText, setInputText] = useState('')
  const [comments, setComments] = useState([])

  useEffect(() => {
    fetchComments(props.apiArgs)
      .then((result) => setComments(result))
  }, [])

  const handleAddCommentClick = () => {
    const lastCommentsState = comments
    const user = currentUser()
    const comment = { ...props.apiArgs, message: inputText }
    setComments([...comments, { ...comment, user } ])
    setInputText('')
    createComment(comment).then(result => {
      setComments([...comments, result])
    })
  }

  const handleConfirmDelete = (id) => {
    destroyComment(id)
    setComments(comments.filter(comment => comment.id !== id))
  }

  const mapComments = () => {
    return comments.map((comment) => {
      const commentActionsDisplay = comment.user.id === currentUser().id ?  'inherit' : 'none'
      return (
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar user={comment.user} />
          </ListItemAvatar>
          <ListItemText
            style={{whiteSpace: 'pre-line'}}
            primary={comment.user.username}
            secondary={comment.message}
          />
          <ListItemSecondaryAction style={{ display: commentActionsDisplay }}>
            <DeleteButton
              handleConfirmDelete={() => handleConfirmDelete(comment.id)}
            />
          </ListItemSecondaryAction>
        </ListItem>
      )}
    )
  }

  return (
    <Paper square className={classes.root}>
      <List >
        { mapComments() }
      </List>
      <div className={classes.addComment}>
        <TextField
          multiline
          fullWidth
          placeholder="Add a comment..."
          onChange={(event) => setInputText(event.target.value)}
          value={inputText}
        />
        <Button
          onClick={handleAddCommentClick}
          variant='outlined'
          color="primary"
          className={classes.postButton}
          disabled={inputText.length === 0}
        >
          Post
        </Button>
      </div>
    </Paper>
  );
}
