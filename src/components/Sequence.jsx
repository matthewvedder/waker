import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dragula from 'react-dragula'
import LinearProgress from '@material-ui/core/LinearProgress'
import GetAppIcon from '@material-ui/icons/GetApp'
import PublicIcon from '@material-ui/icons/Public'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography';
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
  deleteAsanaInstance,
  resetSequence
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
      pdfError: null,
      published: null
    }
    this.dragContainers = []
    this.exportSequence = this.exportSequence.bind(this)
    this.dragulaDecorator = this.dragulaDecorator.bind(this)
    this.handleLayoutChange = this.handleLayoutChange.bind(this)
    this.publish = this.publish.bind(this)
  }

  componentDidMount () {
    const drake = Dragula(this.dragContainers, {
      moves: (el, source, handle, sibling) => {
        if (!this.props.sequence.can_edit) return false
        return el.id !== 'add-thumbnail'
      },
      accepts: function (el, target, source, sibling) {
        return sibling !== null
      },
    })

    var scroll = autoScroll([document.getElementsByClassName("main")[0]], {
      margin: 20,
      maxSpeed: 40,
      scrollWhenOutside: true,
      autoScroll: function(){
          //Only scroll when the pointer is down, and there is a child being dragged.
          return this.down && drake.dragging;
      }
  });

    drake.on('drop', () => this.handleLayoutChange())
  }

  componentDidUpdate() {
    const published = this.props.sequence.public
    if (published && this.state.published === null) {
      this.setState({ published })
    }
  }

  componentWillUnmount () {
    this.props.resetSequence()
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

  publish() {
    const published = !this.state.published
    this.props.updateSequence(this.id(), { public: published })
    this.setState({ published })
  }

  handleLayoutChange() {
    const elements = document.getElementsByClassName('asana-instance-drag')
    const ids = _.uniq(Array.from(elements).map(el => el.id))
    this.props.updateSequence(this.id(), { layout: ids })
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
    const { instance_id, pdfLoading, pdfError, published } = this.state
    const { sequence } = this.props
    const publishColor = published ? 'secondary' : 'none'
    const publishTooltip = published ? 'Unpublish this Sequence' : 'Publish this Sequence'
    const editableDisplay = sequence.can_edit ? 'flex' : 'none'
    return (
      <div className='sequence'>
        <Paper className='sequence-grid-container' id='sequence' square>
          <div className='sequence-header' style={{ display: sequence ? 'flex' : 'none' }}>
            <Typography variant="h5" className='sequence-name'>{sequence.name}</Typography>
            <Tooltip title="Download as PDF">
              <IconButton aria-label="Download PDF" color='secondary' onClick={this.exportSequence}>
                <GetAppIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={publishTooltip}>
              <IconButton
                aria-label="Publish"
                color={publishColor}
                onClick={this.publish}
                style={{ display: editableDisplay }}
              >
                <PublicIcon />
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
            canEdit={sequence.can_edit}
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
  {
    fetchAsanaInstances,
    updateSequence,
    fetchSequence,
    setAsanaInstanceState,
    deleteAsanaInstance,
    resetSequence
  }
)(Canvas)
