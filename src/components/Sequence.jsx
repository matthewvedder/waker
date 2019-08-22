import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dragula from 'react-dragula'
import Selector from './Selector'
import SequenceGrid from './SequenceGrid'
import InstanceEditModal from './InstanceEditModal'
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
    this.state = { layout:  [], editModalOpen: false, instance_id: null }
    this.dragContainers = []
    this.dragulaDecorator = this.dragulaDecorator.bind(this)
  }

  componentWillMount() {
    this.props.fetchSequence(this.id())
    this.props.fetchAsanaInstances(this.id())
  }

  componentDidMount () {
    Dragula(this.dragContainers)
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
      <div className='sequence-grid-container'>
        <Selector dragulaDecorator={this.dragulaDecorator} sequenceName={this.props.sequence.name} />
        <SequenceGrid dragulaDecorator={this.dragulaDecorator}/>
        <InstanceEditModal
          visible={this.state.editModalOpen}
          onClose={() => this.setState({ editModalOpen: false, instance_id: null })}
          instance_id={ this.state.instance_id }
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
