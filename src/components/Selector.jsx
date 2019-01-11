import React, { Component } from 'react'
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

  mapAsanas(asanas) {
    return asanas.map(asana => {
      return (
        <DragElement key={Math.random()}>
          <div className='selector-thumbnail'><Thumbnail img={asana}/></div>
        </DragElement>
      )
    })
  }

  render() {
    const asanas = [ Warrior2, KingPidgeon, Crow, Locust, DownDog ]
    return (
      <div className='selector'>
        <Navbar />
        <div className='selector-container'>
          { this.mapAsanas(asanas) }
        </div>
      </div>
    )
  }
}

export default Selector
