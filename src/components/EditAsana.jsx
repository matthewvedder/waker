import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import Messages from './Messages'
import Errors from './Errors'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TagFilter from './TagFilter'
import Thumbnail from './Thumbnail'
import { makeStyles } from '@material-ui/core/styles'
import { editAsana } from '../actions'
import { fetchAsana, fetchTags } from '../sagas/AsanaSagas'
import { getAsanaImageUrl } from '../lib/utils'


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '7em',
  },
  paper: {
    padding: '2em'
  },
  form: {
    '& > *': {
      margin: theme.spacing(1),
    },
    width: '50ch',
    // backgroundColor: 'blue',
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.down('sm')]: {
      width: '80%',
      marginTop: '5em',
    },
    link: { color: 'grey' },
  },
}));

const EditAsana = (props) => {
  const [tags, setTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [name, setName] = useState('')
  const [fileName, setFileName] = useState('')
  const [description, setDescription] = useState('')
  const classes = useStyles()

  useEffect(() => {
    fetchAsana(asanaId()).then(result => {
      setSelectedTags(result.tag_list)
      setName(result.name)
      setFileName(result.file_name)
      setDescription(result.description)
    })

    fetchTags().then(result => {
      setTags(result.map(tag => tag.name))
    })
  }, [])

  const asanaId = () => {
    return window.location.href.split('/')[4]
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.editAsana(asanaId(), { name, description, tag_list: selectedTags, file_name: fileName })
  }

  return (
    <Container className={classes.container} >
      <Paper className={classes.paper} square>
        <Typography variant='h5'>Edit Asana</Typography>
        <Thumbnail img={getAsanaImageUrl({ file_name: fileName })}/>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            name="name"
            type="text"
            id="name"
            label="Name"
            className="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            name="fileName"
            type="text"
            id="fileName"
            label="File Name"
            className="fileName"
            value={fileName}
            onChange={(event) => setFileName(event.target.value)}
          />
          <TextField
            name="description"
            type="text"
            id="description"
            label="Description"
            className="description"
            value={description}
            multiline
            onChange={(event) => setDescription(event.target.value)}
          />
          <TagFilter
            tags={tags}
            selectedTags={selectedTags}
            width='48.5ch'
            handleChange={(e, tags) => setSelectedTags(tags)}
          />
          <Button variant="contained" color="primary" type="submit">Save</Button>
        </form>
      </Paper>
    </Container>
  )
}

const mapStateToProps = state => ({
  asanas: state.asanas,
  tags: state.asanas.tags
})

export default connect(mapStateToProps, { editAsana })(EditAsana)
