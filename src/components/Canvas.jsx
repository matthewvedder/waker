import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAsanaInstances, updateSequence, fetchSequence } from '../actions'
import _ from 'lodash'
import GridLayout from 'react-grid-layout'
import Selector from './Selector'
import DropTarget from './DropTarget'
import Modal from './Modal'
import Thumbnail from './Thumbnail'
import Warrior2 from '../images/warrior2.jpg'
import KingPidgeon from '../images/king-pidgeon.jpg'
import Crow from '../images/crow.jpg'
import Locust from '../images/locust.jpg'
import DownDog from '../images/down-dog.jpg'
import '../styles/Canvas.css'

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
  }

  layout() {
    const { asanas, layout } = this.props
    return asanas.length === 0 ? [] : layout
  }

  buildLayout(props=this.props) {
    return props.asanas.map((asana, index) => ({i: String(asana.id), x: index, y: 0, w: 1, h: 17}))
  }

  // addAsanaInstance() {
  //   props.asanas.map((asana, index) => ({i: String(asana.id), x: index, y: 0, w: 1, h: 17}))
  // }

  handleLayoutChange(layout) {
    this.props.updateSequence({ layout: layout })
  }

  mapImages() {
    const images = [ DownDog, Locust, Warrior2, Crow, KingPidgeon ]
    const { asanas, layout } = this.props
    return this.props.asanas.map((asana) => {
      return (
        <div key={asana.id}>
          <Thumbnail img={images[asana.asana_id - 1]}/>
        </div>
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
              cols={6}
              rowHeight={1}
              width={1200}
              isResizable={false}
              onLayoutChange={this.handleLayoutChange}
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
    asanas: state.asanaInstances.asanas,
    layout: state.sequence.layout
  }
}

export default connect(mapStateToProps, { fetchAsanaInstances, updateSequence, fetchSequence })(Canvas)
