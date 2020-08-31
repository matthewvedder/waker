import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { fetchAsanas } from '../actions'
import CreateSequence from './CreateSequence'
import moment from 'moment'
import '../styles/sequences.css'


const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.primary.main,
  }
}))

const Asanas = (props) =>  {
  useEffect(() => {
    props.fetchAsanas()
  }, [])

  const classes = useStyles()

  const mapAsanas = () => {
    return props.asanas.map((asana) => {
      const { id, name, level, created_at } = asana
      return (
        <ListItem>
          <Link to={`/asanas/${id}/edit`} className={classes.link}>
            <ListItemText primary={name} />
          </Link>
        </ListItem>
      )
    })
  }

  return (
    <Container>
      <Paper className="sequences-container" square>
        <div className="sequences-header">
          <Typography variant="h5">
            Asanas
          </Typography>
          <Link to={'/asanas/new'}>
            <Button
              variant="outlined"
              color="primary"
            >
              New Asana
            </Button>
          </Link>
        </div>

        <Divider />

        <List component="nav">
          { mapAsanas() }
        </List>
      </Paper>
    </Container>
  )
}

const mapStateToProps = state => ({ asanas: state.asanas.asanas })

export default connect(mapStateToProps, { fetchAsanas })(Asanas)
