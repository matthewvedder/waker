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

  // shouldComponentUpdate() {
  //   const { layout, instances } = this.props
  //   return layout.length === instances.length
  // }

  componentWillUnmount() {
    this.props.setAsanaInstanceState({ asanas: [] })
  }

  componentWillMount() {
    this.props.fetchSequence(this.id())
    this.props.fetchAsanaInstances(this.id())
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.layout.length === 0 && nextProps.layout.length > 0) {
      // this.props.updateSequence({ layout: this.buildLayout(nextProps) })
    }

    if (nextProps.didCreate) this.addAsanaInstance(nextProps)
  }

  id() {
    const { pathname } = window.location
    return pathname.split('/')[2]
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

    this.props.updateSequence({ layout: [ ...layout, newItem ] }, this.id())
    this.props.setAsanaInstanceState({ didCreate: false })
  }

  handleLayoutChange(layout) {
    const { didCreate, instances } = this.props
    // hack to avoid updating layout before layout items are present
    const invalid_height = layout.find(item => item.h === 1)
    if (invalid_height) return
    if (!didCreate && instances.length === layout.length) {
      this.props.updateSequence({ layout: layout }, this.id())
    }
  }

  mapImages() {
    const { instances, asanas } = this.props
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
    console.log(this.props.layout.length, this.props.instances.length)
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
