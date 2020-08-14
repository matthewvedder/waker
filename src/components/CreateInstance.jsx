import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { createAsanaInstance, fetchAsanas } from '../actions'
import fuzzysort from 'fuzzysort'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import Thumbnail from './Thumbnail'
import { withStyles } from '@material-ui/core/styles'
import TagFilter from './TagFilter'
import '../styles/CreateInstance.css'

class Selector extends Component {
  constructor(props) {
    super(props)
    this.state = { filteredAsanas: [], searchedAsanas: [] }
    this.mapAsanas = this.mapAsanas.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.addToSequence = this.addToSequence.bind(this)
    this.filterAsanas = this.filterAsanas.bind(this)
  }

  componentWillMount() {
    this.props.fetchAsanas()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ filteredAsanas: nextProps.asanas, searchedAsanas: nextProps.asanas })
  }

  sequenceId() {
    const { pathname } = window.location
    return pathname.split('/')[2]
  }

  handleSearch(event) {
    const { value } = event.target
    const { asanas } = this.props

    if (_.isEmpty(value)) {
      this.setState({ searchedAsanas: asanas })
      return
    }

    const options = {
      limit: 30, // don't return more results than you need!
      threshold: -10000, // don't return bad results
      key: 'name'
    }

    const results = fuzzysort.go(value, asanas, options)
    const searchedAsanas = results.map(result => result.obj)
    this.setState({ searchedAsanas })
  }

  filterAsanas(event, tags) {
    if (_.isEmpty(tags)) {
      this.setState({ filteredAsanas: this.props.asanas })
      return
    }

    const tag_names = tags.map(tag => tag.name)
    const filteredAsanas = this.props.asanas.filter(asana => {
      return tag_names.every(tag => asana.tag_list.includes(tag))
    })

    this.setState({ filteredAsanas })
  }

  addToSequence(asana_id) {
    const { onClose, sequenceId } = this.props
    this.props.createAsanaInstance(asana_id, sequenceId)
    onClose()
  }

  mapAsanas() {
    const { filteredAsanas, searchedAsanas } = this.state
    const asanas = filteredAsanas.filter(value => searchedAsanas.includes(value))
    return asanas.map((asana, index) => {
      return (
        <div className='instance-create-thumbnail' onClick={() => this.addToSequence(asana.id)}>
          <div><Thumbnail img={asana.thumbnail}/></div>
          <div className='instance-create-name'>{asana.name}</div>
        </div>
      )
    })
  }

  render() {
    const { visible, onClose, tags } = this.props
    return (
      <Dialog
        maxWidth="lg"
        onClose={onClose}
        aria-labelledby="simple-dialog-title"
        open={visible}
      >
        <DialogTitle id="simple-dialog-title">Add Asana</DialogTitle>
        <DialogContent>
          <div className='asana-filters'>
            <TextField
              autoFocus
              onChange={this.handleSearch}
              maxWidth="md"
              margin="dense"
              id="name"
              label="Search"
              type="search"
            />
            <TagFilter tags={tags} handleChange={this.filterAsanas} />
          </div>
        </DialogContent>
          <div className='create-instance-container'>
            <div className='instance-create-asanas'>
              { this.mapAsanas() }
            </div>
          </div>
       </Dialog>
    )
  }
}

const mapStateToProps = state => ({
  asanas: state.asanas.asanas,
  tags: state.asanas.tags
})

export default connect(mapStateToProps, { createAsanaInstance, fetchAsanas })(Selector)
