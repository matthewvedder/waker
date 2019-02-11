import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import GridLayout from 'react-grid-layout'
import Selector from './Selector'
import DropTarget from './DropTarget'
import Modal from './Modal'
import AsanaInstanceDrag from './AsanaInstanceDrag'
import Thumbnail from './Thumbnail'
import Warrior2 from '../images/warrior2.jpg'
import KingPidgeon from '../images/king-pidgeon.jpg'
import Crow from '../images/crow.jpg'
import Locust from '../images/locust.jpg'
import DownDog from '../images/down-dog.jpg'
import '../styles/Canvas.css'
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
    this.state = { layout:  [] }
    this.layout = this.layout.bind(this)
    this.handleLayoutChange = this.handleLayoutChange.bind(this)
  }

  componentWillMount() {
    this.props.fetchAsanaInstances()
    this.props.fetchSequence()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.layout.length === 0 && nextProps.layout.length > 0) {
      // this.props.updateSequence({ layout: this.buildLayout(nextProps) })
    }

    if (nextProps.didCreate) this.addAsanaInstance(nextProps)
  }

  layout() {
    const { instances, layout } = this.props
    return instances.length === 0 ? [] : layout
  }

  sortLayoutItems() {
    return this.props.layout.sort((a, b) => {
      if (a.y === b.y) {
        return a.x > b.x ? 1 : -1;
      }
      return a.y > b.y ? 1 : -1;
    })
  }

  addAsanaInstance(nextProps) {
    const { instances, layout } = nextProps
    const newInstance = instances[instances.length-1]
    const lastLayoutItem = this.sortLayoutItems()[layout.length-1] || { x: -1, y: 0 }
    const x = lastLayoutItem.x === NUM_COLUMNS - 1 ? 0 : lastLayoutItem.x + 1
    const newItem = {
      i: String(newInstance.id),
      x: x, // number of columns
      y: lastLayoutItem.y + 17, // puts it at the bottom
      w: 1,
      h: 17
    }

    this.props.updateSequence({ layout: [ ...layout, newItem ] })
    this.props.setAsanaInstanceState({ didCreate: false })
  }

  handleLayoutChange(layout) {
    const { didCreate, instances } = this.props
    if (!this.props.didCreate && instances.length === layout.length) {
      this.props.updateSequence({ layout: layout })
    }
  }

  mapImages() {
    const { instances, asanas } = this.props
    console.log(this.props)
    return instances.map((instance) => {
      const asana = asanas.find(a => a.id === instance.asana_id )
      const thumbnail = asana ? asana.thumbnail : ''
      return (
        <AsanaInstanceDrag
          key={instance.id}
          asana={instance}
          onDelete={() => this.props.deleteAsanaInstance(instance.id)}
          image={thumbnail}
        />
      )
    })
  }


  render() {
    return (
      <div className='canvas'>
        <Selector />
        <DropTarget>
          <div className='grid'>
            <GridLayout
              className="layout"
              layout={this.layout()}
              cols={NUM_COLUMNS}
              rowHeight={1}
              width={1200}
              isResizable={false}
              onLayoutChange={this.handleLayoutChange}
              draggableCancel="path"
            >
              {this.mapImages()}

            </GridLayout>
          </div>
        </DropTarget>
        <Modal visible={this.state.modalOpen} onClose={() => this.setState({ modalOpen: false })}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    instances: state.asanaInstances.asanas,
    didCreate: state.asanaInstances.didCreate,
    layout: state.sequence.layout,
    asanas: state.asanas.asanas
  }
}

export default connect(
  mapStateToProps,
  { fetchAsanaInstances, updateSequence, fetchSequence, setAsanaInstanceState, deleteAsanaInstance }
)(Canvas)
