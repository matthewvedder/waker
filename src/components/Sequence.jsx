import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dragula from 'react-dragula'
import LinearProgress from '@material-ui/core/LinearProgress'
import GetAppIcon from '@material-ui/icons/GetApp'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Tooltip from '@material-ui/core/Tooltip'
import Alert from './Alert'
import _ from 'lodash'
import { saveAs } from 'file-saver'
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
import { fetchPdfRequest } from '../sagas/SequenceSagas'

const NUM_COLUMNS = 6

class Canvas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      layout:  [],
      createModalOpen: false,
      instance_id: null,
      pdfLoading: false,
      pdfError: null
    }
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
    const { sequence } = this.props
    const fileName = `${sequence.name.toLowerCase().replace(' ', '_')}.pdf`
    this.setState({ pdfLoading: true, pdfError: null })
    fetchPdfRequest(sequence).then((blob) => {
      this.setState({ pdfLoading: false })
      saveAs(blob, fileName)
    }).catch((error) => {
      this.setState({ pdfError: error.message, pdfLoading: false })
    })

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
    const { editModalOpen, instance_id, pdfLoading, pdfError } = this.state
    return (
      <div className='sequence'>
        <Paper className='sequence-grid-container' id='sequence' square>
          <div className='sequence-header'>
            <div className='sequence-name'>{this.props.sequence.name}</div>
            <Tooltip title="Download as PDF">
              <IconButton aria-label="Download PDF" color='secondary' onClick={this.exportSequence}>
                <GetAppIcon />
              </IconButton>
            </Tooltip>
          </div>
          <div style={{ display: pdfLoading ? 'flex' : 'none', justifyContent: 'center' }}>
            <div style={{ width: '70%' }}>
              <LinearProgress color="secondary" />
            </div>
          </div>
          <Alert message={ pdfError } severity='error' width={'70%'} />
          <SequenceGrid
            dragulaDecorator={this.dragulaDecorator}
            showCreateModal={() => this.setState({ createModalOpen: true })}
          />
          <CreateInstance
            visible={this.state.createModalOpen}
            onClose={() => this.setState({ createModalOpen: false })}
            sequenceId={this.id()}
          />
        </Paper>
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
