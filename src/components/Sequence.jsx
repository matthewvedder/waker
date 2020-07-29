import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dragula from 'react-dragula'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import html2canvas from 'html2canvas'
import autoScroll from 'dom-autoscroller'
import SequenceGrid from './SequenceGrid'
import InstanceEditModal from './InstanceEditModal'
import CreateInstance from './CreateInstance'
import '../styles/Sequence.css'
import {
  fetchAsanaInstances,
  updateSequence,
  fetchSequence,
  setAsanaInstanceState,
  deleteAsanaInstance
} from '../actions'

const NUM_COLUMNS = 6

class Canvas extends Component {
  constructor(props) {
    super(props)
    this.state = { layout:  [], editModalOpen: false, createModalOpen: false, instance_id: null }
    this.dragContainers = []
    this.exportSequence = this.exportSequence.bind(this)
    this.dragulaDecorator = this.dragulaDecorator.bind(this)
    this.handleLayoutChange = this.handleLayoutChange.bind(this)
  }

  componentWillMount() {
    this.props.fetchSequence(this.id())
    this.props.fetchAsanaInstances(this.id())
  }

  componentDidMount () {
    const drake = Dragula(this.dragContainers, {
      moves: (el, source, handle, sibling) => {
        return el.id !== 'add-thumbnail'
      },
      accepts: function (el, target, source, sibling) {
        return sibling !== null
      },
    })

    var scroll = autoScroll(this.dragContainers, {
      margin: 20,
      maxSpeed: 20,
      scrollWhenOutside: true,
      autoScroll: function(){
          //Only scroll when the pointer is down, and there is a child being dragged.
          return this.down && drake.dragging;
      }
  });

    drake.on('drop', () => this.handleLayoutChange())
  }

  exportSequence() {
    const htmlSource = document.getElementById('sequence-grid')
    const width = htmlSource.scrollWidth
    const height = htmlSource.scrollHeight
    htmlSource.style = 'overflow:visible;'
    const name = this.props.sequence.name || 'sequence'
    html2canvas(htmlSource, { useCORS: true, width, height }).then((canvas) => {
        const blob = canvas.toDataURL('image/png').replace("image/png", "image/octet-stream")
        const hiddenLink = document.createElement("a")
        hiddenLink.download = `${name.split(' ').join('-')}.png`
        hiddenLink.href = blob
        document.body.appendChild(hiddenLink)
        hiddenLink.click()
        document.body.removeChild(hiddenLink)
      })

      htmlSource.style = 'overflow:scroll;'
  }

  handleLayoutChange() {
    const elements = document.getElementsByClassName('asana-instance-drag')
    const ids = _.uniq(Array.from(elements).map(el => el.id))
    this.props.updateSequence({ layout: ids }, this.id())
  }

  id() {
    const { pathname } = window.location
    return pathname.split('/')[2]
  }

  dragulaDecorator(componentBackingInstance) {
    if (componentBackingInstance) {
      this.dragContainers.push(componentBackingInstance)
    }
  }

  render() {
    const { editModalOpen, instance_id } = this.state
    return (
      <div className='sequence-grid-container' id='sequence'>
        <div className='sequence-header'>
          <div className='sequence-name'>{this.props.sequence.name}</div>
          <FontAwesomeIcon icon={faDownload} className='export-icon' onClick={this.exportSequence} />
        </div>
        <SequenceGrid
          dragulaDecorator={this.dragulaDecorator}
          showCreateModal={() => this.setState({ createModalOpen: true })}
        />
        <CreateInstance
          visible={this.state.createModalOpen}
          onClose={() => this.setState({ createModalOpen: false })}
          sequenceId={this.id()}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    instances: state.asanaInstances.asanas,
    didCreate: state.asanaInstances.didCreate,
    layout: state.sequence.layout,
    sequence: state.sequence,
    asanas: state.asanas.asanas
  }
}

export default connect(
  mapStateToProps,
  { fetchAsanaInstances, updateSequence, fetchSequence, setAsanaInstanceState, deleteAsanaInstance }
)(Canvas)
