import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSequences, deleteSequence } from '../actions'
import { toggleLike } from '../services/LikeService'
import CreateSequence from './CreateSequence'
import EditSequence from './EditSequence'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Like from './Like'
import '../styles/sequences.css'

class Sequences extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalOpen: false,
      deleteModalOpen: false,
      editModalOpen: false,
      hoveringOver: null,
      id: null,
      sequence: null
    }
    this.handleAddClick = this.handleAddClick.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
  }
  componentWillMount() {
    this.props.fetchSequences()
  }

  handleSequenceClick(id) {
    this.props.history.push(`/sequences/${id}`)
  }

  handleAddClick() {
    this.setState({ modalOpen: true })
  }

  handleDeleteClick(id) {
    this.setState({ id, deleteModalOpen: true })
  }

  handleEditClick(sequence) {
    this.setState({ sequence, editModalOpen: true })
  }

  handleConfirmDeleteClick(id) {
    this.props.deleteSequence(id)
    this.setState({ deleteModalOpen: false })
  }

  handleLikeClick(sequence) {
    toggleLike(sequence.like_by_current_user, sequence.id).then(
      fetchSequences
    )
  }

  mapSequences() {
    return this.props.sequences.map((sequence) => {
      const { id, name, level, created_at, likes } = sequence

      return (
          <ListItem
            button
            onMouseEnter={() => this.setState({ hoveringOver: id })}
            onMouseLeave={() => this.setState({ hoveringOver: null })}
            onClick={ () => this.handleSequenceClick(id) }
          >
            <ListItemText primary={name}  secondary={moment(created_at).format('MMMM Do YYYY')} />
            <div
              className='list-like-container'
              style={{ display: likes && likes.length > 0 ? 'flex' : 'none' }}
            >
              <FavoriteIcon />
              <Typography variant="caption">{likes && likes.length}</Typography>
            </div>
            <ListItemSecondaryAction>
               <IconButton edge="end" aria-label="delete" onClick={() => this.handleEditClick(sequence)}>
                 <EditIcon style={{ color: '#C38D9B' }} />
               </IconButton>
               <IconButton edge="end" aria-label="delete" onClick={() => this.handleDeleteClick(id)}>
                 <DeleteIcon style={{ color: '#E27D60' }} />
               </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
      )
    })
  }
  render() {
    const { id, deleteModalOpen, sequence } = this.state
    return (
      <Container>
        <Paper className="sequences-container" square>
          <div className="sequences-header">
            <Typography variant="h5">
              Your Sequences
            </Typography>
            <Button
              onClick={this.handleAddClick}
              variant="outlined"
              color="primary"
            >
              New Sequence
            </Button>
          </div>
          <Divider />
           <List component="nav">
            { this.mapSequences() }
           </List>

           {/*Edit*/}
           <Dialog
            open={this.state.editModalOpen}
            onClose={() => this.setState({ editModalOpen: false })}
            aria-labelledby="form-dialog-title"
           >
            <DialogTitle id="form-dialog-title">Edit Sequence</DialogTitle>
            <DialogContent>
             <EditSequence
               onSubmit={() => this.setState({ editModalOpen: false })}
               sequence={sequence}
             />
            </DialogContent>
           </Dialog>

           {/*Create*/}
           <Dialog
            open={this.state.modalOpen}
            onClose={() => this.setState({ modalOpen: false })}
            aria-labelledby="form-dialog-title"
           >
            <DialogTitle id="form-dialog-title">New Sequence</DialogTitle>
            <DialogContent>
             <CreateSequence onSubmit={() => this.setState({ modalOpen: false })} />
            </DialogContent>
           </Dialog>

           {/*Destroy*/}
           <Dialog
              open={deleteModalOpen}
              onClose={() => this.setState({ deleteModalOpen: false })}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Are you sure you want to delete this?</DialogTitle>
              <DialogActions>
                <Button onClick={() => this.setState({ deleteModalOpen: false })} color="primary">
                  Nevermind
                </Button>
                <Button onClick={() => this.handleConfirmDeleteClick(id)} color="primary" autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
         </Paper>
        </Container>
    )
  }
}

const mapStateToProps = state => ({ sequences: state.sequence.sequences })

export default connect(mapStateToProps, { fetchSequences, deleteSequence })(Sequences)
