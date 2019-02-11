import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAsanaInstance, fetchAsanas } from '../actions'
import Navbar from './Navbar'
import DragElement from './DragElement'
import Thumbnail from './Thumbnail'
import Warrior2 from '../images/warrior2.jpg'
import KingPidgeon from '../images/king-pidgeon.jpg'
import Crow from '../images/crow.jpg'
import Locust from '../images/locust.jpg'
import DownDog from '../images/down-dog.jpg'
import '../styles/Selector.css'

class Selector extends Component {
  constructor(props) {
    super(props)
    this.mapAsanas = this.mapAsanas.bind(this)
  }

  componentWillMount() {
    this.props.fetchAsanas()
  }

  mapAsanas() {
    const { asanas } = this.props
    if (typeof asanas === 'undefined') return
    return asanas.map((asana, index) => {
      return (
        <DragElement onDrop={() => this.props.createAsanaInstance(asana.id)} asana_id={asana.id} key={asana.id}>
          <div className='selector-thumbnail'><Thumbnail img={asana.thumbnail}/></div>
        </DragElement>
      )
    })
  }

  render() {
    const asanas = [ DownDog, Locust, Warrior2, Crow, KingPidgeon ]

    return (
      <div className='selector'>
        <Navbar />
        <div className='selector-container'>
          { this.mapAsanas() }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({ asanas: state.asanas.asanas })

export default connect(mapStateToProps, { createAsanaInstance, fetchAsanas })(Selector)
