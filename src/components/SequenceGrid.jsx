import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import _ from 'lodash'
import Selector from './Selector'
import dragula from 'react-dragula'
import InstanceEditModal from './InstanceEditModal'
import AsanaInstanceDrag from './AsanaInstanceDrag'
import InstanceEditForm from './InstanceEditForm'
import AddThumbnail from './AddThumbnail'
import styles from 'dragula/dist/dragula.css'
import '../styles/Sequence.css'
import {
  fetchAsanaInstances,
  updateSequence,
  fetchSequence,
  setAsanaInstanceState,
  deleteAsanaInstance,
  fetchAsanas
} from '../actions'

const NUM_COLUMNS = 6

class SequenceGrid extends Component {
  constructor(props) {
    super(props)
    this.state = { layout:  [], editModalOpen: false, instance_id: null }
    this.mapInstances = this.mapInstances.bind(this)
  }

  componentWillUnmount() {
    this.props.setAsanaInstanceState({ asanas: [] })
  }

  componentWillMount() {
    this.props.fetchSequence(this.id())
    this.props.fetchAsanaInstances(this.id())
    this.props.fetchAsanas()
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.didCreate) this.addAsanaInstance(nextProps)
  }

  id() {
    const { pathname } = window.location
    return pathname.split('/')[2]
  }


  mapInstances() {
    const { instances, asanas, showCreateModal } = this.props
    const elements = instances.map((instance) => {
      const asana = asanas.find(a => a.id === instance.asana_id )
      const thumbnail = asana ? asana.thumbnail : ''
      return (
        <AsanaInstanceDrag
          id={instance.id}
          key={instance.id}
          asana={instance}
          onDelete={() => this.props.deleteAsanaInstance(instance.id)}
          image={thumbnail}
          handleEditClick={ () => this.setState({ editModalOpen: true, instance_id: instance.id }) }
        />
      )
    })

    return [...elements, <AddThumbnail key='add-thumbnail' onClick={showCreateModal} />]
  }


  render() {
    const { editModalOpen, instance_id } = this.state
    return (
          <div className='sequence-grid' id='sequence-grid' ref={this.props.dragulaDecorator}>
            {this.mapInstances()}
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
  { fetchAsanaInstances, updateSequence, fetchSequence, setAsanaInstanceState, deleteAsanaInstance, fetchAsanas }
)(SequenceGrid)
